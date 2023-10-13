import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import logo from '../components/logo.png'
import '../styles/login.css'

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [message, setMessage] = useState()

  axios.defaults.withCredentials = true
  const navigate = useNavigate()

  const logIn = async () => {
    await axios.post('http://localhost:3000/login', {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.msg) {
        setMessage(response.data.msg)
      } else {
        window.location.reload(false)
      }
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/login').then((response) => {
      if (response.data.logged) {
        navigate('/')
      }
    })
  }, [])

  return (
    <div className="login">
      <img src={logo} className="logo" /><br />

      :: login ::<br />

      <input
        className="loginInput"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        className="loginInput"
        placeholder="senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button className="loginButton" onClick={() => logIn()}>
        ENTRAR
      </button><br />

      <Link to='/register' style={{ textDecoration: 'none' }}>
        <div className="createAccount">
          não possui conta? cadastre-se!
        </div>
      </Link>

      <div className="message">{message}</div>
    </div>
  )
}

export default Login