import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Section from '../components/ui/Section';

import ExperiencesCreateModale from '../components/modaleDetail/ExperiencesCreateModale';
import ExperiencesDelUpModale from '../components/modaleDetail/ExperiencesDelUpModale';
import FormationCreateModale from '../components/modaleDetail/FormationCreateModale';
import FormationDelUpModale from '../components/modaleDetail/FormationDelUpModale';
import HobbiesCreateModale from '../components/modaleDetail/HobbiesCreateModale';
import HobbiesDelUpModale from '../components/modaleDetail/HobbiesDelUpModale';
import InfoCreateModale from '../components/modaleDetail/InfoCreateModale';
import InfoDelUpModale from '../components/modaleDetail/InfoDelUpModale';
import CreateLanguage from '../components/modaleDetail/LanguageCreateModale';
import LangueDelUpModale from '../components/modaleDetail/LangueDelUpModale';
import SkillCreateModale from '../components/modaleDetail/SkillCreateModale';
import SkillDelUpModale from '../components/modaleDetail/SkillDelUpModale';
import UpdateCv from './UpdateCv';


const Detail = () => {
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const [info, setInfos] = useState([]);

  const handleAddInfo = (newInfo) => {
    setInfos([...info, newInfo]);
  };


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


  const handleUpdateCv = (updatedData) => {
    setCvData(updatedData);
  };


  return (
    <Section className="w-auto box-border m-0 p-0 flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">

      <div className="flex flex-row justify-center items-center my-6 text-sm md:text-lg">
        <Link
          to={`/pdf/${id}`}
          className='bg-blue-500 text-xs md:text-xl text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
          Download style 1
        </Link>

        <Link
          to={`/pdf2/${id}`}
          className='bg-blue-500 text-xs md:text-xl text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
          Download style 2
        </Link>

        <Link
          to={`/pdf3/${id}`}
          className='bg-blue-500 text-xs md:text-xl text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
          Download style 3
        </Link>
      </div>

      <div id="cvContent" className="flex w-full flex-col justify-center items-center m-4">
        <div className="flex flex-row ">
          {cvData ? (
            <ul className="flex flex-col space-y-4 w-full">


              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className='text-lg md:text-3xl text-white mt-10 '>Détail de votre curriculum vitae :
                </h1>

                {/*Ici, on modifie le cv */}
                <span className='mx-6 px-2 text-white text-xl md:text-4xl border-2 rounded-md'>{cvData.title}</span>
                <button className="mt-10 btn text-xl text-white hover:text-blue-700 transition duration-700 font-semibold m-4 hover:underline"
                  onClick={() => document.getElementById('my_modal_1').showModal()}>
                  Modifier le CV ici !
                </button>

                <dialog id="my_modal_1" className="w-96 h-auto p-4 rounded-md">
                  <div className="modal-box">
                    <div className="modal-action flex flex-row justify-end w-full">
                      <form method="dialog">
                        <button className="bg-red-600 p-2 rounded-md">Close</button>
                      </form>
                    </div>
                    <UpdateCv onUpdate={handleUpdateCv} />
                  </div>
                </dialog>
              </div>

              {/* Ici, on affiche les infos personnelles */}
              <div className="flex flex-row gap-6 mt-6 max-w-[1024px] bg-slate-400 ">
                <div className="my-2 w-1/4 p-2 md:p-4">
                  {cvData.infos && cvData.infos.map((info, infoIndex) => (

                    <div className='flex flex-col w-full gap-2'>

                      <div className="w-full flex flex-row justify-between items-center">
                        <button className="btn" onClick={() => document.getElementById('my_modal_info_1').showModal()}>
                          <h3 className='text-slate-600  flex flex-row justify-center items-center  text-[10px] md:text-xl mb-3 font-bold 
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                            Infos perso:
                          </h3>
                        </button>

                        <button className="btn " onClick={() => document.getElementById('my_modal_info_2').showModal()}>
                          <h3 className='text-slate-600 flex flex-row justify-center items-center text-sm mb-3 font-bold 
                    border-2 rounded-md p-2 w-2 h-2 md:w-8 md:h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                            +
                          </h3>
                        </button>
                      </div>

                      <dialog id="my_modal_info_1" className="w-[500px] h-auto p-4 rounded-md">
                        <div className="modal-box">
                          <div className="modal-action flex flex-row justify-end ">
                            <form method="dialog">
                              <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                            </form>
                          </div>
                        </div>
                        <InfoDelUpModale />
                      </dialog>

                      <dialog id="my_modal_info_2" className="w-[500px] h-auto p-4 rounded-md">
                        <div className="modal-box">
                          <div className="modal-action flex flex-row justify-end ">
                            <form method="dialog">
                              <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                            </form>
                          </div>
                          <InfoCreateModale onAddInfo={handleAddInfo} />
                        </div>
                      </dialog>

                      <p className='text-sm md:text-2xl text-white'>{info.lastname}</p>
                      <p className='text-sm md:text-2xl text-white'>{info.firstname}</p>
                      <img
                        className='w-16 h-16 md:w-48 md:h-48 rounded-full object-cover'
                        src={info.photo}
                        alt={`${info.lastname} - ${info.firstname}`} />

                      <p className=' text-[10px] md:text-lg text-white'>{info.type_of_contract}</p>

                      <div className="my-4 gap-2">
                        <p className=' text-[10px] md:text-lg text-white'>Adresse : {info.address}</p>
                        <p className=' text-[10px] md:text-lg text-white'>Ville : {info.city}</p>
                        <p className=' text-[10px] md:text-lg text-white'>Code postal : {info.zipcode}</p>
                        <p className=' text-[10px] md:text-lg text-white'>Pays : {info.state}</p>
                        <p className=' text-[10px] md:text-lg text-white'>Téléphone : {info.phone}</p>
                        <p className=' text-[10px] md:text-lg text-white'>Email : {info.email}</p>
                        <p className=' text-[10px] md:text-lg text-white'>Née le : {info.date_of_birth}</p>
                        <p className=' text-[10px] md:text-lg text-white'>à : {info.place_of_birth}</p>
                      </div>
                    </div>
                  ))}

                  {/* Ici, on affiche les hobbies */}
                  <div className="w-full  flex flex-row justify-between items-center">
                    <button className="btn " onClick={() => document.getElementById('my_modal_hobbi_1').showModal()}>
                      <h3 className='text-slate-600  flex flex-row justify-center items-center  text-[10px] md:text-xl mb-3 font-bold 
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                        Hobbies:
                      </h3>
                    </button>

                    <button className="btn " onClick={() => document.getElementById('my_modal_hobbi_2').showModal()}>
                      <h3 className='text-slate-600 flex flex-row justify-center items-center text-sm mb-3 font-bold 
                    border-2 rounded-md p-2 w-2 h-2 md:w-8 md:h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                        +
                      </h3>
                    </button>
                  </div>

                  <dialog id="my_modal_hobbi_1" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>
                    </div>
                    <HobbiesDelUpModale />

                  </dialog>

                  <dialog id="my_modal_hobbi_2" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>
                      <HobbiesCreateModale />
                    </div>
                  </dialog>

                  {cvData.hobbies && cvData.hobbies.map((hobby, hobbyIndex) => (
                    <li className='list-inside  text-[10px] md:text-lg my-2 text-white ' key={hobbyIndex}>
                      - {hobby.title_hobby}
                    </li>
                  ))}

                  {/* Ici, on affiche les compétences */}

                  <div className="w-full flex flex-row justify-between items-center">
                    <button className="btn" onClick={() => document.getElementById('my_modal_skill_1').showModal()}>
                      <h3 className='text-slate-600  flex flex-row justify-center items-center  text-[10px] md:text-xl mb-3 font-bold 
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                        Compétences:
                      </h3>
                    </button>

                    <button className="btn" onClick={() => document.getElementById('my_modal_skill_2').showModal()}>
                      <h3 className='text-slate-600 flex flex-row justify-center items-center text-sm mb-3 font-bold 
                    border-2 rounded-md p-2 w-2 h-2 md:w-8 md:h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                        +
                      </h3>
                    </button>
                  </div>

                  <dialog id="my_modal_skill_1" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">

                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>
                    </div>
                    <SkillDelUpModale />
                  </dialog>

                  <dialog id="my_modal_skill_2" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">

                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>
                      <SkillCreateModale />
                    </div>
                  </dialog>

                  {cvData.skills && cvData.skills.map((skill, skillIndex) => (
                    <li className='list-inside text-[10px] md:text-lg my-2 text-white ' key={skillIndex}>
                      - {skill.title_skill}
                    </li>
                  ))}

                  {/* Ici, on affiche les langues */}

                  <div className="w-full flex flex-row justify-between items-center">
                    <button className="btn" onClick={() => document.getElementById('my_modal_Langues_1').showModal()}>
                      <h3 className='text-slate-600  flex flex-row justify-center items-center  text-[10px] md:text-xl mb-3 font-bold 
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                        Langues:
                      </h3>
                    </button>

                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>
                      <h3 className='text-slate-600 flex flex-row justify-center items-center text-sm mb-3 font-bold 
                    border-2 rounded-md p-2 w-2 h-2 md:w-8 md:h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                        +
                      </h3>
                    </button>
                  </div>

                  <dialog id="my_modal_Langues_1" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>
                    </div>
                    <LangueDelUpModale />

                  </dialog>

                  <dialog id="my_modal_2" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>
                      <CreateLanguage />
                    </div>
                  </dialog>

                  {cvData.languages && cvData.languages.map((language, languageIndex) => (
                    <li className=' text-[10px] md:text-lg my-2 text-white ' key={languageIndex}>
                      <div className="">
                        <p>- {language.title_language}</p>
                        <p>Niveau: {language.niveau_language}</p>
                      </div>
                    </li>
                  ))}
                </div>
                {/* Ici, on affiche les motivations */}
                <div className="flex flex-col justify-start items-center w-3/4 h-full">
                  <div className="border-2 rounded-md md:my-4  md:p-4">
                    {cvData.infos && cvData.infos.map((info, infoIndex) => (
                      <div class=" border-2 border-slate-400 rounded-md  p-1 flex flex-col justify-start items-start w-full ">
                        <p className='md:px-2 md:my-2 text-[10px] md:text-lg text-white'>{info.motivation}</p>
                      </div>
                    ))}
                  </div>

                  {/* Ici, on affiche les formations */}
                  <div className=" my-4 flex flex-col  w-full">
                    <div className="w-auto mx-10 flex flex-row justify-between items-center">
                      <button className="btn" onClick={() => document.getElementById('my_modal_formations_1').showModal()}>
                        <h3 className='text-slate-600  flex flex-row justify-center items-center  text-[10px] md:text-xl mb-3 font-bold 
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                          Formations:
                        </h3>
                      </button>

                      <button className="btn" onClick={() => document.getElementById('my_modal_formations_2').showModal()}>
                        <h3 className='text-slate-600 flex flex-row justify-center items-center text-sm mb-3 font-bold 
                    border-2 rounded-md p-2 w-2 h-2 md:w-8 md:h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                          +
                        </h3>
                      </button>
                    </div>

                    <dialog id="my_modal_formations_1" className="w-[500px] h-auto p-4 rounded-md">
                      <div className="modal-box">
                        <div className="modal-action flex flex-row justify-end ">
                          <form method="dialog">
                            <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                          </form>
                        </div>
                      </div>
                      <FormationDelUpModale />
                    </dialog>

                    <dialog id="my_modal_formations_2" className="w-[500px] h-auto p-4 rounded-md">
                      <div className="modal-box">
                        <div className="modal-action flex flex-row justify-end ">
                          <form method="dialog">
                            <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                          </form>
                        </div>
                        <FormationCreateModale />
                      </div>
                    </dialog>

                    <div class='px-1 md:px-3'>
                      {cvData.formations && cvData.formations.map((formation, formationIndex) => (
                        <li className='flex flex-col text-lg my-2 text-white border-s-2 mb-6 pl-2 md:px-4' key={formationIndex}>

                          <div className="flex flex-row justify-start">
                            <p className='flex flex-col justify-start w-full text-xs md:text-lg  md:mb-4'>
                              <span>{formationIndex + 1} - {formation.title_formation} </span>
                            </p>
                          </div>

                          <div className="flex flex-row justify-start">
                            <div className="text-md w-auto flex flex-col justify-start items-start mt-1">
                              <p className='text-[8px] md:text-lg w-auto mr-3'>{formation.start_date_of_formation}</p>
                              <p className='text-[8px] md:text-lg w-auto mr-3'>{formation.end_date_of_formation}</p>
                            </div>

                            <div className="flex flex-row justify-start">
                              <div className="text-xs md:text-lg w-auto flex flex-col justify-start items-start">
                                <p className='text-[10px] md:text-xl'>{formation.description_formation}</p>
                                <p class=' w-auto text-[10px]  md:text-xl'>Entreprise: {formation.business} à {formation.location_formation}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>

                  {/* Ici, on affiche les expériences */}
                  <div className=" my-4 flex flex-col  w-full">
                    <div className="w-auto mx-10 flex flex-row justify-between items-center">
                      <button className="btn" onClick={() => document.getElementById('my_modal_expériences_1').showModal()}>
                        <h3 className='text-slate-600  flex flex-row justify-center items-center  text-[10px] md:text-xl mb-3 font-bold 
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                          Expérience:
                        </h3>
                      </button>

                      <button className="btn" onClick={() => document.getElementById('my_modal_expériences_2').showModal()}>
                        <h3 className='text-slate-600 flex flex-row justify-center items-center text-sm mb-3 font-bold 
                    border-2 rounded-md p-2 w-2 h-2 md:w-8 md:h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12'>
                          +
                        </h3>
                      </button>
                    </div>

                    <dialog id="my_modal_expériences_1" className="w-[500px] h-auto p-4 rounded-md">
                      <div className="modal-box">
                        <div className="modal-action flex flex-row justify-end ">
                          <form method="dialog">
                            <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                          </form>
                        </div>
                      </div>
                      <ExperiencesDelUpModale />
                    </dialog>

                    <dialog id="my_modal_expériences_2" className="w-[500px] h-auto p-4 rounded-md">
                      <div className="modal-box">

                        <div className="modal-action flex flex-row justify-end ">
                          <form method="dialog">
                            <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                          </form>
                        </div>
                        <ExperiencesCreateModale />
                      </div>
                    </dialog>

                    <div class='px-1 md:px-3'>

                      {cvData.experiences && cvData.experiences.map((experience, experienceIndex) => (
                        <li className='flex flex-col text-xs md:text-lg my-2 text-white border-s-2 mb-6 pl-2 md:px-4' key={experienceIndex}>

                          <div className="flex flex-row justify-start">
                            <p className='flex flex-col justify-start w-full text-xs md:text-xl  md:mb-4'>
                              <span>{experienceIndex + 1} - {experience.title_experience} </span>
                            </p>
                          </div>

                          <div className="flex flex-row justify-start">
                            <div className="text-md w-auto flex flex-col justify-start items-start mt-1">
                              <p className='text-[8px] md:text-lg w-auto mr-3'>{experience.start_date_of_experience}</p>
                              <p className='text-[8px] md:text-lg w-auto mr-3'>{experience.end_date_of_experience}</p>
                            </div>

                            <div className="flex flex-row justify-start">
                              <div className="text-md w-auto flex flex-col justify-start items-start">
                                <p className='text-[10px] md:text-xl'>{experience.description_experience}</p>
                                <p class=' w-auto text-[10px]] md:text-xl'>Entreprise: {experience.business} à {experience.location_experience}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ul>

          ) : null}

        </div>

      </div>
    </Section>
  );
}

export default Detail;