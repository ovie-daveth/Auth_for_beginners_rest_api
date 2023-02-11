import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [remind, setremind] = useState('off')
 
  const login = (e) => {
    e.preventDefault();
    console.log(email, password, remind)
  }
  return (
    <div>
       <div className='register'>
      <form className='registerForm' onSubmit={login}>
        <div className='formInput'>
            <label htmlFor="email">Email</label>
            <input 
            type="email" name="email" 
            placeholder='eg: johndoe@gmail.com' 
            value={email}
            onChange={e => setemail(e.target.value)}
            />
        </div>
        <div className='formInput'>
            <label htmlFor="email">Password</label>
            <input 
            type="password" name="password" 
            placeholder="Input a password" 
            value={password}
            onChange={e => setpassword(e.target.value)}
            />
        </div>
        <div className='formInput login'>
            <input type="checkbox" 
            value={remind}
            onChange={e => setremind(e.target.value)}
            />
            <label htmlFor="checkbox">Remember Password</label>
        </div>
        <div className='formInput'>
            <button type="submit">Sign In</button>
        </div>
        <small>Don't have an account? <Link to="/register">Sign Up</Link></small>
      </form>
    </div>
    </div>
  )
}

export default Login
