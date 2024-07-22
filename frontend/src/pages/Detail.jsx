import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
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



const Detail = () => {
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


  const handleSelectChange = (event) => {
    const path = event.target.value;
    if (path) {
      navigate(path);
    }
  };


  return (
    <Section className="w-auto box-border m-0 p-0 flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <div className="flex flex-row justify-center items-center my-6">
        <Link
          to={`/pdf/${id}`}
          className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
          Download style 1
        </Link>

        <Link
          to={`/pdf2/${id}`}
          className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
          Download style 2
        </Link>

        <Link
          to={`/pdf3/${id}`}
          className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
          Download style 3
        </Link>
      </div>

      <div id="cvContent" className="flex w-full flex-col justify-center items-center m-4">
        <div className="flex flex-row-reverse ">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col h-44 my-20 mx-6">
            <h2 className="font-bold text-xl">Créer un élément</h2>
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
            <h2 className="font-bold text-xl">Modifier Supprimer des éléments</h2>
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

                <Link to={`/update/${id}`}
                  className='bg-blue-500 text-white p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
                  <span className='mx-6 px-2  border-2 rounded-md'>{cvData.title} - update</span>
                </Link>

              </h1>
              <div className="flex flex-row gap-6 mt-6 max-w-[1024px] bg-slate-400 ">

                <div className="my-2 w-1/4 p-4">
                  {cvData.infos && cvData.infos.map((info, infoIndex) => (

                    <div className='flex flex-col w-full gap-2'>

                      <div className="w-full flex flex-row justify-between items-center">
                        <button className="btn" onClick={() => document.getElementById('my_modal_info_1').showModal()}>
                          <h3 className='text-slate-600 w-full flex flex-row justify-center items-center text-xl mb-3 font-bold underline
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                            Infos perso :
                          </h3>
                        </button>

                        <button className="btn " onClick={() => document.getElementById('my_modal_info_2').showModal()}>
                          <h3 className='text-slate-600 flex flex-row justify-center items-center text-xl mb-3 font-bold 
                    border-2 rounded-md p-2 w-8 h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                            +
                          </h3>
                        </button>
                      </div>

                      <dialog id="my_modal_info_1" className="w-[500px] h-auto p-4 rounded-md">
                        <div className="modal-box">
                          <Link to={`/info/list/${info.id}`}>
                            <h3 className='text-xl font-semibold underline text-white w-full'>info :</h3>
                          </Link>

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
                          <Link to={`/info/list/${cvData.id}`}>
                            <h3 className='text-xl font-semibold underline text-white w-full'>Créer des infos personelles :</h3>
                          </Link>
                          <div className="modal-action flex flex-row justify-end ">
                            <form method="dialog">
                              <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                            </form>
                          </div>

                          <InfoCreateModale />

                        </div>
                      </dialog>











                      <p className='text-2xl text-white'>{info.lastname}</p>
                      <p className='text-2xl text-white'>{info.firstname}</p>
                      <img
                        className='w-48 h-48 rounded-full object-cover'
                        src={info.photo}
                        alt={`${info.lastname} - ${info.firstname}`} />

                      <p className='text-lg text-white'>{info.type_of_contract}</p>

                      <div className="my-4 gap-2">

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





                  <div className="w-full flex flex-row justify-between items-center">
                    <button className="btn" onClick={() => document.getElementById('my_modal_hobbi_1').showModal()}>
                      <h3 className='text-slate-600 w-full flex flex-row justify-center items-center text-xl mb-3 font-bold underline
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                        Hobbies :
                      </h3>
                    </button>

                    <button className="btn" onClick={() => document.getElementById('my_modal_hobbi_2').showModal()}>
                      <h3 className='text-slate-600 flex flex-row justify-center items-center text-xl mb-3 font-bold 
                    border-2 rounded-md p-2 w-8 h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                        +
                      </h3>
                    </button>
                  </div>

                  <dialog id="my_modal_hobbi_1" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <Link to={`/hobbies/list/${cvData.id}`}>
                        <h3 className='text-xl font-semibold underline text-white w-full'>Hobbies :</h3>
                      </Link>

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
                      <Link to={`/hobbies/list/${cvData.id}`}>
                        <h3 className='text-xl font-semibold underline text-white w-full'>Créer un Hobbies :</h3>
                      </Link>
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>

                      <HobbiesCreateModale />

                    </div>
                  </dialog>


                  {cvData.hobbies && cvData.hobbies.map((hobby, hobbyIndex) => (
                    <li className='list-inside  text-lg my-2 text-white ' key={hobbyIndex}>
                      - {hobby.title_hobby}
                    </li>
                  ))}




                  <div className="w-full flex flex-row justify-between items-center">
                    <button className="btn" onClick={() => document.getElementById('my_modal_skill_1').showModal()}>
                      <h3 className='text-slate-600 w-full flex flex-row justify-center items-center text-xl mb-3 font-bold underline
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                        Compétences :
                      </h3>
                    </button>

                    <button className="btn" onClick={() => document.getElementById('my_modal_skill_2').showModal()}>
                      <h3 className='text-slate-600 flex flex-row justify-center items-center text-xl mb-3 font-bold 
                    border-2 rounded-md p-2 w-8 h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                        +
                      </h3>
                    </button>
                  </div>

                  <dialog id="my_modal_skill_1" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <Link to={`/skills/list/${cvData.id}`}>
                        <h3 className='text-xl font-semibold underline text-white w-full'>Compétences :</h3>
                      </Link>

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
                      <Link to={`/skills/list/${cvData.id}`}>
                        <h3 className='text-xl font-semibold underline text-white w-full'>Créer une compétence :</h3>
                      </Link>
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>

                      <SkillCreateModale />

                    </div>
                  </dialog>

                  {cvData.skills && cvData.skills.map((skill, skillIndex) => (
                    <li className='list-inside text-lg my-2 text-white ' key={skillIndex}>
                      - {skill.title_skill}
                    </li>
                  ))}


                  <div className="w-full flex flex-row justify-between items-center">
                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>
                      <h3 className='text-slate-600 w-full flex flex-row justify-center items-center text-xl mb-3 font-bold underline
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                        Langues:
                      </h3>
                    </button>

                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>
                      <h3 className='text-slate-600 flex flex-row justify-center items-center text-xl mb-3 font-bold 
                    border-2 rounded-md p-2 w-8 h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                        +
                      </h3>
                    </button>
                  </div>

                  <dialog id="my_modal_1" className="w-[500px] h-auto p-4 rounded-md">
                    <div className="modal-box">
                      <Link to={`/languages/list/${cvData.id}`}>
                        <h3 className='text-xl font-semibold underline text-white w-full'>Langues :</h3>
                      </Link>

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
                      <Link to={`/languages/list/${cvData.id}`}>
                        <h3 className='text-xl font-semibold underline text-white w-full'>Créer une langues :</h3>
                      </Link>
                      <div className="modal-action flex flex-row justify-end ">
                        <form method="dialog">
                          <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                        </form>
                      </div>

                      <CreateLanguage />

                    </div>
                  </dialog>



                  {cvData.languages && cvData.languages.map((language, languageIndex) => (
                    <li className=' text-lg my-2 text-white ' key={languageIndex}>
                      <div className="">
                        <p>- {language.title_language}</p>
                        <p>Niveau : {language.niveau_language}</p>
                      </div>
                    </li>
                  ))}
                </div>


                <div className="flex flex-col justify-start items-center w-3/4 h-full">

                  <div className="border-2 rounded-md my-4  p-4">
                    {cvData.infos && cvData.infos.map((info, infoIndex) => (
                      <div class=" border-2 border-slate-400 rounded-md  p-1 flex flex-col justify-start items-start w-full ">
                        <p className='px-2 my-2 text-md text-white'>{info.motivation}</p>
                      </div>
                    ))}
                  </div>

                  <div className=" my-4 flex flex-col  w-full">






                    <div className="w-auto mx-10 flex flex-row justify-between items-center">
                      <button className="btn" onClick={() => document.getElementById('my_modal_formations_1').showModal()}>
                        <h3 className='text-slate-600 w-full flex flex-row justify-center items-center text-xl mb-3 font-bold underline
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                          Formations:
                        </h3>
                      </button>

                      <button className="btn" onClick={() => document.getElementById('my_modal_formations_2').showModal()}>
                        <h3 className='text-slate-600 flex flex-row justify-center items-center text-xl mb-3 font-bold 
                    border-2 rounded-md p-2 w-8 h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                          +
                        </h3>
                      </button>
                    </div>

                    <dialog id="my_modal_formations_1" className="w-[500px] h-auto p-4 rounded-md">
                      <div className="modal-box">
                        <Link to={`/formations/list/${cvData.id}`}>
                          <h3 className='text-xl font-semibold underline text-white w-full'>Formations :</h3>
                        </Link>

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
                        <Link to={`/formations/list/${cvData.id}`}>
                          <h3 className='text-xl font-semibold underline text-white w-full'>Créer une Formations :</h3>
                        </Link>
                        <div className="modal-action flex flex-row justify-end ">
                          <form method="dialog">
                            <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                          </form>
                        </div>

                        <FormationCreateModale />

                      </div>
                    </dialog>





                    <div class='px-3'>

                      {cvData.formations && cvData.formations.map((formation, formationIndex) => (
                        <li className='flex flex-col text-lg my-2 text-white border-s-2 mb-6 px-4' key={formationIndex}>

                          <div className="flex flex-row justify-start">
                            <p className='flex flex-col justify-start w-full text-lg  mb-4'>
                              <span>{formationIndex + 1} - {formation.title_formation} </span>
                            </p>
                          </div>

                          <div className="flex flex-row justify-start">
                            <div className="text-md w-auto flex flex-col justify-start items-start mt-1">
                              <p className='text-sm w-auto mr-3'>{formation.start_date_of_formation}</p>
                              <p className='text-sm w-auto mr-3'>{formation.end_date_of_formation}</p>
                            </div>

                            <div className="flex flex-row justify-start">
                              <div className="text-md w-auto flex flex-col justify-start items-start">
                                <p>{formation.description_formation}</p>
                                <p class=' w-auto '>Entreprise: {formation.business} à {formation.location_formation}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>


                  <div className=" my-4 flex flex-col  w-full">


                    <div className="w-auto mx-10 flex flex-row justify-between items-center">
                      <button className="btn" onClick={() => document.getElementById('my_modal_expériences_1').showModal()}>
                        <h3 className='text-slate-600 w-full flex flex-row justify-center items-center text-xl mb-3 font-bold underline
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                          Expérience:
                        </h3>
                      </button>

                      <button className="btn" onClick={() => document.getElementById('my_modal_expériences_2').showModal()}>
                        <h3 className='text-slate-600 flex flex-row justify-center items-center text-xl mb-3 font-bold 
                    border-2 rounded-md p-2 w-8 h-8
                    hover:text-blue-800 transition duration-500 hover:scale-110 transform hover:rotate-12
                    '>
                          +
                        </h3>
                      </button>
                    </div>

                    <dialog id="my_modal_expériences_1" className="w-[500px] h-auto p-4 rounded-md">
                      <div className="modal-box">
                        <Link to={`/expériences/list/${cvData.id}`}>
                          <h3 className='text-xl font-semibold underline text-white w-full'>Expérience :</h3>
                        </Link>

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
                        <Link to={`/expériences/list/${cvData.id}`}>
                          <h3 className='text-xl font-semibold underline text-white w-full'>Créer une expérience :</h3>
                        </Link>
                        <div className="modal-action flex flex-row justify-end ">
                          <form method="dialog">
                            <button className="bg-red-600 p-2 rounded-md w-full flex justify-center items-center">Close</button>
                          </form>
                        </div>

                        <ExperiencesCreateModale />

                      </div>
                    </dialog>




                    <div class='px-3'>

                      {cvData.experiences && cvData.experiences.map((experience, experienceIndex) => (
                        <li className='flex flex-col text-lg my-2 text-white border-s-2 mb-6 px-4' key={experienceIndex}>

                          <div className="flex flex-row justify-start">
                            <p className='flex flex-col justify-start w-full text-lg  mb-4'>
                              <span>{experienceIndex + 1} - {experience.title_experience} </span>
                            </p>
                          </div>

                          <div className="flex flex-row justify-start">
                            <div className="text-md w-auto flex flex-col justify-start items-start mt-1">
                              <p className='text-sm w-auto mr-3'>{experience.start_date_of_experience}</p>
                              <p className='text-sm w-auto mr-3'>{experience.end_date_of_experience}</p>
                            </div>

                            <div className="flex flex-row justify-start">
                              <div className="text-md w-auto flex flex-col justify-start items-start">
                                <p>{experience.description_experience}</p>
                                <p class=' w-auto '>Entreprise: {experience.business} à {experience.location_experience}</p>
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