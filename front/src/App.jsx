import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Login from './Login'
import Register from './Register'
import Home from "./Home"
import ProfilePage from './ProfilePage'
import PostSong from './PostSong'
import Genre from './Genre'
import Song from './Song'

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/profilePage" element={<ProfilePage />}/>
                    <Route path="/postSong" element={<PostSong />}/>
                    <Route path="/genre" element={<Genre />}/>
                    <Route path="/song" element={<Song />} />
                </Routes>
            </Router>

            {/*}<div style={{color: 'yellow', marginTop: 90}}>
                stuff. <br/>
                feito por Gabriel Vaz Lima
            </div>{*/}
        </>
    )
}

export default App