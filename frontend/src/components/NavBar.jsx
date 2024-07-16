import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthContext"

function NavBar() {

  const { logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }
  return (
    <>
      <section className="flex flex-row justify-between items-center
        w-full h-auto px-2
        border-b-2 border-slate-950">
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-400 m-2 shadow-md rounded-md p-1 text-shadow '>CVGen</h1>
        <NavLink className="">
          <Link
            to='/'
            className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto
          hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
            Home
          </Link>

          <Link
            to='/dashboard'
            className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto
          hover:bg-blue-600 transition-colors duration-300 ease-in-out'>

            Dashboard
          </Link>

          <Link
            to='/create-cv'
            className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
            Created CV
          </Link>

          <Link
            className='bg-red-500 text-white p-2 rounded-md m-2 w-auto
          hover:bg-red-600 transition-colors duration-300 ease-in-out'
            onClick={handleLogout}>
            Logout
          </Link>
        </NavLink>
      </section>
    </>
  )
}

export default NavBar
