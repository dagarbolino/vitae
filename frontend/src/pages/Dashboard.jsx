import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Section from '../components/ui/Section' 
import FetchList from '../utils/fetchList'

const Dashboard = () => {
  return (
    <Section className="w-auto h-full box-border m-0 p-0 flex flex-col justify-start items-centermin-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <div className="flex flex-col justify-center items-center m-6 ">
        <h1 className='text-3xl text-white'>Voici vos curriculum vitae</h1>
        <p className='text-lg text-white'>Vous pouvez les consulter, les modifier ou en créer un nouveau</p>
        <Link
            to='/create-cv'
            className='text-xl text-white hover:text-blue-700 transition duration-700 font-semibold m-4 hover:underline '>
            Create a CV here !
          </Link>
      </div>

      <FetchList />

    </Section>
  )
}

export default Dashboard