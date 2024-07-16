import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateInfo = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [typeOfContract, setTypeOfContract] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [motivation, setMotivation] = useState('');
  const [active, setActive] = useState(false);
  const [curriculumId, setCurriculumId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('lastname', lastname);
    formData.append('firstname', firstname);
    formData.append('type_of_contract', typeOfContract);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('place_of_birth', placeOfBirth);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zipcode', zipcode);
    formData.append('phone', phone);
    formData.append('email', email);
    if (photo) formData.append('photo', photo);
    formData.append('motivation', motivation);
    formData.append('active', active);
    formData.append('curriculum', curriculumId);

    axios.post('http://localhost:8000/info/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response);
        alert('Info ajoutée avec succès');
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert('Erreur lors de l\'ajout de l\'info');
      });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ajouter une Info</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">


        <div className='mb-4'>
          <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>Nom de la personne</label>
          <input
            type='text'
            id='lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>Prénom de la personne</label>
          <input
            type='text'
            id='firstname'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='typeOfContract' className='block text-sm font-medium text-gray-700'>Type de contrat</label>
          <input
            type='text'
            id='typeOfContract'
            value={typeOfContract}
            onChange={(e) => setTypeOfContract(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='dateOfBirth' className='block text-sm font-medium text-gray-700'>Date de naissance</label>
          <input
            type='date'
            id='dateOfBirth'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='placeOfBirth' className='block text-sm font-medium text-gray-700'>Lieu de naissance</label>
          <input
            type='text'
            id='placeOfBirth'
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Adresse</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>


        <div className='mb-4'>
          <label htmlFor='city' className='block text-sm font-medium text-gray-700'>Ville</label>
          <input
            type='text'
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='state' className='block text-sm font-medium text-gray-700'>Région</label>
          <input
            type='text'
            id='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='zipcode' className='block text-sm font-medium text-gray-700'>Code postal</label>
          <input
            type='text'
            id='zipcode'
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Téléphone</label>
          <input
            type='text'
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>Photo</label>
          <input
            type='file'
            id='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          />

          <img
            className='mt-1 block w-20 rounded-md border-gray-300 shadow-sm'
            src={photo ? URL.createObjectURL(photo) : ''}
            alt=''
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='motivation' className='block text-sm font-medium text-gray-700'>Motivation</label>
          <textarea
            id='motivation'
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='active' className='block text-sm font-medium text-gray-700'>Actif</label>
          <select
            id='active'
            value={active}
            onChange={(e) => setActive(e.target.value === 'true')}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          >
            <option value='true'>Oui</option>
            <option value='false'>Non</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='curriculumId' className='block text-sm font-medium text-gray-700'>Curriculum</label>
          <input
            type='text'
            id='curriculumId'
            value={curriculumId}
            onChange={(e) => setCurriculumId(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
            required
          />
        </div>

        <div className='mb-4'>
        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default CreateInfo;