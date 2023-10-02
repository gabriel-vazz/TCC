const express = require('express')
const router = express.Router()

const mysql = require('mysql2')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'stuff_db',
    multipleStatements: true
})

router.post('/', (req, res) => {
    const user = req.session.user[0].id
    const { name } = req.body
    const { description } = req.body 

    const sql = 'UPDATE usuario SET nome = ?, descricao = ? WHERE id = ?'

    if(!name && !description) {
        res.json({ msg: 'você não fez alterações' })
    } else {
        

        db.query(sql, [name, description, user], (err, result) => {
            if(err) {
                console.log(err)
                res.json({ msg: 'erro ao salvar alterações' })
            }
            res.json({ msg: 'perfil atualizado com sucesso!' })
        })
    }
})

module.exports = router