import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Login from './Login'
import Register from './Register'
import Home from "./Home"
import MyProfile from './MyProfile'
import PostSong from './PostSong'
import Genre from './Genre'
import Song from './Song'
import EditProfile from './EditProfile'
import Profile from './Profile'

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/myProfile" element={<MyProfile />} />
                    <Route path="/postSong" element={<PostSong />} />
                    <Route path="/genre/:id" element={<Genre />} />
                    <Route path="/song/:id" element={<Song />} />
                    <Route path="/editProfile" element={<EditProfile />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </Router>
        </>
    )
}

export default App