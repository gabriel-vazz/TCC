import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Flag from '../components/Flag'
import Header from '../components/Header'

import '../styles/userprofile.css'

const UserProfile = () => {

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [country, setCountry] = useState()

    const [songs, setSongs] = useState([])
    const [followers, setFollowers] = useState([])

    const [message, setMessage] = useState()

    useEffect(() => {
        axios.get('http://localhost:3000/users/me').then((response) => {
            setName(response.data[0].nome)
            setDescription(response.data[0].descricao)
            setCountry(response.data[0].pais)
        })

        axios.get('http://localhost:3000/users/me/songs').then((response) => {
            if(response.data.msg) {
                setMessage(response.data.msg)
            } else {
                setSongs(response.data)
            }
        })

        axios.get('http://localhost:3000/users/me/follows').then((response) => {
            setFollowers(response.data)
        })
    }, [])

    return (
        <div>
            <Header />

            <div className="profilePage">
                <div className="profileContainer">
                    <div className="profileInformation">
                        <div className="profileName">{name}</div>
                        <div className="profileDetails">
                            {followers.length} seguidores, {songs.length} músicas
                        </div>
                        <div className="profileDescription">{description}</div>
                    </div>
                    <div className="flag">
                        <Flag code={country} />
                    </div>
                </div>
 
                <Link to='/editProfile'>
                    <button className="editProfileButton">EDITAR PERFIL</button>
                </Link>

                <div className="profileSongs">:: suas músicas ::</div>

                <div className="columnSongList" style={{marginLeft: 0}}>
                    {songs.map((song) => {
                        return (
                            <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                                <div className="columnSong">
                                    <img 
                                        src={`http://localhost:3000/sources/${song.capa}`} 
                                        height={60} width={60}
                                    />

                                    <div className="columnSongName">
                                        {song.usuario} - {song.nome}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className="noSongMessage">{message}</div>

                <Link to='/post'>
                    <button className="loginButton">
                        POSTAR MÚSICA
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default UserProfile