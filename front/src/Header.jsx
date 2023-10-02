import { useEffect } from 'react'
import axios from 'axios'

import { useNavigate, Link } from 'react-router-dom'

import logo from './logo.png'

const Header = () => {
    
    axios.defaults.withCredentials = true
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/login').then((response) => {
            if(!response.data.logged) {
                navigate('/')
            }
        })  
    }, [])

    const logOut = () => {
        axios.get('http://localhost:3000/logout').then((response) => {
            window.location.reload(false)
        })
    }

    return (
        <div className="headerContainer">
            <div className="header"> 
                <Link to='http://localhost:5173/home'>
                    <img src={logo} height="115" />
                </Link>
                
                <div className="links">
                    <Link to='/profilePage'>
                        <button className="link">
                            :: perfil ::
                        </button>
                    </Link>

                    <button
                        className="link"
                        onClick={() => logOut()}
                    >
                        :: encerrar sessão ::
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header