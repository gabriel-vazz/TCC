import { useState } from 'react'
import axios from 'axios'

import Header from '../components/Header'

import '../styles/playlist.css'

const NewPlaylist = () => {

  const [name, setName] = useState('nova playlist')
  const [description, setDescription] = useState()

  const [message, setMessage] = useState()

  const handleCreatePlaylist = async() => {
    await axios.post('http://localhost:3000/playlists', {
      name: name,
      description: description
    }).then((response) => {
      if(response.data.msg) {
        setMessage(response.data.msg)
      }
    })
  }

  return (
    <div>
      <Header />

      <div className="newPlaylist">:: criar playlist ::</div>

      <div className="newPlaylistText">nome:</div>
      <input 
        className="newPlaylistInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br/>

      <div className="newPlaylistText">descrição (opcional):</div>
      <textarea
        className="playlistDescriptionInput"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea><br />

      <button 
        className="createPlaylistButton"
        onClick={() => handleCreatePlaylist()}
      >
        CRIAR
      </button>

      <div className="createPlaylistMessage">{message}</div>
    </div>
  )
}

export default NewPlaylist