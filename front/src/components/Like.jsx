import { useState, useEffect } from 'react'
import axios from 'axios'

import { BiSolidHeartCircle, BiHeartCircle } from 'react-icons/bi'

const Like = ({ id }) => {

  const [likeIcon, setLikeIcon] = useState()
  const [isLiked, setIsLiked] = useState()
  const likeIconStyle = {
    color: '#ff6969',
    height: 69,
    width: 69,
    marginTop: 15
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

  useEffect(() => {
    axios.get(`http://localhost:3000/songs/${id}/liked`).then((response) => {
      if (response.data.liked) {
        setLikeIcon(<BiSolidHeartCircle style={likeIconStyle} />)
        setIsLiked(true)
      } else {
        setLikeIcon(<BiHeartCircle style={likeIconStyle} />)
        setIsLiked(false)
      }
    })
  }, [])
  
  return (
    <div onClick={() => handleLikeButton()}>{likeIcon}</div>
  )
}

export default Like