import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExperiencesCreateModale = () => {
  const [titleExperience, setTitleExperience] = useState('');
  const [descriptionExperience, setDescriptionExperience] = useState('');
  const [business, setBusiness] = useState('');
  const [startDateOfExperience, setStartDateOfExperience] = useState('');
  const [endDateOfExperience, setEndDateOfExperience] = useState('');
  const [locationExperience, setLocationExperience] = useState('');
  const [curriculumId, setCurriculumId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/curriculum/experiences/', {
      title_experience: titleExperience,
      description_experience: descriptionExperience,
      business: business,
      start_date_of_experience: startDateOfExperience,
      end_date_of_experience: endDateOfExperience,
      location_experience: locationExperience,
      curriculum: curriculumId,
    })
    .then((response) => {
      console.log(response);
      alert('Experience ajoutée avec succès');
      navigate(-1);
    })
    .catch((error) => {
      console.error(error);
      alert('Erreur lors de l\'ajout de la Experience');
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter une Expérience</h2>
      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire ici */}
        <div className='mb-4'>
          <label htmlFor='titleExperience' className='block text-sm font-medium text-gray-700'>Titre de l'experience</label>
          <input
            type='text'
            id='titleExperience'
            value={titleExperience}
            onChange={(e) => setTitleExperience(e.target.value)}
            className='mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='descriptionExperience' className='block text-sm font-medium text-gray-700'>Description de l'experience</label>
          <textarea
            id='descriptionExperience'
            value={descriptionExperience}
            onChange={(e) => setDescriptionExperience(e.target.value)}
            className='mt-1 block w-full rounded-md border-2  border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='business' className='block text-sm font-medium text-gray-700'>Entreprise</label>
          <input
            type='text'
            id='business'
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className='mt-1 block w-full rounded-md border-2  border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='startDateOfExperience' className='block text-sm font-medium text-gray-700'>Date de début de l'experience</label>
          <input
            type='date'
            id='startDateOfExperience'
            value={startDateOfExperience}
            onChange={(e) => setStartDateOfExperience(e.target.value)}
            className='mt-1 block w-full rounded-md border-2  border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='endDateOfExperience' className='block text-sm font-medium text-gray-700'>Date de fin de l'experience</label>
          <input
            type='date'
            id='endDateOfExperience'
            value={endDateOfExperience}
            onChange={(e) => setEndDateOfExperience(e.target.value)}
            className='mt-1 block w-full rounded-md border-2  border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='locationExperience' className='block text-sm font-medium text-gray-700'>Lieu de l'experience</label>
          <input
            type='text'
            id='locationExperience'
            value={locationExperience}
            onChange={(e) => setLocationExperience(e.target.value)}
            className='mt-1 block w-full rounded-md border-2  border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='curriculumId' className='block text-sm font-medium text-gray-700'>ID du Curriculum</label>
          <input
            type='number'
            id='curriculumId'
            value={curriculumId}
            onChange={(e) => setCurriculumId(e.target.value)}
            className='mt-1 block w-full rounded-md border-2  border-gray-300 shadow-sm'
            required
          />
        </div>
        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Ajouter</button>
      </form>
    </div>
  );
};

export default ExperiencesCreateModale;