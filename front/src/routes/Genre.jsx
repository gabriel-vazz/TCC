import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'

import Header from '../components/Header'

const Genre = () => {

    const { id } = useParams()

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
    }, [id])

    return (
        <div>
            <Header />

            <div className="genreName">{name}</div>
            <div className="genreDetails">{songs.length} músicas</div>

            <div className="home">
                <div className="columnSongList">
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

                <div className="genreLinks">
                    <div className="genres">:: gêneros ::</div>

                    {genres.map((genre) => {
                        return (
                            <div className="genreLink">
                                <Link 
                                    to={`/genre/${genre.id}`} 
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
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

export default Genre