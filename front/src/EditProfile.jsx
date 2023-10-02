import { useState } from 'react'
import axios from 'axios'

import { useLocation }from 'react-router-dom'

import Header from './Header'

const EditProfile = () => {

    const location = useLocation()
    const profile = location.state.data

    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const saveChanges = async() => {
        await axios.post('http://localhost:3000/users', {
            name: name,
            description: description
        }).then((response) => {
            if(response.data.msg) {
                console.log(response.data.msg)
            }
        })
    }

    return (
        <div>
            <Header />

            <div className="editProfile">:: editar perfil ::</div>

            <input 
                onChange={(e) => setName(e.target.value)}
                className="editProfileInput"
                placeholder={profile.name}
            /><br/>

            <textarea
                rows="4" cols="56"
                onChange={(e) => setDescription(e.target.value)}
                className="editDescriptionInput"
                placeholder={profile.description}
            /><br/>
            
            <button 
                className="saveChangesButton"
                onClick={() => saveChanges()}
            >
                SALVAR
            </button>
            <br/>
        </div>
    )
}

export default EditProfile