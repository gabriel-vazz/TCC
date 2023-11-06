import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { BiSolidPlusCircle } from 'react-icons/bi'

const AddSongToPlaylist = ({ 
  songId, addId, 
  songName, artistName
}) => {
  
  const [playlists, setPlaylists] = useState([])
  const [message, setMessage] = useState()
  const [responseMessage, setResponseMessage] = useState()

  const handleAddSong = async(playlistId) => {
    await axios.post('http://localhost:3000/playlists/songs', {
      songId: songId,
      playlistId: playlistId
    }).then((response) => {
      if(response.data.msg) {
        setResponseMessage(response.data.msg)
      }
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/users/me/playlists')
    .then((response) => {
      if(response.data.msg) {
        setMessage('você não possui playlists.')
      } else {
        setPlaylists(response.data)
      }
    })
  }, [])
  
  if(songId == addId) {
    if(!message) {
      return (
        <div className="choosePlaylistContainer">
          Adicionar "{artistName} - {songName}" para:<br/> 
         
          <div className="choosePlaylists">
            {playlists.map((playlist) => {
              return (
                <div 
                  className="choosePlaylist"
                  onClick={() => handleAddSong(playlist.id)}
                >
                  <BiSolidPlusCircle /> {playlist.nome}
                </div>
              ) 
            })}
          </div>

          <div className="playlistMessage">{responseMessage}</div>
        </div>
      )
    } else {
      return (
        <div className="noPlaylistsMessage">
          {message} 
          <Link 
            to='/playlist/new' 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              marginLeft: 8
            }}
          >
            criar playlist
          </Link>
        </div>
      )
    }
  }
}

export default AddSongToPlaylist