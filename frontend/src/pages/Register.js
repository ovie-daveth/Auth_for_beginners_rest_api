import React, { useState } from 'react'
import './pages.css/register.css'
import { Link } from 'react-router-dom'

const Register = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const register = (e) => {
        e.preventDefault();
        console.log(email, password)
    }
  return (
    <div className='register'>
      <form className='registerForm' onSubmit={register}>
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
        <div className='formInput'>
            <button type="submit">SignUp</button>
        </div>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </form>
    </div>
  )
}

export default Register
