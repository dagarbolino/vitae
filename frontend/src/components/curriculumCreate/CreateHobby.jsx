import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const CreateHobby = () => {
  const [titleHobby, setTitleHobby] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/curriculum/hobby/', {
      title_hobby: titleHobby,
      active: isActive,
      
    })
    .then((response) => {
      console.log(response);
      alert('Hobby ajouté avec succès');
      navigate(-1); 
    })
    .catch((error) => {
      console.error(error);
      alert('Erreur lors de l\'ajout du hobby');
    });
  };


  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter un Hobby</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='titleHobby' className='block text-sm font-medium text-gray-700'>Titre du Hobby</label>
          <input
            type='text'
            id='titleHobby'
            value={titleHobby}
            onChange={(e) => setTitleHobby(e.target.value)}
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

        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Ajouter</button>
      </form>
    </div>
  );
};

export default CreateHobby;