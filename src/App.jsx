import { useState } from 'react'

import './App.css'

import LandingPage from './components/Landing/LandingPage'
import { Routes ,Route} from 'react-router-dom'
import Login from './components/Auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      {/* <Route path="/explore" element={<LandingPage />} />
      <Route path="/top-ideas" element={<LandingPage />} />
      <Route path="/community" element={<LandingPage />} /> */}
      {/* Add other routes here as needed */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/explore" element={<Explore />} /> */}
      {/* <Route path="/top-ideas" element={<TopIdeas />} /> */}
      {/* <Route path="/community" element={<Community />} /> */}
    </Routes>
    </>
  )
}

export default App
