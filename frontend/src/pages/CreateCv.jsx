import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCv = () => {
  const [title, setTitle] = useState('');
  const [active, setIsActive] = useState(false);
  const [userId, setUserId] = useState('');

  const [infos, setInfos] = useState([]);
  const [selectedInfos, setSelectedInfos] = useState([]);

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [formations, setFormations] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState([]);

  const [experiences, setExperiences] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    axios.get('http://localhost:8000/curriculum/info/')
      .then((response) => {
        setInfos(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });


    axios.get('http://localhost:8000/curriculum/hobby/')
      .then((response) => {
        setHobbies(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });

    axios.get('http://localhost:8000/curriculum/skills/')
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });

    axios.get('http://localhost:8000/curriculum/languages/')
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });

    axios.get('http://localhost:8000/curriculum/formations/')
      .then((response) => {
        setFormations(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });

    axios.get('http://localhost:8000/curriculum/experiences/')
      .then((response) => {
        setExperiences(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });



  }, []);

  const handleInfoChange = (infoId) => {
    const newSelectedInfos = selectedInfos.includes(infoId)
      ? selectedInfos.filter(id => id !== infoId)
      : [...selectedInfos, infoId];
    setSelectedInfos(newSelectedInfos);
  };

  const handleHobbyChange = (hobbyId) => {
    const newSelectedHobbies = selectedHobbies.includes(hobbyId)
      ? selectedHobbies.filter(id => id !== hobbyId)
      : [...selectedHobbies, hobbyId];
    setSelectedHobbies(newSelectedHobbies);
  };

  const handleSkillChange = (skillId) => {
    const newSelectedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter(id => id !== skillId)
      : [...selectedSkills, skillId];
    setSelectedSkills(newSelectedSkills);
  };

  const handleLanguageChange = (languageId) => {
    const newSelectedLanguages = selectedLanguages.includes(languageId)
      ? selectedLanguages.filter(id => id !== languageId)
      : [...selectedLanguages, languageId];
    setSelectedLanguages(newSelectedLanguages);
  };

  const handleFormationChange = (formationId) => {
    const newSelectedFormations = selectedFormations.includes(formationId)
      ? selectedFormations.filter(id => id !== formationId)
      : [...selectedFormations, formationId];
    setSelectedFormations(newSelectedFormations);
  };

  const handleExperienceChange = (experienceId) => {
    const newSelectedExperiences = selectedExperiences.includes(experienceId)
      ? selectedExperiences.filter(id => id !== experienceId)
      : [...selectedExperiences, experienceId];
    setSelectedExperiences(newSelectedExperiences);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      alert('Erreur : L\'identifiant de l\'utilisateur est manquant.');
      return;
    }

    const apiUrl = 'http://localhost:8000/curriculum/curriculum_create/';
    const curriculumData = {
      title,
      active,
      user: userId,
      infos: selectedInfos,
      skills: selectedSkills,
      hobbies: selectedHobbies,
      languages: selectedLanguages,
      formations: selectedFormations,
      experiences: selectedExperiences,
    };

    axios.post(apiUrl, curriculumData)
      .then((response) => {
        console.log(response);
        alert('Curriculum ajouté avec succès');
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert('Erreur lors de l\'ajout du curriculum');
      });
  };


  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter un curriculum</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <div className='mb-4'>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Titre du curriculum</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border-2 border-gray-300 rounded-md'
          />
        </div>

        {/* Champ Actif */}
        <div className='mb-4'>
          <label htmlFor='active' className='block text-sm font-medium text-gray-700'>Actif</label>
          <input
            type='checkbox'
            id='active'
            checked={active}
            onChange={(e) => setIsActive(e.target.checked)}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='userId' className='block text-sm font-medium text-gray-700'>Identifiant de l'utilisateur</label>
          <input
            type='number' // Type correct pour un identifiant numérique
            id='userId'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 rounded-md border-gray-300 rounded-md'
          />
        </div>

        {/* Liste des informations */}
        <div className='mb-4'>
          <fieldset>
            <legend className='text-lg font-semibold'>Informations</legend>
            {infos.map(info => (
              <div 
              className='flex flex-row justify-start items-center gap-2'
              key={info.id}>
                <input
                  type="checkbox"
                  id={`info-${info.id}`}
                  checked={selectedInfos.includes(info.id)}
                  onChange={() => handleInfoChange(info.id)}
                />
                <label htmlFor={`info-${info.id}`}>{info.lastname}</label>
              </div>
            ))}
          </fieldset>
        </div>

        {/* Liste des hobbies */}

        <div className='mb-4'>
          <fieldset>
            <legend className='text-lg font-semibold'>Loisirs</legend>
            {hobbies.map(hobby => (
              <div 
              className='flex flex-row justify-start items-center gap-2'
              key={hobby.id}>
                <input
                  type="checkbox"
                  id={`hobby-${hobby.id}`}
                  checked={selectedHobbies.includes(hobby.id)}
                  onChange={() => handleHobbyChange(hobby.id)}
                />
                <label htmlFor={`hobby-${hobby.id}`}>{hobby.title_hobby}</label>
              </div>
            ))}
          </fieldset>
        </div>


        <div className='mb-4'>
          <fieldset>
            <legend className='text-lg font-semibold'>Compétences</legend>
            {skills.map(skill => (
              <div 
              className='flex flex-row justify-start items-center gap-2'
              key={skill.id}>
                <input
                  type="checkbox"
                  id={`skill-${skill.id}`}
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => handleSkillChange(skill.id)}
                />
                <label htmlFor={`skill-${skill.id}`}>{skill.title_skill}</label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className='mb-4'>
          <fieldset>
            <legend className='text-lg font-semibold'>Langues</legend>
            {languages.map(language => (
              <div 
              className='flex flex-row justify-start items-center gap-2'
              key={language.id}>
                <input
                  type="checkbox"
                  id={`language-${language.id}`}
                  checked={selectedLanguages.includes(language.id)}
                  onChange={() => handleLanguageChange(language.id)}
                />
                <label htmlFor={`language-${language.id}`}>{language.title_language}</label>
              </div>
            ))}
          </fieldset>
        </div>


        <div className='mb-4'>
          <fieldset>
            <legend className='text-lg font-semibold'>Formations</legend>
            {formations.map(formation => (
              <div
              className='flex flex-row justify-start items-center gap-2'
              key={formation.id}>
                <input
                  type="checkbox"
                  id={`formation-${formation.id}`}
                  checked={selectedFormations.includes(formation.id)}
                  onChange={() => handleFormationChange(formation.id)}
                />
                <label htmlFor={`formation-${formation.id}`}>{formation.title_formation}</label>
              </div>
            ))}
          </fieldset>
        </div>


        <div className='mb-4'>
          <fieldset>
            <legend className='text-lg font-semibold'>Expériences</legend>
            {experiences.map(experience => (
              <div 
              className='flex flex-row justify-start items-center gap-2'
              key={experience.id}>
                <input
                  type="checkbox"
                  id={`experience-${experience.id}`}
                  checked={selectedExperiences.includes(experience.id)}
                  onChange={() => handleExperienceChange(experience.id)}
                />
                <label htmlFor={`experience-${experience.id}`}>{experience.title_experience}</label>
              </div>
            ))}
          </fieldset>
        </div>





        {/* Bouton de soumission */}
        <button type='submit' className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default CreateCv;