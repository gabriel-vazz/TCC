import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import Flag from '../components/Flag'
import Header from '../components/Header'

import UserProfile from './UserProfile'

import '../styles/profile.css'

const Profile = () => {

  const { id } = useParams()

  const [profileData, setProfileData] = useState([])
  const [songs, setSongs] = useState([])
  const [followers, setFollowers] = useState([])

  const [friends, setFriends] = useState([])

  const [followButtonText, setFollowButtonText] = useState()
  const [isFollowed, setIsFollowed] = useState()

  const [userId, setUserId] = useState()

  const [message, setMessage] = useState()

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

  useEffect(() => {
    axios.get('http://localhost:3000/users/me').then((response) => {
      setUserId(response.data[0].id)
    })
    axios.get(`http://localhost:3000/users/${id}`).then((response) => {
      setProfileData(response.data)
    })
    axios.get(`http://localhost:3000/users/${id}/songs`).then((response) => {
      setSongs(response.data)
    })
    axios.get(`http://localhost:3000/users/${id}/follows`).then((response) => {
      setFollowers(response.data)
    })
    axios.get('http://localhost:3000/users/me/friends').then((response) => {
      setFriends(response.data)
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
  }, [])

  if (userId == id) {
    return <UserProfile />
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
          </div>
        </div>
      </div>
    )
  }
}

export default Profile