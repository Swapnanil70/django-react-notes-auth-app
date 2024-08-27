import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoutes'

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              // Very interesting, ache jodi user authenticated na thake tahole
              // Home page e jabe na, karon home page shuidhu authenticated user der jonno
              <ProtectedRoute>
                {/* <Route path='/home' element={<Home/>}/> */}
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Login Page e emni o jawa jabe no matter what */}
          <Route path="/login" element={<Login /> } />
          {/* Logout korar jonno */}
          <Route path="/logout" element={<Logout /> } />
          {/* Logout korar por shob token clear kore register page e jabe */}
          <Route path="/register" element={<RegisterAndLogout /> } />
          {/* Jodi onno kono alada page e jai tahole ota not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
