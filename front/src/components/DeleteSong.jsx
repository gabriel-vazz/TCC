import { useState } from 'react'
import axios from 'axios'

const DeleteSong = ({ songId, deleteId }) => {
  
  const [message, setMessage] = useState()
  
  const handleDeleteSong = async() => {
    await axios.delete(`http://localhost:3000/songs/${deleteId}`)
    .then((response) => {
      if(response.data.msg) {
        setMessage(response.data.msg)
      }
    })
  }
  
  if(songId == deleteId) {
    if(!message) {
      return (
        <div className="deleteSongMessage">
          você deseja mesmo excluir essa musica? (não há como restaurá-la!).
  
          <button className="confirmDeleteSong" onClick={() => handleDeleteSong()}>
            excluir música
          </button>
        </div>
      ) 
    } else {
      return <div className="message">{message}</div>
    }
  }
}

export default DeleteSong