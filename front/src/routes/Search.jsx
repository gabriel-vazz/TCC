import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { PiListPlusFill } from 'react-icons/pi'
import { GiStonedSkull } from 'react-icons/gi'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'

import AddSongToPlaylist from '../components/AddSongToPlaylist'
import Header from '../components/Header'
import Like from '../components/Like'
import Flag from '../components/Flag'

const Search = () => {

  const { search } = useParams()
  const { category } = useParams()

  const [genres, setGenres] = useState([])
  const [songs, setSongs] = useState([])
  const [users, setUsers] = useState([])

  const [friends, setFriends] = useState([])
  const [noFriendsMessage, setNoFriendsMessage] = useState()

  const [addId, setAddId] = useState()
  const addToPlaylistButtonStyle = {
    color: '#fff0aa',
    height: 40, width: 40
  }

  const [userSearch, setUserSearch] = useState()
  const userSearchButtonStyle = {
    color: '#fff0aa', 
    height: 20, width: 20
  }

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/genres').then((response) => {
      setGenres(response.data)
    })
    axios.get('http://localhost:3000/songs').then((response) => {
      setSongs(response.data)
    })
    axios.get('http://localhost:3000/users').then((response) => {
      setUsers(response.data)
    })
    axios.get('http://localhost:3000/users/me/friends').then((response) => {
      if(response.data.msg) {
        setNoFriendsMessage(response.data.msg)
      } else {
        setFriends(response.data)
      }
    })
  }, [])

  if(category == 'songs') {
    return (
      <div>
        <Header />
        
        <div className="home">
          <div className="columnSongList" >
            <div 
              className="resultMessage"
              style={{ marginLeft: 0, marginBottom: 25 }}
            >
              exibindo resultados para "{search}":
            </div>

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

                    <div style={{ display: 'flex' }}>
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
              )})
            }     
          </div>
          
          <div className="genreLinks" style={{marginTop: 80}}>
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
  if(category == 'users') {
    return (
      <div>
        <Header />

        <div 
          className="resultMessage"
          style={{marginBottom: 30}}
        >
          exibindo resultados para "{search}":
        </div>

        <div className="home">
          <div>
            {users.filter((user) => {
              return user.nome.toLowerCase().includes(search.toLowerCase())
            }).map((user) => {
              return (
                <div className="columnUserContainer">
                  <Link 
                    style={{ textDecoration: 'none', color: '#fff0aa'}}
                    to={`/profile/${user.id}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: 15}}>
                      {user.nome} <Flag code={user.pais} />
                    </div>
                    
                    <div className="columnUserDescription">
                      {user.descricao}
                    </div>
                  </Link>
                </div> 
              )})
            }
          </div>

          <div className="friends">
            <div style={{ marginTop: -60, marginRight: 30 }}>
              :: seguido por você ::<br/>
            
              <div className="searchUserContainer">
                <input
                  className="searchUserInput"
                  placeholder="procurar perfil"
                  onChange={(e) => setUserSearch(e.target.value)}
                />

                <button 
                  className="searchUserButton"
                  onClick={() => {if(userSearch) {navigate(`/search/users/${userSearch}`)}}}
                >
                  <AiOutlineSearch style={userSearchButtonStyle} />
                </button>
              </div>
              
              <div className="friendList">
                {friends.map((friend) => {
                  if (friend.id_musica != null) {
                    return (
                      <div>
                        <div className="friend">
                          <Link
                            to={`/profile/${friend.id_usuario}`}
                            style={{ textDecoration: 'none', color: '#fff0aa' }}
                          >
                            {friend.nome_usuario}
                          </Link>

                          <div className="friendSong">
                            <Link
                              to={`/song/${friend.id_musica}`}
                              style={{ textDecoration: 'none', color: 'white' }}
                            >
                              <FaMusic style={{ marginRight: 6 }} /> 
                              {friend.nome_artista} - {friend.nome_musica} 
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className="friend">
                        <Link
                          to={`/profile/${friend.id_usuario}`}
                          style={{ textDecoration: 'none', color: '#fff0aa' }}
                        >
                          {friend.nome_usuario}
                        </Link>
                      </div>
                    )
                  }
                })}
              </div>

              <div className="noFriendsMessage">{noFriendsMessage}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search