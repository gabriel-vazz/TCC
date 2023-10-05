const express = require('express')
const router = express.Router()

const mysql = require('mysql2')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'gabriel200612',
    database: 'stuff_db',
    multipleStatements: true
})

router.get('/me', (req, res) => {
    const id = req.session.user[0].id

    const sql = 'SELECT * FROM usuario WHERE id = ?'

    db.query(sql, id, (err, result) => {
        if(err) {
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
        if(err) {
            console.log(err)
            res.json({ msg: 'erro ao salvar alterações' })
        }
        if(result.length) {
            res.json({ msg: 'nome não disponível' })
        } else {
            if(name.trim().length === 0 || name === '') {
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
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }
        if(!result.length) {
            res.json({ msg: 'parece que você não possui nenhuma música :(' })
        } else {
            res.json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    const sql = 'SELECT * FROM usuario WHERE id = ?'

    db.query(sql, id, (err, result) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

module.exports = router