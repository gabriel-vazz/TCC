import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'

import { PiListPlusFill } from 'react-icons/pi'
import { GiStonedSkull } from 'react-icons/gi'

import AddSongToPlaylist from '../components/AddSongToPlaylist'
import Header from '../components/Header'
import Like from '../components/Like'

const Genre = () => {

  const { id } = useParams()

  const [name, setName] = useState()
  const [songs, setSongs] = useState([])
  const [genres, setGenres] = useState([])

  const addToPlaylistButtonStyle = {
    color: '#fff0aa',
    height: 40, width: 40
  }

  const [addId, setAddId] = useState()

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
              <div>
                <div className="genreColumnSong">
                  <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                    <div className="columnSongInfo">
                      <img
                        src={`http://localhost:3000/sources/${song.capa}`}
                        height={60} width={60}
                      />

                      <div className="columnSongName">
                        {song.usuario} - {song.nome}
                      </div>
                    </div>
                  </Link>

                  <div style={{ display:'flex' }}>
                    <div className="mediumLike">
                      <Like id={song.id} size={45} />
                    </div>
                    <button 
                      className="addToPlaylistButton"
                      onClick={() => setAddId(song.id)}
                    >
                      <PiListPlusFill style={addToPlaylistButtonStyle} />
                    </button>
                  </div>
                </div>

                <AddSongToPlaylist 
                  songId={song.id} 
                  addId={addId}
                  songName={song.nome}
                  artistName={song.usuario}
                />
              </div> 
            )})}
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
                  <GiStonedSkull /> {genre.nome}
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