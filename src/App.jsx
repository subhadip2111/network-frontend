import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import NetworkApp from './components/layout/FeedLayout'
import LandingPage from './components/layout/LandingLayout'
import Login from './components/pages/Auth/Login'
import VerifyOtp from './components/pages/Auth/VerifyOtp'
import ExplorePage from './components/layout/Explorelayout'
import Explore from './components/explore/Explore'
import JoinCommunitySection from './components/communities/JoinCommunitySection'
import { dummyCommunities } from './data/dummydata'
import PostsRoute from './components/pages/post/PostsRoute'
import CreatePost from './components/pages/post/CreatePost'
import Profile from './components/pages/profile/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={ <NetworkApp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
      <Route path="/explore" element={<ExplorePage/>} />
      <Route path="/profile" element={<Profile/>} />

      <Route path='/join-community' element={<JoinCommunitySection  />} />
              <Route path="/post" element={<CreatePost/>} />

      {/* Add other routes as needed */}
    </Routes>
  )
} 

export default App