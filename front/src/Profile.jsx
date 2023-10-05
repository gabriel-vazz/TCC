import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import Flag from './Flag'
import Header from './Header'

const Profile = () => {

    const { id } = useParams()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`).then((response) => {
            setUserData(response.data)
        })     
    }, [])

    return (
        <div>
            <Header />

            <div className="profilePage">
                {userData.map((user) => {
                    return (
                        <div >
                            <div className="profileInformation">
                                <div className="profileName">
                                    {user.nome} 
                                    <div className="flag">
                                        <Flag code={user.pais} />
                                    </div>
                                </div> 
                                <div className="profileDetails">xx seguidores, xx músicas</div>
                                <div className="profileDescription">{user.descricao}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile