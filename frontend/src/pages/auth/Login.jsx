import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Login = () => {
  const { loginUser } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target)

    const email = e.target.email.value
    const password = e.target.password.value

    loginUser(email, password)
  }
  return (
    <div className="lg:h-screen w-auto flex py-4
    flex-row justify-center items-center
    items-centermin-h-screen bg-gradient-to-r from-blue-500 to-green-500">

      <div className="border-2 w-56 sm:w-72 md:w-96 lg:w-96 h-auto
    flex flex-col justify-start items-center
    rounded-2xl border-sky-800 bg-white shadow-2xl p-4 mt-6">
      
        <div className='w-full h-auto  
        flex flex-col justify-start items-start '>
          <h1 className='text-2xl font-semibold
          flex flex-row justify-center items-center
          w-full h-10'>Login</h1>
          <p className='text-lg font-semibold
          flex flex-row justify-center items-center
          w-full h-10 mb-6'>Sign Into Your Account</p>

          <form onSubmit={handleSubmit}>

            <label className='text-lg font-semibold
            w-full h-10
            '>Email:</label>
            <input
              className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
              type="email"
              name="email"
              required />

            <label className='text-lg font-semibold
            w-full h-10
            '>Password:</label>
            <input
              className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
              type="password"
              name="password"
              required />

            <div className='flex flex-row justify-start items-start
            text-blue-800
            w-full h-auto mt-8
            '>
              <button
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md
                            flex flex-row justify-center items-center
                            hover:bg-blue-600 transition duration-200 ease-in-out'
                type='submit'>Login</button>
            </div>

            <span className='flex flex-col text-md'>Don't Have an Account
              <Link
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md
                              flex flex-row justify-center items-center
                              hover:bg-blue-600 transition duration-200 ease-in-out'
                to="/register">Register</Link>
            </span>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login