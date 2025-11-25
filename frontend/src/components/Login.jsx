import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({ email:"", password:"" })

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
const res = await axios.post("http://localhost:5000/login", data)


    if (res.data.status === "ok") {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      alert("Login Successful!")
      navigate("/dashboard")
    } else {
      alert(res.data.error || "Login failed")
    }
  } catch (err) {
    alert(err.response?.data?.error || "Login failed")
  }
}


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-800'>
        <h1 className='bg-blue-50 pt-2 pb-2 pr-10 pl-10 relative top-5'>LOGIN</h1>
        <form onSubmit={handleSubmit} className='bg-blue-950 p-10 w-96 rounded-xl flex flex-col justify-center items-center'>
            <input type="email" placeholder='Enter email'
              onChange={(e)=>setData({...data,email:e.target.value})}
              className='text-white w-full mb-2 border-2 p-2 rounded-xl' />
            <input type="password" placeholder='Enter password'
              onChange={(e)=>setData({...data,password:e.target.value})}
              className='text-white w-full mb-2 border-2 p-2 rounded-xl' />

            <div className='w-full text-left text-white'>Create an account?
              <Link to="/register" className='ml-1 text-blue-300'>Signup</Link>
            </div>

            <button className='mt-4 w-full bg-blue-50 p-2 rounded-xl'>Submit</button>
        </form>
    </div>
  )
}

export default Login
