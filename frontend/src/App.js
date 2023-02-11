import './App.css';
import {BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className='nav_bar'>
          <div className='logo'>
            <h1>Anthena</h1>
            <small>The best Video Streamer</small>
          </div>
          <div className='menus'>
          <ul>
          <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/list">List</NavLink></li>
          </ul>
          </div>
        </nav>
      </header>
      <div className='container'>
      
      </div>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<List />} />
          </Routes>
      </BrowserRouter>

  );
}

export default App;
