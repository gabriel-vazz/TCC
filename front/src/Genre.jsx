import { useEffect, useState } from 'react'
import axios from 'axios'

import { useLocation, Link } from 'react-router-dom'

import Header from './Header'

const Genre = () => {
    
    const location = useLocation()
    const id = location.state.data

    const [name, setName] = useState()
    const [songs, setSongs] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/genres/${id}`).then((response) => {
            setName(response.data[0].nome)
        })

        axios.get(`http://localhost:3000/genres/${id}/songs`).then((response) => {
            setSongs(response.data)
        })

        axios.get('http://localhost:3000/genres').then((response) => {
            setGenres(response.data)
        })
    }, [])

    return (
        <div>
            <Header />

            <div className="genreName">{name}</div>
            <div className="genreDetails">{songs.length} músicas</div>

            <div className="home">
                <div className="columnSongList">
                    {songs.map((song) => {
                        return (
                            <Link  
                                to='/song' state={{ data: song.id }}
                                style={{ textDecoration: 'none' }}
                            >
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

                <div className="genreLinks">
                    <div className="genres">
                        :: gêneros ::
                    </div>

                    {genres.map((genre) => {
                        return (
                            <div className="genreLink">
                                <Link 
                                    onClick={() => window.location.reload(false)}
                                    to='/genre' state={{ data: genre.id }}
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
                                    -{genre.nome}
                                </Link>
                            </div>
                        )   
                    })}
                </div>
            </div>
        </div>
    )
}

export default Genre