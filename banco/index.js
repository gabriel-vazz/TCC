const express = require('express')
const app = express()

const mysql = require('mysql2')
const cors = require('cors')

const { check, validationResult } = require('express-validator')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const songsRouter = require('./routes/songs')
const genresRouter = require('./routes/genres')
const usersRouter = require('./routes/users')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'stuff',
  multipleStatements: true
})

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  key: 'sessionID',
  secret: 'paranoidandroid',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

app.use(express.static('public'))
app.use(express.json())

app.use('/songs', songsRouter)
app.use('/genres', genresRouter)
app.use('/users', usersRouter)

const PORT = 3000

app.post('/register', [
  check('name', 'campo nome não pode estar vazio!').notEmpty(),
  check('password', 'senha muito curta!').isLength({ min: 8 }),
  check('email', 'insira um email válido!').isEmail()
], (req, res) => {

  const { name } = req.body
  const { email } = req.body
  const { password } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.json(errors)
  } else {
    db.query('SELECT * FROM usuario WHERE nome = ?', name, (err, result) => {
      if (err) {
        console.log(err)
        res.json({ msg: 'erro ao registrar usuário' })
      }
      if (!result.length) {
        db.query('INSERT INTO usuario(nome, email, senha) VALUES (?,?,?)',
          [name, email, password], (err, result) => {
            res.json({ msg: 'usuário registrado com sucesso!' })
          })
      } else {
        res.json({ msg: 'já existe uma conta registrada com esse nome' })
      }
    }
    )
  }
})

app.post('/login', (req, res) => {
  const { email } = req.body
  const { password } = req.body

  const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?'

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err)
      res.json({ msg: 'erro ao fazer login' })
    }
    if (result.length) {
      req.session.user = result
      res.sendStatus(200)
    } else {
      res.json({ msg: 'credenciais incorretas' })
    }
  })
})

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.json({ logged: true, user: req.session.user })
  } else {
    res.json({ logged: false })
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`)
})