import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../../context/AuthContext"


const Register = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const { registerUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(fullName)
    console.log(email)
    console.log(username)

    registerUser(fullName, email, username, password, password2)
  }

  return (

    <>
      <div className=" w-auto flex h-full
    flex-row justify-center items-center
    items-centermin-h-screen bg-gradient-to-r from-blue-500 to-green-500">

        <div className="border-2 w-56 sm:w-72 md:w-96 lg:w-96 h-auto
      flex flex-col justify-start items-center
      rounded-2xl border-sky-800 bg-white shadow-2xl p-4 mt-2">

          <div className='w-full
    flex flex-col justify-start items-start '>
            <h1 className='text-2xl font-semibold
      flex flex-row justify-center items-center
      w-full h-6'>Register</h1>
            <p className='text-lg font-semibold
      flex flex-row justify-center items-center
      w-full h-10 mb-4'>Create a new account</p>

            <form
              className='w-full'
            >
              <label className='text-lg font-semibold
        w-full h-10'
              >Full Name:</label>
              <input
                className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
                type="text"
                name="full_name"
                onChange={(e) => setFullName(e.target.value)}
                required />

              <label className='text-lg font-semibold
        w-full h-10'>Email:</label>
              <input
                className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required />

              <label className='text-lg font-semibold
        w-full h-10'
              >Username:</label>
              <input
                className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required />

              <label className='text-lg font-semibold
        w-full h-10'
              >Password:</label>
              <input
                className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required />

              <label className='text-lg font-semibold
        w-full h-10'
              >Confirm Password:</label>
              <input
                className='w-full h-10 border-sky-800 rounded-2xl border-2 p-1'
                type="password"
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
                required />

              <div className='flex flex-row justify-start items-start
        text-blue-800
        w-full h-auto mt-8'>
                <button
                  className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md
                              flex flex-row justify-center items-center
                              hover:bg-blue-600 transition duration-200 ease-in-out'
                  onClick={handleSubmit}
                  type='button'>
                  Register
                </button>
              </div>
              <span className='w-full flex flex-col text-md'>Already have an account:
                <Link
                  className='w-full bg-blue-800 text-white mb-1 p-2 rounded-md
                                flex flex-row justify-center items-center
                                hover:bg-blue-600 transition duration-200 ease-in-out'
                  to="/login">Login</Link>
              </span>

            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register