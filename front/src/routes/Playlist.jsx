import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, Link } from 'react-router-dom'

import Header from '../components/Header'

const Playlist = () => {
  
  const { id } = useParams()

  const [playlist, setPlaylist] = useState([])
  const [songs, setSongs] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:3000/playlists/${id}/songs`)
    .then((response) => {
      setSongs(response.data)
    })

    axios.get(`http://localhost:3000/playlists/${id}`)
    .then((response) => {
      setPlaylist(response.data)
    })
  }, [])

  return (
    <div>
      <Header />

      {playlist.map((playlist) => {
        return (
          <div>
            <div className="playlistName">{playlist.nome}</div>
              <div className="playlistDetails">
                playlist de {playlist.usuario}. ({songs.length} músicas)
              </div>
            <div className="playlistDescription">{playlist.descricao}</div>
          </div>
        )
      })}

      <div className="columnSongList">
        {songs.map((song) => {
          return (
            <div>
              <div className="genreColumnSong">
                <Link to={`/song/${song.idmusicas}`} style={{ textDecoration: 'none' }}>
                  <div className="columnSongInfo">
                    <img
                      src={`http://localhost:3000/sources/${song.capa}`}
                      height={60} width={60}
                    />

                    <div className="columnSongName">
                      {song.artista} - {song.musica}
                    </div>
                  </div>
                </Link>
              </div>
            </div> 
          )})}
        </div>
    </div>
  )
}

export default Playlist