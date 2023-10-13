const express = require('express')
const router = express.Router()

const mysql = require('mysql2')
const path = require('path')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'gabriel200612',
  database: 'stuff',
  multipleStatements: true
})

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/sources')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.fields([
  { name: 'capa', maxCount: 1 },
  { name: 'musica', maxCount: 1 }
]), (req, res) => {

  const user = req.session.user[0].id
  const name = req.body.nome
  const genres = JSON.parse(req.body.generos)
  const song = req.files.musica[0].filename
  const cover = req.files.capa[0].filename
  const description = req.body.descricao

  const sql = 'INSERT INTO musica(idusuario, nome, musica, capa, descricao) VALUES (?,?,?,?,?)'

  db.query(sql, [user, name, song, cover, description], (err, result) => {
    if (err) {
      console.log(err)
      res.json({ msg: 'erro ao postar música' })
    }

    var sql = ''
    for (let i = 0; i < genres.length; i++) {
      sql +=
        'INSERT INTO musica_genero(idmusica, idgenero) VALUES ('
        + mysql.escape(result.insertId) + ', ' + mysql.escape(genres[i]) + '); '
    }
    db.query(sql)

    res.json({ msg: 'música postada com sucesso!' })
  })
})

router.get('/', (req, res) => {
  const sql =
    `SELECT musica.id, musica.idusuario, musica.nome, musica.musica, musica.capa, musica.descricao, 
    usuario.nome AS usuario 
    FROM musica
    JOIN usuario ON musica.idusuario = usuario.id`

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  const sql =
    `SELECT musica.nome, musica.idusuario, musica.musica, musica.capa, musica.descricao, 
    usuario.nome AS usuario
    FROM musica
    JOIN usuario ON musica.idusuario = usuario.id
    WHERE musica.id = ?`

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.get('/:id/genres', (req, res) => {
  const id = req.params.id

  const sql =
    `SELECT genero.id, genero.nome FROM genero 
    JOIN musica_genero ON genero.id = musica_genero.idgenero
    JOIN musica ON musica.id = musica_genero.idmusica
    WHERE musica.id = ?`

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.post('/likes', (req, res) => {
  const user = req.session.user[0].id
  const { id } = req.body

  const sql = 'SELECT * FROM curtida WHERE idcurtiu = ? AND idcurtido = ?'

  db.query(sql, [user, id], (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }

    if (!result.length) {
      db.query('INSERT INTO curtida(idcurtiu, idcurtido) VALUES (?, ?)',
        [user, id])
    } else {
      db.query('DELETE FROM curtida WHERE idcurtiu = ? AND idcurtido = ?',
        [user, id])
    }
    res.sendStatus(200)
  })
})

router.get('/:id/liked', (req, res) => {
  const user = req.session.user[0].id
  const id = req.params.id

  const sql = 'SELECT * FROM curtida WHERE idcurtiu = ? AND idcurtido = ?'

  db.query(sql, [user, id], (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    if (result.length) {
      res.json({ liked: true })
    } else {
      res.json({ liked: false })
    }
  })
})

router.get('/:id/likes', (req, res) => {
  const id = req.params.id

  const sql = 'SELECT * FROM curtida WHERE idcurtido = ?'

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.post('/comments', (req, res) => {
  const user = req.session.user[0].id
  const { comment } = req.body
  const { id } = req.body

  const sql = 'INSERT INTO comentario(texto, idcomentou, idcomentado) VALUES (?,?,?)'

  if (!comment) {
    res.json({ msg: 'por favor, escreva seu comentário' })
  } else {
    db.query(sql, [comment, user, id], (err, result) => {
      if (err) {
        console.log(err)
        res.json({ msg: 'erro ao postar comentário' })
      }
      res.json({ msg: 'comentário postado com sucesso!' })
    })
  }
})

router.get('/:id/comments', (req, res) => {
  const id = req.params.id

  const sql =
    `SELECT comentario.texto, comentario.idcomentou, usuario.nome 
    FROM comentario
    JOIN usuario ON comentario.idcomentou = usuario.id
    WHERE comentario.idcomentado = ?`

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

module.exports = router