const express = require('express')
const router = express.Router()

const mysql = require('mysql2')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'gabriel200612',
  database: 'stuff',
  multipleStatements: true
})

router.get('/me', (req, res) => {
  const id = req.session.user[0].id

  const sql = 'SELECT * FROM usuario WHERE id = ?'

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.post('/me', (req, res) => {
  const id = req.session.user[0].id
  const { name } = req.body
  const { description } = req.body
  const { country } = req.body

  const update = 'UPDATE usuario SET nome = ?, descricao = ?, pais = ? WHERE id = ?'
  const select = 'SELECT * FROM usuario WHERE nome = ? AND id != ?'

  db.query(select, [name, id], (err, result) => {
    if (err) {
      console.log(err)
      res.json({ msg: 'erro ao salvar alterações' })
    }
    if (result.length) {
      res.json({ msg: 'nome não disponível' })
    } else {
      if (name.trim().length === 0 || name === '') {
        res.json({ msg: 'seu nome não pode ficar em branco' })
      } else {
        db.query(update, [name, description, country, id], (err, result) => {
          res.json({ msg: 'perfil atualizado com sucesso!' })
        })
      }
    }
  })
})

router.get('/me/songs', (req, res) => {
  const id = req.session.user[0].id

  const sql =
    `SELECT musica.id, musica.nome, musica.capa, musica.idusuario,
    usuario.nome AS usuario
    FROM musica
    JOIN usuario ON musica.idusuario = usuario.id
    WHERE musica.idusuario = ?`

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    if (!result.length) {
      res.json({ msg: 'parece que você não possui nenhuma música :(' })
    } else {
      res.json(result)
    }
  })
})

router.get('/me/follows', (req, res) => {
  const id = req.session.user[0].id

  const sql = 'SELECT * FROM seguida WHERE idseguido = ?'

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  const sql = 'SELECT * FROM usuario WHERE id = ?'

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.get('/:id/songs', (req, res) => {
  const id = req.params.id

  const sql = 'SELECT * FROM musica WHERE idusuario = ?'

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.post('/follows', (req, res) => {
  const user = req.session.user[0].id
  const { id } = req.body

  db.query('SELECT * FROM seguida WHERE idseguiu = ? AND idseguido = ?',
    [user, id], (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      }
      if (result.length) {
        db.query('DELETE FROM seguida WHERE idseguiu = ? AND idseguido = ?', [user, id])
      } else {
        db.query('INSERT INTO seguida(idseguiu, idseguido) VALUES (?, ?)', [user, id])
      }
      res.sendStatus(200)
    })
})

router.get('/:id/follows', (req, res) => {
  const id = req.params.id

  const sql = 'SELECT * FROM seguida WHERE idseguido = ?'

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.get('/me/friends', (req, res) => {
  const id = req.session.user[0].id

  const sql =
    `SELECT 
      usuario.id AS id_usuario, usuario.nome AS nome_usuario,
      musica.id AS id_musica, musica.nome AS nome_musica,
      usuario_artista.nome AS nome_artista
    FROM usuario
    
    LEFT JOIN musica ON usuario.ouvindo = musica.id
    JOIN seguida ON usuario.id = seguida.idseguido
    LEFT JOIN usuario AS usuario_artista ON musica.idusuario = usuario_artista.id
    
    WHERE seguida.idseguiu = ?`

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    if(!result.length) {
      res.json({ msg: 'siga seus amigos para saber o que eles estão ouvindo!' })
      .status(204)
    } else {
      res.json(result)
      .status(200)
    }
  })
})

router.get('/:id/followed', (req, res) => {
  const user = req.session.user[0].id
  const id = req.params.id

  const sql = 'SELECT * FROM seguida WHERE idseguiu = ? AND idseguido = ?'

  db.query(sql, [user, id], (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    if (result.length) {
      res.json({ followed: true })
    } else {
      res.json({ followed: false })
    }
  })
})

router.post('/songs/current', (req, res) => {
  const user = req.session.user[0].id
  const { id } = req.body

  const sql = 'UPDATE usuario SET ouvindo = ? WHERE id = ?'

  db.query(sql, [id, user], (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.sendStatus(200)
  })
})

router.get('/me/playlists', (req, res) => {
  const user = req.session.user[0].id

  const sql = 'SELECT * FROM playlist WHERE idcriou = ?'

  db.query(sql, user, (err, result) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    }
    if(!result.length) {
      res.json({ msg: 'suas playlists criadas aparecerão aqui.' })
    } else {
      res.json(result)
    }
  })
})

module.exports = router