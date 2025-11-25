import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setUser({ ...user, email: value })

    if (!validateEmail(value)) {
      setErrors({ ...errors, email: "Invalid email format" })
    } else {
      setErrors({ ...errors, email: "" })
    }
  }

  const handlePasswordChange = (e) => {
  const value = e.target.value;
  setUser({ ...user, password: value });

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  if (!passwordRegex.test(value)) {
    setErrors({
      ...errors,
      password: "Password must be 8+ characters & include a number and special character (!@#$%^&*)"
    });
  } else {
    setErrors({ ...errors, password: "" });
  }
}


  const handleSubmit = async (e) => {
    e.preventDefault()

    // prevent submission if errors exist
    if (errors.email || errors.password) {
      alert("Fix the errors before submitting")
      return
    }

    try {
      const res = await axios.post("http://localhost:5000/register", user)

      if (res.data.status === "ok") {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))

        alert("Registration successful!")
        navigate("/dashboard")
      } else {
        alert(res.data.error || "Error occurred")
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-800'>
      <h1 className='bg-blue-50 pt-2 pb-2 pr-10 pl-10 relative top-5'>SIGNUP</h1>
      <form onSubmit={handleSubmit} className='bg-blue-950 p-10 w-96 rounded-xl flex flex-col justify-center items-center'>
        
        <input type="text" placeholder='Full name'
          onChange={(e)=>setUser({...user,name:e.target.value})}
          className='text-white w-full mb-2 border-2 p-2 rounded-xl' />
        
        <input type="date"
          onChange={(e)=>setUser({...user,dob:e.target.value})}
          className='text-white w-full mb-2 border-2 p-2 rounded-xl' />

        <input type="email" placeholder='Enter email'
          value={user.email}
          onChange={handleEmailChange}
          className='text-white w-full border-2 p-2 rounded-xl' />
        {errors.email && <p className="text-red-400 text-sm w-full text-left">{errors.email}</p>}

        <input type="password" placeholder='Enter password'
          value={user.password}
          onChange={handlePasswordChange}
          className='text-white w-full border-2 p-2 rounded-xl mt-2' />
        {errors.password && <p className="text-red-400 text-sm w-full text-left">{errors.password}</p>}

        <div className='w-full text-left text-white mt-2'>Already have an account?
          <Link to="/login" className='ml-1 text-blue-300'>Login</Link>
        </div>

        <button 
          className='mt-4 w-full bg-blue-50 p-2 rounded-xl'
          disabled={errors.email || errors.password}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register
