import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CheckboxGroupComponent from '../components/ui/CheckboxGroupComponent';

const UpdateCv = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [active, setIsActive] = useState(false);
  const [userId, setUserId] = useState('');

  const [selectedInfos, setSelectedInfos] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);

  useEffect(() => {
    const loadDataAll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/curriculum/curriculum_create/${id}/`);
        const data = response.data;

        const hobbiesResponse = await axios.get('http://localhost:8000/curriculum/hobby/');
        const skillsResponse = await axios.get('http://localhost:8000/curriculum/skills/');
        const languagesResponse = await axios.get('http://localhost:8000/curriculum/languages/');
        const formationsResponse = await axios.get('http://localhost:8000/curriculum/formations/');
        const experiencesResponse = await axios.get('http://localhost:8000/curriculum/experiences/');
        const infosResponse = await axios.get('http://localhost:8000/curriculum/info/');

        setTitle(data.title);
        setIsActive(data.active);
        setUserId(data.user);
        setAllHobbies(hobbiesResponse.data);
        setAlldInfos(infosResponse.data);
        setAllSkills(skillsResponse.data);
        setAllLanguages(languagesResponse.data);
        setAllFormations(formationsResponse.data);
        setAllExperiences(experiencesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du curriculum", error);
      }
    };

    loadDataAll();
  }, [id]);

  const [allHobbies, setAllHobbies] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allFormations, setAllFormations] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [allInfos, setAlldInfos] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

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

    axios.put(`http://localhost:8000/curriculum/curriculum_create/${id}/`, curriculumData)
      .then((response) => {
        alert('Curriculum mis à jour avec succès');
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert('Erreur lors de la mise à jour du curriculum');
      });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Modifier le curriculum</h2>
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
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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
            className='mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
          />
        </div>

        {/* Champ User ID */}
        <div className='mb-4'>
          <label htmlFor='userId' className='block text-sm font-medium text-gray-700'>ID de l'utilisateur</label>
          <input
            type='text'
            id='userId'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>

        {/* Champ Infos perso */}
        <CheckboxGroupComponent
          label="Infos"
          items={allInfos}
          selectedItems={selectedInfos}
          setSelectedItems={setSelectedInfos}
          itemLabelKey="lastname"
        />

        {/* Champ Hobbies */}
        <CheckboxGroupComponent
          label="Hobbies"
          items={allHobbies}
          selectedItems={selectedHobbies}
          setSelectedItems={setSelectedHobbies}
          itemLabelKey="title_hobby"
        />
        
        {/* Champ Compétences */}
        <CheckboxGroupComponent
          label="Compétences"
          items={allSkills}
          selectedItems={selectedSkills}
          setSelectedItems={setSelectedSkills}
          itemLabelKey="title_skill"
        />

        {/* Champ Langues */}
        <CheckboxGroupComponent
          label="Langues"
          items={allLanguages}
          selectedItems={selectedLanguages}
          setSelectedItems={setSelectedLanguages}
          itemLabelKey="title_language"
        />

        {/* Champ Formations */}
        <CheckboxGroupComponent
          label="Formations"
          items={allFormations}
          selectedItems={selectedFormations}
          setSelectedItems={setSelectedFormations}
          itemLabelKey="title_formation"
        />

        {/* Champ Expériences */} 
        <CheckboxGroupComponent
          label="Expériences"
          items={allExperiences}
          selectedItems={selectedExperiences}
          setSelectedItems={setSelectedExperiences}
          itemLabelKey="title_experience"
        />

        {/* Bouton de soumission */}
        <button type='submit' className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateCv;