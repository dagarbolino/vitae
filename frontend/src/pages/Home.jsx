import { jwtDecode } from 'jwt-decode'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext"

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (user) {
    const decoded = jwtDecode(token)
    let user_id = decoded.user_id
    console.log(user_id)
  }

  return (
    <div className="lg:h-screen w-auto flex 
    flex-row justify-center items-center h-screen  items-centermin-h-screen bg-gradient-to-r from-blue-500 to-green-500">

      <div className="border-2 w-96 lg:w-96 h-auto
    flex flex-col justify-start items-center rounded-2xl border-sky-800 bg-white shadow-2xl p-4 mt-6">

        <div className='w-full flex flex-col justify-start items-start '>

          <h1 className=' text-3xl font-semibold flex flex-row justify-center items-center w-full h-10'>
            Welcome !
          </h1>
          <p className=' text-3xl  font-semibold flex flex-row justify-center items-center w-full h-10 mb-10'>
            on the Vitae website !!
          </p>
          {user ?
            <>
              <span className='text-xl  md:text-2xl w-full h-auto mb-8
              flex flex-row justify-center items-center text-emerald-600 font-semibold '>
                You are logged in
              </span>
              <br />
              <br />
              <Link
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md
                              flex flex-row justify-center items-center
                              hover:bg-blue-600 transition duration-200 ease-in-out'
                to="/dashboard">
                Dashboard
              </Link>

              <br />
              <Link
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md flex flex-row justify-center items-center hover:bg-blue-600 transition duration-200 ease-in-out'
                onClick={logoutUser}>Logout</Link>

              <Link
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md flex flex-row justify-center items-center hover:bg-blue-600 transition duration-200 ease-in-out'
                to="/info">
                Info
              </Link>
            </>
            :
            <>
              <span className='text-4xl mb-16'>
                You are not logged in
              </span>
              <br />
              <br />
              <Link
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md flex flex-row justify-center items-center hover:bg-blue-600 transition duration-200 ease-in-out'
                to="/login">
                Login
              </Link>
              <br />
              <Link
                className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md flex flex-row justify-center items-center hover:bg-blue-600 transition duration-200 ease-in-out'
                to="/register">
                Register
              </Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home