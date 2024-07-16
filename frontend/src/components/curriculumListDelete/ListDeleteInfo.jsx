import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Section from '../../components/ui/Section';
import NavBar from '../NavBar';

const ListEditDeleteInfo = () => {
  const [infos, setInfos] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedLastName, setEditedLastName] = useState('');
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedTypeOfContract, setEditedTypeOfContract] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedPlaceOfBirth, setEditedPlaceOfBirth] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedState, setEditedState] = useState('');
  const [editedZipcode, setEditedZipcode] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedMotivation, setEditedMotivation] = useState('');


  useEffect(() => {
    fetchInfos();
  }, []);

  const fetchInfos = () => {
    axios.get('http://localhost:8000/curriculum/info/')
      .then(response => {
        setInfos(response.data);
      })
      .catch(error => console.error("Il y a eu une erreur lors de la récupération des infos", error));
  };

  const deleteInfo = (id) => {
    axios.delete(`http://localhost:8000/curriculum/info/${id}/`)
      .then(() => {
        alert('Info supprimée avec succès');
        setInfos(prevInfos => prevInfos.filter(info => info.id !== id));
      })
      .catch(error => console.error("Erreur lors de la suppression de l'info", error));
  };

  const handleUpdateInfo = (id, updatedInfo) => {
    axios.put(`http://localhost:8000/curriculum/info/${id}/`, updatedInfo)
      .then(() => {
        alert('Info mise à jour avec succès');
        fetchInfos();
      })
      .catch(error => console.error("Erreur lors de la mise à jour de l'info", error));
  };

  const handleEditClick = (info) => {
    setEditingId(info.id);
    setEditedLastName(info.lastname);
    setEditedFirstName(info.firstname);
    setEditedTypeOfContract(info.type_of_contract);
    setEditedDateOfBirth(info.date_of_birth);
    setEditedPlaceOfBirth(info.place_of_birth);
    setEditedAddress(info.address);
    setEditedCity(info.city);
    setEditedState(info.state);
    setEditedZipcode(info.zipcode);
    setEditedPhone(info.phone);
    setEditedEmail(info.email);
    setEditedMotivation(info.motivation);
  };

  const handleSave = (id) => {
    const updatedInfo = {
      lastname: editedLastName,
      firstname: editedFirstName,
      type_of_contract: editedTypeOfContract,
      date_of_birth: editedDateOfBirth,
      place_of_birth: editedPlaceOfBirth,
      address: editedAddress,
      city: editedCity,
      state: editedState,
      zipcode: editedZipcode,
      phone: editedPhone,
      email: editedEmail,
      motivation: editedMotivation,
    };
    handleUpdateInfo(id, updatedInfo);
    setEditingId(null);
  };

  return (
    <Section className="w-auto box-border m-0 p-0 gap-6 flex flex-col justify-between items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <div className="flex flex-row justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-10">
          <h2 className='text-3xl my-4'>Liste des Infos</h2>
          <div className=' w-full'>
            {infos.map((info) => (
              <div
                className='flex flex-col justify-start items-start my-2'
                key={info.id}>
                {editingId === info.id ? (
                  // Formulaire d'édition pour l'info actuellement en édition
                  <>
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedFirstName} onChange={(e) => setEditedFirstName(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedTypeOfContract} onChange={(e) => setEditedTypeOfContract(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedDateOfBirth} onChange={(e) => setEditedDateOfBirth(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedPlaceOfBirth} onChange={(e) => setEditedPlaceOfBirth(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedCity} onChange={(e) => setEditedCity(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedState} onChange={(e) => setEditedState(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedZipcode} onChange={(e) => setEditedZipcode(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
                    <input className='my-1 w-full text-xl rounded-md p-2 max-w-[500px]' type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                    <textarea className='my-2 w-full text-xl h-32 rounded-md p-2 max-w-[500px]' value={editedMotivation} onChange={(e) => setEditedMotivation(e.target.value)} />

                    <button
                      className='bg-green-500 text-xl text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors'
                      onClick={() => handleSave(info.id)}>Sauvegarder</button>
                  </>
                ) : (
                  // Affichage des informations
                  <>
                    <div className="flex flex-row  border-4">
                      
                      <div className="flex flex-col justify-start items-start p-4 gap-2">
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Nom : </p>{info.lastname} </div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Prénom : </p>{info.firstname}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Type de contrat : </p>{info.type_of_contract}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Date de naissance : </p>{info.date_of_birth}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Lieu de naissance : </p>{info.place_of_birth}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Adresse : </p>{info.address}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Ville : </p>{info.city}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Etat : </p>{info.state}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Code postal : </p>{info.zipcode}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Téléphone : </p>{info.phone}</div>
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Email : </p>{info.email}</div>
                        
                        
                        <div className='flex flex-row justify-start items-start gap-2 text-xl'><p className=' font-semibold '>Motivation: </p>{info.motivation}</div>


                      </div>
                      <div className="">
                        <button className='w-28 rounded-md bg-blue-300 hover:bg-blue-400 transition duration-500 my-2' onClick={() => handleEditClick(info)}>Éditer</button>
                        <button className='w-28 rounded-md bg-red-500 hover:bg-red-600 taransition duration-500' onClick={() => deleteInfo(info.id)}>Supprimer</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ListEditDeleteInfo;