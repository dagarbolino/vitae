import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const CreateSkills = () => {
  const [titleSkill, setTitleSkill] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [curriculumId, setCurriculumId] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/curriculum/skills/', {
      title_skill: titleSkill,
      active: isActive,
      curriculum: curriculumId,
    })
    .then((response) => {
      console.log(response);
      alert('Skill ajouté avec succès');
      navigate(-1); 
    })
    .catch((error) => {
      console.error(error);
      alert('Erreur lors de l\'ajout de la compétence');
    });
  };


  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter une compétance</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='titleSkill' className='block text-sm font-medium text-gray-700'>Titre de la compétence</label>
          <input
            type='text'
            id='titleSkill'
            value={titleSkill}
            onChange={(e) => setTitleSkill(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='isActive' className='block text-sm font-medium text-gray-700'>Actif</label>
          <input
            type='checkbox'
            id='isActive'
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className='mt-1'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='curriculumId' className='block text-sm font-medium text-gray-700'>ID du Curriculum</label>
          <input
            type='text'
            id='curriculumId'
            value={curriculumId}
            onChange={(e) => setCurriculumId(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Ajouter</button>
      </form>
    </div>
  );
};

export default CreateSkills;