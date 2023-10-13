import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import UserProfile from './routes/UserProfile'
import Post from './routes/Post'
import Genre from './routes/Genre'
import Song from './routes/Song'
import EditProfile from './routes/EditProfile'
import Profile from './routes/Profile'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/me" element={<UserProfile />} />
          <Route path="/post" element={<Post />} />
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