import { useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import logo from './logo.png'

const Register = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState()

    const registerUser = async() => {
        await axios.post('http://localhost:3000/register', {
            name: name,
            email: email,
            password: password
        }).then((response) => {
            if(response.data.errors) {
                setErrors(response.data.errors)
            } else {
                setErrors([])
                setMessage(response.data.msg)
            }
        })
    }

    return (
        <div className="login">
            <Link to='/'>
                <img 
                    style={{ marginTop: 20 }}
                    src={logo} height="200"
                />
            </Link>

            <div className="login">:: sign in ::</div>

            <input
                className="loginInput"
                placeholder="nome"
                onChange={(e) => setName(e.target.value)}
            /><br/>

            <input
                className="loginInput"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            /><br/>

            <input
                className="loginInput"
                placeholder="senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            /><br/>

            <button 
                className="loginButton"
                onClick={() => registerUser()}
            >
                REGISTRAR
            </button><br/>

            <div className="message">{message}</div>

            {errors.map((error) => {
                return <div className="error">{error.msg}</div>
            })}
        </div>
    )
}

export default Register