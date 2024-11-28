import { useState } from 'react'
import './css/index.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './screens/landing-page.jsx'
import FolderPage from './screens/folder-page.jsx'
import NotePage from './screens/note-page.jsx'
import PetPage from './screens/pet-page.jsx'
import LoginPage from './screens/login-page.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PetPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/folder" element={<FolderPage />} />
        <Route path="/note" element={<NotePage />} />
      </Routes>
    </Router>
  )
}

export default App
