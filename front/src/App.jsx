import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Login from './Login'
import Register from './Register'
import Home from "./Home"
import MyProfile from './MyProfile'
import PostSong from './PostSong'
import Genre from './Genre'
import Song from './Song'
import EditProfile from './EditProfile'

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
                    <Route path="/genre" element={<Genre />} />
                    <Route path="/song" element={<Song />} />
                    <Route path="/editProfile" element={<EditProfile />}/>
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