import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateLangue = () => {
  const [titleLanguage, setTitleLanguage] = useState('');
  const [niveauLanguage, setNiveauLanguage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [curriculumId, setCurriculumId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/curriculum/languages/', {
      title_language: titleLanguage,
      niveau_language: niveauLanguage,
      active: isActive,
      curriculum: curriculumId,
    })
    .then((response) => {
      console.log(response);
      alert('Langue et son niveau ajouté avec succès');
      navigate(-1); 
    })
    .catch((error) => {
      console.error(error);
      alert('Erreur lors de l\'ajout de la langue et son niveau');
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter une Langue et son niveau</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='titleLanguage' className='block text-sm font-medium text-gray-700'>Titre de la langue</label>
          <input
            type='text'
            id='titleLanguage'
            value={titleLanguage}
            onChange={(e) => setTitleLanguage(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='niveauLanguage' className='block text-sm font-medium text-gray-700'>Niveau de la langue</label>
          <select
            id='niveauLanguage'
            value={niveauLanguage}
            onChange={(e) => setNiveauLanguage(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            <option value=''>Sélectionnez un niveau</option>
            <option value='Débutant'>Débutant</option>
            <option value='Intermédiaire'>Intermédiaire</option>
            <option value='Avancé'>Avancé</option>
          </select>
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

export default CreateLangue;