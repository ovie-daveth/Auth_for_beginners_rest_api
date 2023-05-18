import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import {MdAlarm} from 'react-icons/md'
import { useUpdateUserMutation } from '../slice/userApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slice/authSlice'
import axios from 'axios'

const Profile = () => {
  const {user} = useSelector((state)=> state.auth.userInfo)
  const {email, name, location, gender, joined, lastupdate} = user

  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const [ updateUser, { isLoading} ] = useUpdateUserMutation()

  const [data, setData] = useState({
    email: email,
    name: name,
    location: location,
    gender
  })
 

  const updateProfile = async (e) => {
    e.preventDefault()
    // if(!location || !gender) {
    //   toast.error("These field are compulsory")
    //   setTimeout(() => {
    //     setError(false)
    //   }, 2000)
    //   setError(true)
    // }
    // try {
    //   const res = await updateUser(email, name, location, gender);
    //   const updatedUser = res.user;
    //   if(res.success){
    //     toast.success(res.succcess)
    //     dispatch(setCredentials({ ...res.user}))
    //   } else{
    //     toast.error("rest")
    //   }
      
    // } catch (error) {
      
    // }
    try {
      const res = await axios.put("http://localhost:8000/api/user", {email, name, location, gender});
      dispatch(setCredentials({ ...res}))
      toast.success(res.success)
    } catch (error) {
      
    }
  }

  return (
    <div className='bg-blue-300 h-screen flex items-center justify-center relative'>
     {
      error &&  <span className='absolute top-16 left-12 text-xl text-red-600'><MdAlarm /></span>
     }
     <form className={`border-[2px] border-white md:w-[50%] w-[80%] px-5 py-3 shadow-lg flex flex-col gap-4 ${error && "border-red-600"}`}>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg text-red-600" htmlFor="name">Full name</label>
          <input className='text-md font-semibold placeholder:text-sm py-3 px-3 rounded-sm shadow-md' type="text" id="name" value={name} onChange={(e)=> setData({ ...data, name:e.target.value})} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg text-red-600" htmlFor="email">Email</label>
          <input className='text-md font-semibold placeholder:text-sm py-3 px-3 rounded-sm shadow-md' type="email" id="email" value={email} onChange={(e)=> setData({ ...data, email:e.target.value})} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg text-red-600" htmlFor="location">Location</label>
          <input className='text-md font-semibold placeholder:text-sm py-3 px-3 rounded-sm shadow-md' type="text" value={location} onChange={(e)=> setData({ ...data, location:e.target.value})} />
        </div>
        <div className="flex flex-col gap-2">
          <label  className="font-bold text-lg text-red-600" htmlFor="name">Gender</label>
          <input className='text-md font-semibold placeholder:text-sm py-3 px-3 rounded-sm shadow-md' type="text" value={gender} onChange={(e)=> setData({ ...data, gender:e.target.value})} />
        </div>
        <button onClick={updateProfile} className='w-full bg-indigo-600 text-white font-bold py-2 rounded-sm hover:bg-red-600 active:bg-indigo-600'>Update</button>
     </form>
    </div>
  )
}

export default Profile
