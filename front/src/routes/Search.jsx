import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'

import { PiListPlusFill } from 'react-icons/pi'

import AddSongToPlaylist from '../components/AddSongToPlaylist'
import Header from '../components/Header'

const Search = () => {

  const { search } = useParams()

  const [genres, setGenres] = useState([])
  const [songs, setSongs] = useState([])

  const addToPlaylistButtonStyle = {
    color: '#fff0aa',
    height: 40, width: 40
  }

  const [addId, setAddId] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/genres').then((response) => {
      setGenres(response.data)
    })
    axios.get('http://localhost:3000/songs').then((response) => {
      setSongs(response.data)
    })
  }, [])

  return (
    <div>
      <Header />
    
      <div className="resultMessage">exibindo resultados para "{search}":</div>

      <div className="home">
        <div className="columnSongList">
          {songs.filter((song) => {
            return song.nome.toLowerCase().includes(search.toLowerCase())
          }).map((song) => {
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

                  <button 
                    className="addToPlaylistButton"
                    onClick={() => setAddId(song.id)}
                  >
                    <PiListPlusFill style={addToPlaylistButtonStyle} />
                  </button>
                </div>

                <AddSongToPlaylist 
                  songId={song.id} 
                  addId={addId}
                  songName={song.nome}
                  artistName={song.usuario}
                />
              </div> 
            )})
          }
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

export default Search