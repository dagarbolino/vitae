import React from 'react'


import Section from '../components/ui/Section'
import CreateCV from '../service/CreateCv'
import FetchList from '../service/fetchList'

const Dashboard = () => {
  return (
    <Section className=" w-auto h-auto box-border m-0 p-0 flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">

      <div className="flex flex-col justify-center items-center ">
        <h1 className='my-10 text-3xl text-white'>Voici vos curriculum vitae</h1>
        <p className='text-lg text-white'>Vous pouvez les consulter, les modifier ou en créer un nouveau</p>

        <button className="mt-10 btn text-xl text-white hover:text-blue-700 transition duration-700 font-semibold m-4 hover:underline"
          onClick={() => document.getElementById('my_modal_1').showModal()}>
          Créez un CV ici !
        </button>

        <dialog id="my_modal_1"
          className=" w-96 h-auto p-4 rounded-md">
          <div className="modal-box">

            <div className="modal-action flex flex-row justify-end w-full">
              <form method="dialog">
                <button className="bg-red-600 p-2 rounded-md">Close</button>
              </form>
            </div>
            <CreateCV />
          </div>
        </dialog>



        
      </div>
      <div className="w-full flex flex-col justify-center items-center md:flex-row">
        <FetchList />
      </div>
    </Section>
  )
}

export default Dashboard