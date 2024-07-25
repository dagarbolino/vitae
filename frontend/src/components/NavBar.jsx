import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthContext"

function NavBar() {
  const { logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <section className="flex flex-col sm:flex-row justify-between items-center w-full md:px-2 bg-gradient-to-r from-blue-500 to-green-500">
        <h1 className='text-5xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-400 m-2 shadow-md rounded-md p-1 text-shadow'>
          CVGen
        </h1>
        <button className="sm:hidden bg-blue-500 text-white p-2 rounded-md m-2" onClick={toggleMenu}>
          Menu
        </button>
        <nav className={`flex-col sm:flex-row sm:flex w-full md:w-auto ${menuOpen ? 'flex' : 'hidden'} sm:items-center`}>
          <NavLink to='/' className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
            Home
          </NavLink>
          <NavLink to='/dashboard' className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
            Dashboard
          </NavLink>
          <NavLink to='/create-cv' className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
            Created CV
          </NavLink>
          <Link className='bg-red-500 text-white p-2 rounded-md mx-2 w-auto hover:bg-red-600 transition-colors duration-300 ease-in-out' onClick={handleLogout}>
            Logout
          </Link>
        </nav>
      </section>
    </>
  )
}

export default NavBar