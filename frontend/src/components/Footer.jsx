import React from 'react'
import { Link } from 'react-router-dom'
import Section from './ui/Section'

const Footer = () => {
  return (
    <>
      <Section className=" border-slate-50 md:m-0 p-4 md:p-2 
        w-full  text-white bg-gradient-to-r from-blue-500 to-green-500  " >

        <div className='flex flex-col justify-end items-end w-full md:px-10'>
          <Link
            to='/'
            className='text-lg md:text-2xl  text-white hover:text-blue-500 transition duration-500 font-semibold hover:underline '>
            Home
          </Link>

          <Link
            to='#'
            className='text-lg md:text-2xl  text-white hover:text-blue-500 transition duration-500 font-semibold hover:underline '>
            Contact
          </Link>
          <Link
            to='#'
            className='text-lg md:text-2xl  text-white hover:text-blue-500 transition duration-500 font-semibold hover:underline '>
            About
          </Link>
        </div>


        <div className="flex flex-row items-end justify-start w-full">
          <p className='text-md md:text-xl mt-6'>Copyright © 2024 alexandre.Dincq</p>
        </div>
      </Section>
    </>
  )
}

export default Footer