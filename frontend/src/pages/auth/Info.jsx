import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import useAxios from "../../utils/useAxios"


const Info = () => {
  const [response, setResponse] = useState("")
  const api = useAxios();
  const token = localStorage.getItem("authTokens")
  const { logoutUser } = useContext(AuthContext)


  const decode = jwtDecode(token)
  // console.log(decode)
  let user_id = decode.user_id
  let username = decode.username
  let email = decode.email



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/")
        setResponse(response.data.response)

      } catch (error) {
        console.log(error)
        setResponse("Quelque chose s'est mal passé")
      }
    }

    fetchData()

  }, [api])


  return (
    <>
      <div className="md:h-screen w-auto flex py-4
      flex-row justify-center items-center
      items-centermin-h-screen bg-gradient-to-r from-blue-500 to-green-500">
        <div className="border-2 w-96 h-auto
      flex flex-col justify-start items-center
      rounded-2xl border-sky-800 bg-white shadow-2xl p-4">

          <div className='w-full
    flex flex-col justify-start items-start  
    '>
            <h1 className='text-3xl font-bold
      flex flex-row justify-center items-center
      w-full h-10 mb-6'>
              Vos information
            </h1>
            <p className='text-xl font-semibold m-2'>Welcome, {username}</p>
            <span className='text-lg m-2'>Your credentials are as follows:</span>
            <br />
            <span className='text-lg mx-4'>Username: {username}</span>
            <br />
            <span className='text-lg mx-4'>UserID: {user_id}</span>
            <br />
            <span className='text-lg mx-4'>Email: {email}</span>
            <br /><br />
            <span className='text-lg font-semibold my-6
      flex flex-row justify-center items-center
      w-full h-auto
      '>{response}</span>
            <br /><br />
            <Link
              className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md
              flex flex-row justify-center items-center
              hover:bg-blue-600 transition duration-200 ease-in-out'

              to="/">Home</Link>
            <br />
            <Link
              className='w-full bg-blue-800 text-white mb-2 p-2 rounded-md
              flex flex-row justify-center items-center
              hover:bg-blue-600 transition duration-200 ease-in-out'
              onClick={logoutUser}>Logout</Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default Info