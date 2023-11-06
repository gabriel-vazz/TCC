const express = require('express')
const router = express.Router()

const mysql = require('mysql2')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'stuff',
  multipleStatements: true
})

router.post('/', (req, res) => {
  const user = req.session.user[0].id
  const { name } = req.body
  const { description } = req.body

  const sql = 'INSERT INTO playlist(idcriou, nome, descricao) VALUES (?, ?, ?)'
  
  if(!name) {
    res.json({ msg: 'sua playlist precisa de um nome' })
  } else {
    db.query(sql, [user, name, description], (err, result) => {
      if(err) {
        console.log(err)
        res.json({ msg: 'erro ao criar playlist' })
      }
      res.json({ msg: 'playlist criada com sucesso!' })
    })
  }
})

router.post('/songs', (req, res) => {
  const { playlistId } = req.body
  const { songId } = req.body

  db.query('SELECT * FROM musica_playlist WHERE idplaylist = ? AND idmusicas = ?', 
  [playlistId, songId], (err, result) => {
    if(err) {
      console.log(err)
      res.json({ msg: 'erro ao adicionar música a playlist' })
    }
    if(!result.length) {
      db.query('INSERT INTO musica_playlist(idplaylist, idmusicas) VALUES (?, ?)', 
      [playlistId, songId], (err, result) => {
        res.json({ msg: 'música adicionada com sucesso!' })
      })
    } else {
      res.json({ msg: 'essa música já está nessa playlist' })
    }
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  const sql = 
    `SELECT playlist.nome AS nome, usuario.nome AS usuario,
    playlist.descricao
    FROM playlist
    JOIN usuario ON playlist.idcriou = usuario.id
    WHERE playlist.id = ?`

  db.query(sql, id, (err, result) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

router.get('/:id/songs', (req, res) => {
  const id = req.params.id

  const sql = 
    `SELECT 
      musica_playlist.idplaylist, musica_playlist.idmusicas, 
      playlist.nome, playlist.descricao,
      perfil.nome AS usuario,
      musica.nome AS musica, 
      usuario.nome AS artista,
      musica.musica AS mp3, 
      musica.capa, musica.id AS idmusica
    FROM musica_playlist
  
    JOIN playlist ON playlist.id = musica_playlist.idplaylist
    JOIN usuario AS perfil ON playlist.idcriou = perfil.id
    JOIN musica ON musica.id = musica_playlist.idmusicas
    JOIN usuario ON musica.idusuario = usuario.id
  
    WHERE musica_playlist.idplaylist = ?`

  db.query(sql, id, (err, result) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(result)
  })
})

module.exports = router