import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, useNavigate, Link } from 'react-router-dom'

import Flag from '../components/Flag'
import Header from '../components/Header'

import '../styles/profile.css'

const Profile = () => {

  const { id } = useParams()

  const [profileData, setProfileData] = useState([])
  const [profileName, setProfileName] = useState()
  const [songs, setSongs] = useState([])
  const [followers, setFollowers] = useState([])
  const [likedSongs, setLikedSongs] = useState([])
  const [playlists, setPlaylists] = useState([])

  const [followButtonText, setFollowButtonText] = useState()
  const [isFollowed, setIsFollowed] = useState()

  const [userId, setUserId] = useState()

  const [message, setMessage] = useState()
  const [likedSongsMessage, setLikedSongsMessage] = useState()
  const [noSongsMessage, setNoSongsMessage] = useState()
  const [noPlaylistsMessage, setNoPlaylistsMessage] = useState()

  const handleFollowButton = async () => {
    if (!isFollowed) {
      setFollowButtonText('DEIXAR DE SEGUIR')
      setIsFollowed(true)
    } else {
      setFollowButtonText('SEGUIR')
      setIsFollowed(false)
    }
    
    await axios.post('http://localhost:3000/users/follows', { id: id })
    .then((response) => {
      if(response.data.msg) {
        setMessage(response.data.msg)
      }
    })
  }

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/users/me').then((response) => {
      setUserId(response.data[0].id)
    })
    axios.get(`http://localhost:3000/users/${id}`).then((response) => {
      setProfileData(response.data)
      setProfileName(response.data[0].nome)
    })
    axios.get(`http://localhost:3000/users/${id}/songs`).then((response) => {
      if(response.data.msg) {
        setNoSongsMessage(response.data.msg)
      } else {
        setSongs(response.data)
      }
    })

    axios.get(`http://localhost:3000/users/${id}/follows`).then((response) => {
      setFollowers(response.data)
    })
    axios.get(`http://localhost:3000/users/${id}/followed`).then((response) => {
      if (response.data.followed) {
        setFollowButtonText('DEIXAR DE SEGUIR')
        setIsFollowed(true)
      } else {
        setFollowButtonText('SEGUIR')
        setIsFollowed(false)
      }
    })

    axios.get(`http://localhost:3000/users/${id}/songs/liked`).then((response) => {
      if(response.data.msg) {
        setLikedSongsMessage(response.data.msg)
      } else {
        setLikedSongs(response.data)
      }
    })

    axios.get(`http://localhost:3000/users/${id}/playlists`).then((response) => {
      if(response.data.msg) {
        setNoPlaylistsMessage(response.data.msg)
      } else {
        setPlaylists(response.data)
      }
    })
  }, [])

  if (userId == id) {
    navigate('/profile/me')
  } else {
    return (
      <div>
        <Header />

        <div className="profilePage">
          <div className="profile">
            {profileData.map((user) => {
              return (
                <div >
                  <div className="profileInformation">
                    <div className="profileName">
                      {user.nome}
                      <div className="flag">
                        <Flag code={user.pais} />
                      </div>
                    </div>

                    <div className="profileDetails">
                      {followers.length} seguidores, {songs.length} músicas
                    </div>

                    <div className="profileDescription">{user.descricao}</div>
                  </div>
                </div>
              )
            })}

            <button
              className="followProfileButton"
              onClick={() => handleFollowButton()}
            >
              {followButtonText}
            </button>

            <div className="message">{message}</div>

            <div className="profileSongs">
              {songs.map((song) => {
                return (
                  <div className="profileSong">
                    <div>
                      <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                        <img
                          src={`http://localhost:3000/sources/${song.capa}`}
                          height={180} width={180}
                        />
                      </Link>
                      <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div>
                          <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                            <div className="songName">{song.nome}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div> 
                ) 
              })}
            </div>

            <div className="profilePlaylists">
              :: playlists criadas por {profileName} ::
            </div>

            <div 
              className="playlistsContainer" 
              style={{ width: 725, marginTop: 10 }}
            >
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

            <div className="noProfilePlaylistsMessage">{noPlaylistsMessage}</div>
          </div>
          
          
          <div className="columnSongList" style={{ marginRight: 15 }}>
            <div className="userLikedSongs">
              :: músicas curtidas por {profileName} ::
            </div>

            {likedSongs.map((song) => {
              return (
                <div>
                  <div className="genreColumnSong" style={{ width: 400 }}>
                    <Link to={`/song/${song.id}`} style={{ textDecoration: 'none' }}>
                      <div className="columnSongInfo" >
                        <img
                          src={`http://localhost:3000/sources/${song.capa}`}
                          height={40} width={40}
                        />
                        <div className="columnSongName" style={{fontSize: 16}}>
                          {song.artista} - {song.nome}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div> 
              )})}
              <div className="noLikedSongsMessage">{likedSongsMessage}</div>
            </div>
        </div>

        
      </div>
    )
  }
}

export default Profile