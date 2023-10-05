import { useState, useEffect } from 'react'
import axios from 'axios'

import countries from './countries.json'

import Flag from './Flag'
import Header from './Header'

const EditProfile = () => {

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [country, setCountry] = useState()
    const [defaultCountry, setDefaultCountry] = useState()

    const [message, setMessage] = useState()

    const saveChanges = async() => {
        await axios.post('http://localhost:3000/users/me', {
            name: name,
            description: description,
            country: country
        }).then((response) => {
            if(response.data.msg) {
                setMessage(response.data.msg)
            }
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3000/users/me').then((response) => {
            setName(response.data[0].nome)
            setDescription(response.data[0].descricao)
            setCountry(response.data[0].pais)
            setDefaultCountry(response.data[0].pais.toUpperCase())
        })
    }, [])

    return (
        <div>
            <Header />
            
            <div className="editProfileContainer">
                <input 
                    onChange={(e) => setName(e.target.value)}
                    className="editProfileInput"
                    value={name}
                /><br/>

                <textarea
                    rows="4" cols="73"
                    onChange={(e) => setDescription(e.target.value)}
                    className="editDescriptionInput"
                    placeholder="adicione uma descrição ao seu perfil!"
                    value={description}
                /><br/>
                
                <div>
                    <select 
                        onChange={(e) => setCountry(e.target.value.toLowerCase())} 
                        className="countrySelect"
                    >
                        <option>{defaultCountry}</option>
                        {countries.map((country) => {
                            return <option value={country.code}>{country.name}</option>
                        })}
                        <option value=""></option>
                    </select>

                    <div className="editFlag">
                        <Flag code={country} />
                    </div>
                </div>
            </div>
            
            <button className="saveChangesButton" onClick={() => saveChanges()}>
                SALVAR
            </button>
            
            <div className="saveMessage">{message}</div>
        </div>
    )
}

export default EditProfile