import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'
import {Toaster} from 'react-hot-toast'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

const App = () => {
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
    </>
  )
}

export default App
