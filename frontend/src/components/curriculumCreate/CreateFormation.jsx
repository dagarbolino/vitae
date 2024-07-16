import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFormation = () => {
  const [titleFormation, setTitleFormation] = useState('');
  const [descriptionFormation, setDescriptionFormation] = useState('');
  const [business, setBusiness] = useState('');
  const [startDateOfFormation, setStartDateOfFormation] = useState('');
  const [endDateOfFormation, setEndDateOfFormation] = useState('');
  const [locationFormation, setLocationFormation] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [curriculumId, setCurriculumId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/curriculum/formations/', {
      title_formation: titleFormation,
      description_formation: descriptionFormation,
      business: business,
      start_date_of_formation: startDateOfFormation,
      end_date_of_formation: endDateOfFormation,
      location_formation: locationFormation,
      active: isActive,
      curriculum: curriculumId,
    })
    .then((response) => {
      console.log(response);
      alert('Formation ajoutée avec succès');
      navigate(-1);
    })
    .catch((error) => {
      console.error(error);
      alert('Erreur lors de l\'ajout de la formation');
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter une Formation</h2>
      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire ici */}
        <div className='mb-4'>
          <label htmlFor='titleFormation' className='block text-sm font-medium text-gray-700'>Titre de la formation</label>
          <input
            type='text'
            id='titleFormation'
            value={titleFormation}
            onChange={(e) => setTitleFormation(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='descriptionFormation' className='block text-sm font-medium text-gray-700'>Description de la formation</label>
          <textarea
            id='descriptionFormation'
            value={descriptionFormation}
            onChange={(e) => setDescriptionFormation(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='startDateOfFormation' className='block text-sm font-medium text-gray-700'>Date de début de la formation</label>
          <input
            type='date'
            id='startDateOfFormation'
            value={startDateOfFormation}
            onChange={(e) => setStartDateOfFormation(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='endDateOfFormation' className='block text-sm font-medium text-gray-700'>Date de fin de la formation</label>
          <input
            type='date'
            id='endDateOfFormation'
            value={endDateOfFormation}
            onChange={(e) => setEndDateOfFormation(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='locationFormation' className='block text-sm font-medium text-gray-700'>Lieu de la formation</label>
          <input
            type='text'
            id='locationFormation'
            value={locationFormation}
            onChange={(e) => setLocationFormation(e.target.value)}
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

export default CreateFormation;