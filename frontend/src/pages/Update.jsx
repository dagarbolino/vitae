import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Section from '../components/ui/Section';

const Update = () => {
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {


    const fetchCvData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/curriculum/curriculum/${id}/`);
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du CV:", error);
      }
    };

    fetchCvData();
  }, [id]);

  // Fonction pour gérer le changement de sélection et naviguer
  const handleSelectChange = (event) => {
    const path = event.target.value;
    if (path) {
      navigate(path);
    }
  };

  return (
    <Section className="w-auto box-border m-0 p-0 flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <div className="flex w-full flex-col justify-center items-center m-4">
        <div className="flex flex-row-reverse ">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col h-36 my-20 mx-6">
            <h2 className="font-bold text-xl">Ajouter un élément</h2>
            <label htmlFor="option-select-add"></label>
            <select name="options" id="option-select-add" onChange={handleSelectChange}>
              <option value="">--Choisissez un élément--</option>
              
              <option value="/info/create">Une informations</option>
              <option value="/hobbie/create">Un hobbie</option>
              <option value="/skill/create">Une compétence</option>
              <option value="/language/create">Une langue</option>
              <option value="/formation/create">Une formation</option>
              <option value="/experience/create">Une expérience</option>
            </select>
            <h2 className="font-bold text-xl">Liste des éléments</h2>
            <label htmlFor="option-select-list"></label>
            <select name="options" id="option-select-list" onChange={handleSelectChange}>
              <option value="">--Choisissez un élément--</option>
            
              <option value="/infos/list">Liste des informations</option>
              <option value="/hobbies/list">Liste des hobbies</option>
              <option value="/skills/list">Liste des compétences</option>
              <option value="/languages/list">Liste des langues</option>
              <option value="/experiences/list">Liste des expériences</option>
              <option value="/formations/list">Liste des formations</option>
            </select>
          </div>

          {cvData ? (
            <ul className="flex flex-col space-y-4 w-full">
              <h1 className='text-3xl text-white'>Détail de votre curriculum vitae :
                <span className='mx-6 px-2  border-2 rounded-md'>{cvData.title}</span>
              </h1>
              <div className="flex flex-row gap-6 mt-6 max-w-[1024px] bg-slate-400 ">

                <div className="my-2 w-1/4 p-4">
                  {cvData.infos && cvData.infos.map((info, infoIndex) => (
                    <div className='flex flex-col w-full gap-2'>
                      <p className='text-2xl text-white'>{info.lastname}</p>
                      <p className='text-2xl text-white'>{info.firstname}</p>
                      <img
                        className='w-48 h-48 rounded-full object-cover'
                        src={info.photo}
                        alt={`${info.lastname} - ${info.firstname}`} />

                      <p className='text-lg text-white'>{info.type_of_contract}</p>

                      <div className="my-4 gap-2">
                        <h3 className='text-white text-xl font-bold mb-4'>Informations personelles</h3>
                        <p className='text-lg text-white'>Adresse : {info.address}</p>
                        <p className='text-lg text-white'>Ville : {info.city}</p>
                        <p className='text-lg text-white'>Code postal : {info.zipcode}</p>
                        <p className='text-lg text-white'>Pays : {info.state}</p>
                        <p className='text-lg text-white'>Téléphone : {info.phone}</p>
                        <p className='text-lg text-white'>Email : {info.email}</p>
                        <p className='text-lg text-white'>Née le : {info.date_of_birth}</p>
                        <p className='text-lg text-white'>à : {info.place_of_birth}</p>
                      </div>
                    </div>
                  ))}


                  <h3 className='text-xl font-semibold underline text-white w-full mt-6'>Hobbies :</h3>
                  {cvData.hobbies && cvData.hobbies.map((hobby, hobbyIndex) => (
                    <li className='list-inside list-disc text-lg my-2 text-white ' key={hobbyIndex}>
                      {hobby.title_hobby}
                    </li>
                  ))}


                  <h3 className='text-xl font-semibold underline text-white w-full'>Compétences :</h3>
                  {cvData.skills && cvData.skills.map((skill, skillIndex) => (
                    <li className='list-inside list-disc text-lg my-2 text-white ' key={skillIndex}>
                      {skill.title_skill}
                    </li>
                  ))}

                  <h3 className='text-xl font-semibold underline text-white w-full'>Langues :</h3>
                  {cvData.languages && cvData.languages.map((language, languageIndex) => (
                    <li className=' text-lg my-2 text-white ' key={languageIndex}>
                      <div className="">
                        <p>- {language.title_language}</p>
                        <p>Niveau : {language.niveau_language}</p>
                      </div>
                    </li>
                  ))}
                </div>

                <div className="w-full px-4">

                  <div className="border-2 rounded-md my-4  p-4">
                    {cvData.infos && cvData.infos.map((info, infoIndex) => (
                      <div className='flex flex-col w-full gap-2'>
                        <p className='text-lg text-white'>{info.motivation}</p>
                      </div>
                    ))}
                  </div>


                  <h3 className='text-xl font-semibold underline text-white w-full'>Formations :</h3>
                  {cvData.formations && cvData.formations.map((formation, formationIndex) => (
                    <li className='flex flex-col text-lg my-2 text-white border-s-4  ' key={formationIndex}>
                      <div className="flex flex-row justify-start items-center gap-2  ml-4">
                        <p>Titre :</p>
                        <p>{formation.title_formation} </p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2 ml-4">
                        <p>Entreprise :</p>
                        <p>{formation.business}</p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2 mb-2 ml-4">
                        <p>Status :</p>
                        <p className='text-black'>{formation.active ? "Actif" : "Inactif"}</p>
                      </div>
                    </li>
                  ))}

                  <h3 className='text-xl font-semibold underline text-white w-full'>Expériences :</h3>
                  {cvData.experiences && cvData.experiences.map((experience, experienceIndex) => (
                    <li className='flex flex-col text-lg my-2 text-white  border-s-4' key={experienceIndex}>
                      <div className="flex flex-row justify-start items-center gap-2 ml-4 ">
                        <p>Titre :</p>
                        <p>{experience.title_experience} </p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2 mb-2 ml-4">
                        <p>Entreprise :</p>
                        <p>{experience.business}</p>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </ul>

          ) : null}

        </div>

      </div>
    </Section>
  );
}

export default Update;