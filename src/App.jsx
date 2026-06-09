import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'

function App() {
  const { user } = useAuth()
  return (
    <div>
      <Navbar />
      {/* <p>User: {user ? user.name : 'Not logged in'}</p> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/postDetail/:id" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

export default App
