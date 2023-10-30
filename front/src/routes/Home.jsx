import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import { AiOutlineSearch } from 'react-icons/ai'

import Header from '../components/Header'
import '../styles/home.css'

const Home = () => {

  const [username, setUsername] = useState()

  const [songs, setSongs] = useState([])
  const [genres, setGenres] = useState([])

  const [search, setSearch] = useState()
  const searchButtonStyle = {
    color: '#fff0aa', 
    height: 30, width: 30
  }

  const navigate = useNavigate()

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

      <div className="welcome">
        bem vindo de volta, {username}

        <div className="searchField">
          <input
            className="searchInput"
            placeholder="O que você quer ouvir hoje?"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => {if(search) {navigate(`/search/${search}`)}}}
            className="searchButton"
          >
            <AiOutlineSearch style={searchButtonStyle} />
          </button>
        </div>
      </div>

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

                  <Link to={`/profile/${song.idusuario}`} style={{ textDecoration: 'none' }}>
                    <div className="artistName">{song.usuario}</div>
                  </Link>
                </Link>
              </div>
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

export default Home