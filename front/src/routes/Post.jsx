import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../components/Header'

import '../styles/post.css'

const PostSong = () => {

  const [name, setName] = useState()
  const [cover, setCover] = useState()
  const [song, setSong] = useState()
  const [genresID, setGenresID] = useState([])
  const [description, setDescription] = useState()

  const [genres, setGenres] = useState([])
  const [message, setMessage] = useState()

  const postSong = () => {

    const genresJSON = JSON.stringify(genresID)

    const formData = new FormData()
    formData.append('capa', cover)
    formData.append('musica', song)
    formData.append('nome', name)
    formData.append('generos', genresJSON)
    formData.append('descricao', description)

    axios.post('http://localhost:3000/songs', formData).then((response) => {
      if (response.data.msg) {
        setMessage(response.data.msg)
      }
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/genres').then((response) => {
      setGenres(response.data)
    })
  }, [])

  return (
    <div>
      <Header />

      <div className="postSongText">
        <div className="postSongFields">
          :: postar música ::
        </div>

        nome: <br />
        <input
          onChange={(e) => setName(e.target.value)}
          className="postSongInput"
          type="text"
          name="nome"
        /><br />

        arquivo mp3: <br />
        <input
          onChange={(e) => setSong(e.target.files[0])}
          className="postSongInput"
          type="file"
          name="musica"
        /><br />

        imagem da capa: <br />
        <input
          onChange={(e) => setCover(e.target.files[0])}
          className="postSongInput"
          type="file"
          name="capa"
        /><br /><br />

        <div className="postSongFields">
          :: tags e categorias ::
        </div>

        {genres.map((genre) => {
          return (
            <div className="postSongGenre">
              <input
                type="checkbox" value={genre.id}
                onChange={() => {
                  if (!genresID.includes(genre.id)) {
                    setGenresID([...genresID, genre.id])
                  } else {
                    genresID.pop(genre.id)
                  }
                }}
              />
              {genre.nome}
            </div>
          )
        })}<br />

        <div className="postSongFields">
          :: descrição ::
        </div>

        <textarea
          name="descricao"
          className="songDescriptionInput"
          placeholder="ex: letra, observações, cifras... (opcional)"
          rows="10" cols="69"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea><br />

        <button
          className="loginButton"
          onClick={() => postSong()}
        >
          POSTAR
        </button><br />

        <div className="message">{message}</div>
        <br /><br />
      </div>
    </div>
  )
}

export default PostSong