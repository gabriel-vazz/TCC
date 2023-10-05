import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Header from './Header'

const Home = () => {

    const [username, setUsername] = useState()

    const [songs, setSongs] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/users/me').then((response) => {
            setUsername(response.data[0].nome)
        })

        axios.get('http://localhost:3000/songs').then((response) => {
            setSongs(response.data)
        })

        axios.get('http://localhost:3000/genres').then((response) => {
            setGenres(response.data)
        })
    }, [])

    return (
        <div>
            <Header />
            
            <div className="welcome">bem vindo de volta, {username}</div> 
                
            <div className="home">
                <div className="songs">
                    {songs.map((song) => {
                        return (
                            <div className="song">
                                <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                                    <img 
                                        src={`http://localhost:3000/sources/${song.capa}`} 
                                        height={180} width={180}
                                    />

                                    <div className="songName">{song.nome}</div>
                                    
                                    <Link to={`/profile/${song.idusuario}`} style={{ textDecoration: 'none'}}>
                                        <div className="artistName">{song.usuario}</div>  
                                    </Link>  
                                </Link>
                            </div>
                        )
                    })}
                </div>

                <div className="genreLinks">
                    <div className="genres">
                        :: gêneros ::
                    </div>

                    {genres.map((genre) => {
                        return (
                            <div className="genreLink">
                                <Link to={`/genre/${genre.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    {genre.nome}
                                </Link>
                            </div>
                        )   
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home