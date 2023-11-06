import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, Link } from 'react-router-dom'

import AudioPlayer from 'react-h5-audio-player'
import '../styles/audioplayer.css'
import '../styles/song.css'

import Header from '../components/Header'
import Like from '../components/Like'
import DeleteComment from '../components/DeleteComment'

import { BsFillTrashFill } from 'react-icons/bs'

const Song = () => {

  const { id } = useParams()

  const [songData, setSongData] = useState([])
  const [genres, setGenres] = useState([])
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [description, setDescription] = useState()

  const [comment, setComment] = useState()
  const [commentMessage, setCommentMessage] = useState()
  
  const [deleteCommentId, setDeleteCommentId] = useState([])
  const [deleteCommentMessage, setDeleteCommentMessage] = useState()
  const deleteCommentIconStyle = {
    color: '#ff6969', 
    height: 40, width: 40, 
    marginTop: 5
  }

  const [userId, setUserId] = useState()

  const handlePlayButton = async () => {
    await axios.post('http://localhost:3000/users/songs/current', { id: id })
  }

  const postComment = async () => {
    await axios.post('http://localhost:3000/songs/comments', {
      comment: comment, 
      id: id
    }).then((response) => {
      if (response.data.msg) {
        setCommentMessage(response.data.msg)
      }
    })
  }

  const handleDeleteComment = async(comment) => { 
    setDeleteCommentId([...deleteCommentId, comment.id])
    await axios.delete(`http://localhost:3000/songs/comments/${comment.id}`)
    .then((response) => {
      if (response.data.msg) {
        setDeleteCommentMessage(response.data.msg)
      }
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/songs/${id}/genres`).then((response) => {
      setGenres(response.data)
    })
    axios.get(`http://localhost:3000/songs/${id}/likes`).then((response) => {
      setLikes(response.data)
    })
    axios.get(`http://localhost:3000/songs/${id}/comments`).then((response) => {
      setComments(response.data)
    })
    axios.get('http://localhost:3000/users/me').then((response) => {
      setUserId(response.data[0].id)
    })
    axios.get(`http://localhost:3000/songs/${id}`).then((response) => {
      setSongData(response.data)
      setDescription(response.data[0].descricao)
    })
  }, [])

  return (
    <div>
      <Header />

      <div className="songGenres">
        {genres.map((genre) => {
          return (
            <Link to={`/genre/${genre.id}`} style={{ textDecoration: 'none' }}>
              <div className="songGenre">
                {genre.nome}
              </div>
            </Link>
          )
        })}
      </div>

      {songData.map((song) => {
        return (
          <div className="bigSong">
            <img
              src={`http://localhost:3000/sources/${song.capa}`}
              height={350} width={350}
            />
            <div style={{ paddingLeft: 30 }}>
              <div className="bigSongNames">
                <div>
                  <div className="bigSongName">{song.nome}</div>

                  <Link to={`/profile/${song.idusuario}`} style={{ textDecoration: 'none' }}>
                    <div className="bigSongArtistName">{song.usuario}</div>
                  </Link>
                </div>

                <Like id={id} size={69} />
              </div>

              <AudioPlayer
                src={`http://localhost:3000/sources/${song.musica}`}
                onPlay={() => handlePlayButton()}
              />

              <div className="details">
                {likes.length} curtidas, {comments.length} comentários
              </div>
            </div>
          </div>
        )
      })}

      <div className="comments">:: comentários ::</div>

      <textarea
        className="commentInput"
        placeholder="escreva seu comentário!"
        rows="4" cols="88"
        onChange={(e) => setComment(e.target.value)}
      ></textarea><br />

      <div className="postComment">
        <button className="commentButton" onClick={() => postComment()}>
          COMENTAR
        </button>

        <div className="commentMessage">{commentMessage}</div>
      </div>

      <div className="commentsContainer">
        <div>
          {comments.map((comment) => {
            if(comment.idcomentou == userId) {
              return (
                <div className="comment">
                  <div className="commentContainer">
                    <div className="commentInfo">
                      <Link 
                        to={`/profile/${comment.idcomentou}`} 
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="username">{comment.nome}</div>
                      </Link>
                      <div className="commentText">{comment.texto}</div>
                    </div>

                    <div 
                      className="deleteComment"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      <BsFillTrashFill style={deleteCommentIconStyle} />  
                    </div>
                  </div>

                  <DeleteComment 
                    commentId={comment.id} 
                    deleteId={deleteCommentId} 
                    message={deleteCommentMessage}
                  />
                </div>
              )
            }
          })}

          {comments.map((comment) => {
            if(comment.idcomentou != userId) {
              return (
                <div className="comment">
                  <div className="commentContainer">
                    <div className="commentInfo">
                      <Link 
                        to={`/profile/${comment.idcomentou}`} 
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="username">{comment.nome}</div>
                      </Link>
                      <div className="commentText">{comment.texto}</div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>

        <div className="description">{description}</div>
      </div>
    </div>
  )
}

export default Song