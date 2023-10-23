import { useEffect } from 'react'
import axios from 'axios'

import { useNavigate, Link } from 'react-router-dom'

import logo from './logo.png'
import '../styles/header.css'

const Header = () => {

  axios.defaults.withCredentials = true
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/login').then((response) => {
      if (!response.data.logged) {
        navigate('/login')
      }
    })
  }, [])

  const logOut = async () => {
    await axios.get('http://localhost:3000/logout').then((response) => {
      navigate('/login')
    })
  }

  return (
    <div className="headerContainer">
      <div className="header">
        <Link to='http://localhost:5173/'>
          <img src={logo} height="125" />
        </Link>

        <div className="links">
          <Link to='/profile/me'>
            <button className="link">:: perfil ::</button>
          </Link>

          <button className="link" onClick={() => logOut()}>
            :: encerrar sessão ::
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header