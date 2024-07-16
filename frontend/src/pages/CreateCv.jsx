import React from 'react'
import NavBar from '../components/NavBar'
import Section from '../components/ui/Section'

const CreateCv = () => {
  return (
    <>
      <Section className="w-auto box-border m-0 p-0 flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">

        <NavBar />


        <div className="flex w-full flex-col justify-center items-center m-4 my-6">
          <h1 className='lg:text-4xl text-white my-6'>Create cv</h1>
          <div className="flex flex-row justify-center items-center w-full">



            <div className="flex flex-row gap-6 mt-6 max-w-[1024px] bg-slate-400">


              <div className="my-2 w-1/4 p-4 flex flex-col ">
                <p>tttttttttttttt</p>

              </div>

              <div className="w-full px-4">
                <p>tttttttttttttt</p>

              </div>

            </div>





            <div className="flex flex-row ">
              <div class="bg-gray-100 p-4 rounded-lg flex flex-col h-36 my-12 mx-6">
                <h2 class="font-bold text-xl">Ajouter un élément</h2>
                <label for="option-select"></label>
                <select name="options" id="option-select" onchange="location = this.value;">
                  <option value="">--Choisissez un élément--</option>
                  <option value="{% url 'pages:hobbie_create' %}">Un hobbie</option>
                  <option value="{% url 'pages:skill_create' %}">Une compétence</option>
                  <option value="{% url 'pages:language_create' %}">Une langue</option>
                  <option value="{% url 'pages:formation_create' %}">Une formation</option>
                  <option value="{% url 'pages:experience_create' %}">Une expérience</option>
                </select>
                <h2 class="font-bold text-xl">Liste des éléments</h2>
                <label for="option-select"></label>
                <select name="options" id="option-select" onchange="location = this.value;">
                  <option value="">--Choisissez une liste d'élément--</option>
                  <option value="{% url 'pages:hobbie_list' %}">Liste des hobbies</option>
                  <option value="{% url 'pages:skill_list' %}">Liste des skills</option>
                  <option value="{% url 'pages:language_list' %}">Liste des langues</option>
                  <option value="{% url 'pages:experience_list' %}">Liste des expériences</option>
                  <option value="{% url 'pages:formation_list' %}">Liste des formations</option>
                </select>
              </div>

            </div>

          </div>
        </div>

      </Section>
    </>
  )
}

export default CreateCv
