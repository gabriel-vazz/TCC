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

router.get('/', (req, res) => {
    db.query('SELECT * FROM genero', (err, result) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    const sql = 'SELECT * FROM genero WHERE id = ?'

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
    `SELECT musica.id, musica.idusuario, musica.nome, musica.capa,
    usuario.nome AS usuario 
    FROM musica 
    JOIN musica_genero ON musica.id = musica_genero.idmusica 
    JOIN genero ON genero.id = musica_genero.idgenero 
    JOIN usuario ON usuario.id = musica.idusuario
    WHERE genero.id = ?`

    db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

module.exports = router