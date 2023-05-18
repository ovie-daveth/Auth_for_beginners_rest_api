import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slice/userApiSlice';
import { setCredentials } from '../slice/authSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');

  const { name, email, password } = data;

  const inputs = [
    {
      id: 1,
      value: name,
      type: 'text',
      name: 'name',
    },
    {
      id: 2,
      value: email,
      type: 'email',
      name: 'email',
    },
    {
      id: 3,
      value: password,
      type: 'password',
      name: 'password',
    },
  ];

  const nav = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation();

  const next = async (e) => {
    e.preventDefault();
    if (currentIndex === inputs.length - 1) {  // this checks for the last field eg inputs.length === 3, hence 3-1 == 2 which is how arrays are indexed
      if (!name || !email || !password) { //it checks if all the field are filled, if not throw an error
        setError('Please fill in all fields');
        return;
      }
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log(res.user)
        if (res.error) {
          const errorMessage = res.error; //i used this because inmy server i spcified statuscode 404  which is a server error. so I am passing the server error into my client
          toast.error(errorMessage);
        } else if(res.success) {
          nav("/")
          toast.success(res.success)
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        console.log(err?.data?.message || err.error)
      }

    } else {
      if (!data[inputs[currentIndex].name]) { //checks if there is data in a particular input field, if no, throw an error. data.[] is how we index an array/object. inputs[currentIndex].name is the name of the attricbute of the cuurent input field tat could be === "email", "name" or "password". so in essence we are simply looping with if ie if !data[email] or !data[name] or !data[password] then do this.
        setError('Input cannot be empty');
        return;
      }
      setCurrentIndex(currentIndex + 1);
      setError('');
    }
  };

  const back = (e) => {
    e.preventDefault();
    setCurrentIndex(currentIndex - 1);
    setError('');
  };
  

  const inputChange = (id, value) => {
    const updatedData = { ...data, [inputs[id - 1].name]: value }; // we set the input.name to its value
    setData(updatedData);
    setError("")
  };


  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen">
      <form className='bg-white shadow-md w-[500px] h-[200px] flex items-center flex-col justify-center gap-5'>
      <h1 className='font-bold text-lg text-indigo-600 capitalize'>Please Register to continue</h1>
        {inputs.map((item, index) => (
          <div
            key={item.id}
            //style={{ display: index === currentIndex ? 'flex' : 'none' }}
            className={`${index === currentIndex ? "flex items-start justify-between" : "hidden"}`}
          >
           <div className="flex flex-col gap-3">
           <input
              type={item.type}
              placeholder={`Enter your ${item.name}`}
              value={item.value}
              onChange={(e) => inputChange(item.id, e.target.value)}
              className='bg-indigo-300 text-white font-semibold px-2 py-2 placeholder:text-white placeholder:font-semibold'
            />
            {currentIndex > 0 && (
            <button onClick={back} className='bg-indigo-600 py-2 px-5 text-white font-semibold rounded-sm hover:bg-red-500 active:bg-indigo-600'>Back</button>
            )}
            {error && index === currentIndex && <p className='text-red-600 italic font-bold'>{error}</p>}
           </div>
            <button onClick={next} className='ml-6 bg-indigo-600 py-2 px-5 text-white font-semibold rounded-sm hover:bg-red-500 active:bg-indigo-600'>Next</button>
            
          </div>
        ))}
      </form>
    </div>
  );
};

export default Register;

