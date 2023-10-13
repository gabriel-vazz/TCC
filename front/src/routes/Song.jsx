import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, Link } from 'react-router-dom'

import AudioPlayer from 'react-h5-audio-player'
import '../styles/audioplayer.css'
import '../styles/song.css'

import { BiSolidHeartCircle, BiHeartCircle } from 'react-icons/bi'

import Header from '../components/Header'

const Song = () => {

  const { id } = useParams()

  const [songData, setSongData] = useState([])
  const [genres, setGenres] = useState([])
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [description, setDescription] = useState()

  const [likeIcon, setLikeIcon] = useState()
  const [isLiked, setIsLiked] = useState()
  const likeIconStyle = {
    color: '#ff6969',
    height: 69,
    width: 69,
    marginTop: 15
  }

  const [comment, setComment] = useState()

  const [message, setMessage] = useState()

  const handlePlayButton = async () => {
    await axios.post('http://localhost:3000/users/songs/current', { id: id })
  }

  const handleLikeButton = async () => {
    await axios.post('http://localhost:3000/songs/likes', { id: id })

    if (!isLiked) {
      setLikeIcon(<BiSolidHeartCircle style={likeIconStyle} />)
      setIsLiked(true)
    } else {
      setLikeIcon(<BiHeartCircle style={likeIconStyle} />)
      setIsLiked(false)
    }
  }

  const postComment = async () => {
    await axios.post('http://localhost:3000/songs/comments', {
      comment: comment,
      id: id
    }).then((response) => {
      if (response.data.msg) {
        setMessage(response.data.msg)
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

    axios.get(`http://localhost:3000/songs/${id}/liked`).then((response) => {
      if (response.data.liked) {
        setLikeIcon(<BiSolidHeartCircle style={likeIconStyle} />)
        setIsLiked(true)
      } else {
        setLikeIcon(<BiHeartCircle style={likeIconStyle} />)
        setIsLiked(false)
      }
    })

    axios.get(`http://localhost:3000/songs/${id}/comments`).then((response) => {
      setComments(response.data)
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

                <div onClick={() => handleLikeButton()}>{likeIcon}</div>
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

        <div className="commentMessage">{message}</div>
      </div>

      <div className="commentsContainer">
        <div>
          {comments.map((comment) => {
            return (
              <div className="comment">
                <Link to={`/profile/${comment.idcomentou}`} style={{ textDecoration: 'none' }}>
                  <div className="username">{comment.nome}</div>
                </Link>

                <div className="commentText">{comment.texto}</div>
              </div>
            )
          })}
        </div>

        <div className="description">{description}</div>
      </div>
    </div>
  )
}

export default Song