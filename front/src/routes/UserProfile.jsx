import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import { FaMusic } from 'react-icons/fa'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

import Flag from '../components/Flag'
import Header from '../components/Header'

import '../styles/userprofile.css'
import DeleteSong from '../components/DeleteSong'

const UserProfile = () => {

  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [country, setCountry] = useState()

  const [songs, setSongs] = useState([])
  const [followers, setFollowers] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [likedSongs, setLikedSongs] = useState([])

  const [friends, setFriends] = useState([])

  const [noSongMessage, setNoSongMessage] = useState()
  const [noFriendsMessage, setNoFriendsMessage] = useState()
  const [noPlaylistsMessage, setNoPlaylistsMessage] = useState()
  
  const [deleteSongId, setDeleteSongId] = useState()
  const deleteSongIconStyle = {
    color: '#ff6969', 
    height: 40, width: 40, 
    marginTop: 5
  }

  const [search, setSearch] = useState()
  const searchButtonStyle = {
    color: '#fff0aa', 
    height: 20, width: 20
  }

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/users/me').then((response) => {
      setName(response.data[0].nome)
      setDescription(response.data[0].descricao)
      setCountry(response.data[0].pais)
    })

    axios.get('http://localhost:3000/users/me/songs').then((response) => {
      if (response.data.msg) {
        setNoSongMessage(response.data.msg)
      } else {
        setSongs(response.data)
      }
    })

    axios.get('http://localhost:3000/users/me/follows').then((response) => {
      setFollowers(response.data)
    })

    axios.get('http://localhost:3000/users/me/friends').then((response) => {
      if(response.data.msg) {
        setNoFriendsMessage(response.data.msg)
      } else {
        setFriends(response.data)
      }
    })

    axios.get('http://localhost:3000/users/me/playlists').then((response) => {
      if(response.data.msg) {
        setNoPlaylistsMessage(response.data.msg)
      } else {
        setPlaylists(response.data)
      }
    })

    axios.get('http://localhost:3000/users/me/songs/liked').then((response) => {
      setLikedSongs(response.data)
    })
  }, [])

  return (
    <div>
      <Header />

      <div className="profilePage">
        <div className="profile">
          <div className="profileContainer">
            <div className="profileInformation">
              <div className="profileName">{name}</div>

              <div className="profileDetails">
                {followers.length} seguidores, {songs.length} músicas
              </div>

              <div className="profileDescription">{description}</div>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              textAlign: 'right',
              justifyContent: 'space-between'
            }}>
              <div className="flag">
                <Flag code={country} />
              </div>

              <Link 
                style={{ textDecoration: 'none', color: '#fff0aa' }}
                to='/profile/me/edit'
              >
                <div style={{ fontSize: 18 }}>EDITAR PERFIL</div>
              </Link>
            </div>

            
          </div>

          <div className="profileSongs">:: suas músicas ::</div>

          <div className="columnSongList" style={{ marginLeft: 0 }}>
            {songs.map((song) => {
              return (
                <div>
                  <div className="columnSong">
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
                      className="deleteSongButton"
                      onClick={() => setDeleteSongId(song.id)}
                    >
                      <BsFillTrashFill style={deleteSongIconStyle}/>
                    </button>
                  </div>

                  <DeleteSong songId={song.id} deleteId={deleteSongId} />
                </div>
              )
            })}
          </div>

          <div className="noSongMessage">{noSongMessage}</div>

          <Link to='/post'>
            <button className="loginButton">
              POSTAR MÚSICA
            </button>
          </Link>

          <div className="profileSongs">:: suas playlists ::</div>

          <div className="playlistsContainer">
            {playlists.map((playlist) => {
              return (
                <Link 
                  to={`/playlist/${playlist.id}`} 
                  style={{ textDecoration: 'none' }}
                >
                  <div className="playlist">
                    {playlist.nome}
                  </div>
                </Link> 
              )
            })}
          </div>

          <div className="noPlaylistsMessage">{noPlaylistsMessage}</div>

          <Link to='/playlist/new'>
            <button className="loginButton">
              CRIAR PLAYLIST
            </button>
          </Link>

          <div className="profileSongs">
            :: músicas curtidas ({likedSongs.length}) ::
          </div>

          <div className="columnSongList">
            {likedSongs.map((song) => {
              return (
                <div style={{marginLeft: -25}}>
                  <div className="genreColumnSong">
                    <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                      <div className="columnSongInfo">
                        <img
                          src={`http://localhost:3000/sources/${song.capa}`}
                          height={60} width={60}
                        />

                        <div className="columnSongName">
                          {song.artista} - {song.nome}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div> 
              )})}
            </div>
        </div>

        <div className="friends">
          :: seguido por você ::<br/>

          <div className="searchUserContainer">
            <input
              className="searchUserInput"
              placeholder="procurar perfil"
              onChange={(e) => setSearch(e.target.value)}
            />

            <button 
              className="searchUserButton"
              onClick={() => {if(search) {navigate(`/search/users/${search}`)}}}
            >
              <AiOutlineSearch style={searchButtonStyle} />
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
  )
}

export default UserProfile