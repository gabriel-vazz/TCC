import { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Header from './Header'

const ProfilePage = () => {

    return (
        <div>
            <Header />

            <Link to='/postSong'>
                <button className="loginButton">
                    POSTAR MÚSICA
                </button>
            </Link>
        </div>
    )
}

export default ProfilePage