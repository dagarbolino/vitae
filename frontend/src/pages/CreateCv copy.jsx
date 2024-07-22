import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCv = () => {

  const [title, setTitle] = useState('');
  const [active, setActive] = useState(false);
  const [user, setUser] = useState('');
  const [infos, setInfos] = useState([]);
  const [selectedInfos, setSelectedInfos] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [formations, setFormations] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:8000/curriculum/curriculum/'),
          axios.get('http://localhost:8000/curriculum/info/'),
          axios.get('http://localhost:8000/curriculum/hobby/'),
          axios.get('http://localhost:8000/curriculum/skills/'),
          axios.get('http://localhost:8000/curriculum/experiences/'),
          axios.get('http://localhost:8000/curriculum/formations/'),
          axios.get('http://localhost:8000/curriculum/languages/')
        ]);

        setInfos(responses[1].data);
        setHobbies(responses[2].data);
        setSkills(responses[3].data);
        setExperiences(responses[4].data);
        setFormations(responses[5].data);
        setLanguages(responses[6].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
  }, []);

  const handleHobbyChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedHobbies(value);
  };

  const handleSkillChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedSkills(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assurez-vous que les champs sélectionnés sont bien des listes
    const formData = {
      curriculum: title.trim(), // Utilisez trim() pour enlever les espaces inutiles
      active: active,
      user: user,
      infos: Array.isArray(selectedInfos) ? selectedInfos : [selectedInfos],
      hobbies: Array.isArray(selectedHobbies) ? selectedHobbies : [selectedHobbies],
      skills: Array.isArray(selectedSkills) ? selectedSkills : [selectedSkills],
      experiences: Array.isArray(selectedExperiences) ? selectedExperiences : [selectedExperiences],
      formations: Array.isArray(selectedFormations) ? selectedFormations : [selectedFormations],
      languages: Array.isArray(selectedLanguages) ? selectedLanguages : [selectedLanguages],
    };
  
    if (!formData.curriculum || formData.curriculum === '') {
      alert('Le champ titre est obligatoire.');
      return;
    }
    
    axios.post('http://localhost:8000/curriculum/curriculum_create/', formData)
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
        <div className='mb-4'>
          <label htmlFor='title' className='block text-xl font-medium text-gray-700'>Titre du curriculum</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='user' className='block text-xl font-medium text-gray-700'>Utilisateur</label>
          <input
            type='text'
            id='user'
            placeholder='Email de l utilisateur'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'

            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='active' className='block text-xl font-medium text-gray-700'>Actif</label>
          <input
            type='checkbox'
            id='active'
            value={true}
            onChange={(e) => setActive(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>


        <div className='mb-4'>
          <label htmlFor='infos' className='block text-xl font-medium text-gray-700'>Infos</label>
          <select
            id='infos'
            value={selectedInfos}
            onChange={(e) => setSelectedInfos(e.target.value)}
            multiple
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            {infos.map(info => (
              <option key={info.id} value={info.id}>{info.lastname}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='hobbies' className='block text-xl font-medium text-gray-700'>Hobbies</label>
          <select
            id='hobbies'
            value={selectedHobbies}
            onChange={handleHobbyChange}
            multiple
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            {hobbies.map(hobby => (
              <option key={hobby.id} value={hobby.id}>{hobby.title_hobby}</option>
            ))}
          </select>
        </div>
        {/* Ajout du champ pour les compétences */}
        <div className='mb-4'>
          <label htmlFor='skills' className='block text-xl font-medium text-gray-700'>Compétences</label>
          <select
            id='skills'
            value={selectedSkills}
            onChange={handleSkillChange}
            multiple
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            {skills.map(skill => (
              <option key={skill.id} value={skill.id}>{skill.title_skill}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='experiences' className='block text-xl font-medium text-gray-700'>Experiences</label>
          <select
            id='experiences'
            value={selectedExperiences}
            onChange={(e) => setSelectedExperiences(e.target.value)}
            multiple
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            {experiences.map(experience => (
              <option key={experience.id} value={experience.id}>{experience.title_experience}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='formations' className='block text-xl font-medium text-gray-700'>Formations</label>
          <select
            id='formations'
            value={selectedFormations}
            onChange={(e) => setSelectedFormations(e.target.value)}
            multiple
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            {formations.map(formation => (
              <option key={formation.id} value={formation.id}>{formation.title_formation}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='languages' className='block text-xl font-medium text-gray-700'>Langues</label>
          <select
            id='languages'
            value={selectedLanguages}
            onChange={(e) => setSelectedLanguages(e.target.value)}
            multiple
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            {languages.map(language => (
              <option key={language.id} value={language.id}>{language.title_language}</option>
            ))}
          </select>
        </div>




        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Ajouter</button>
      </form>
    </div>
  );
};

export default CreateCv;