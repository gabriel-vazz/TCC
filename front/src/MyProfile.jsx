import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Header from './Header'

const MyProfile = () => {

    const [name, setName] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        axios.get('http://localhost:3000/login').then((response) => {
            setName(response.data.user[0].nome)
            setDescription(response.data.user[0].descricao)
        })
    }, [])

    return (
        <div>
            <Header />

            <div className="profilePage">

                <div className="profileContainer">
                    <div className="profileInformation">
                        <div className="profileName">{name}</div>
                        <div className="profileDescription">{description}</div>
                    </div>

                    <div className="editProfileButton">
                        <Link 
                            to='/editProfile' style={{ textDecoration: 'none', color: '#fff0aa' }}
                            state={{ 
                                data: {
                                    name: name,
                                    description: description,
                                }
                            }}
                        >
                            editar perfil
                        </Link>
                    </div>
                </div>

                <Link to='/postSong'>
                    <button className="loginButton">
                        POSTAR MÚSICA
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default MyProfile