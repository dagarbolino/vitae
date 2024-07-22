import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Section from '../../components/ui/Section';
import NavBar from '../NavBar';


const ListEditDeleteInfo = () => {
  const { id } = useParams();

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
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`http://localhost:8000/curriculum/info/${id}/`)
      .then(response => {
        setInfos(response.data);
        setEditingId(response.data.id);

        setEditedLastName(response.data.lastname);
        setEditedFirstName(response.data.firstname);
        setEditedTypeOfContract(response.data.type_of_contract);
        setEditedDateOfBirth(response.data.date_of_birth);
        setEditedPlaceOfBirth(response.data.place_of_birth);
        setEditedAddress(response.data.address);
        setEditedCity(response.data.city);
        setEditedState(response.data.state);
        setEditedZipcode(response.data.zipcode);
        setEditedPhone(response.data.phone);
        setEditedEmail(response.data.email);
        setEditedMotivation(response.data.motivation);


      })
      .catch(error => console.error("Erreur lors de la récupération des infos", error));
  }, [id]);



  const handleSave = () => {
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
    axios.put(`http://localhost:8000/curriculum/info/${id}/`, updatedInfo)
      .then(() => {
        alert('Info mise à jour avec succès');
        navigate('/dashboard');
      })
      .catch(error => console.error("Erreur lors de la mise à jour de l'info", error));
  };

  if (!infos) return <div>Chargement...</div>;

  return (
    <div>
      <NavBar />
      <Section title="Edit Info">
        <div>
          <label htmlFor="lastname">Nom</label>
          <input type="text" id="lastname" value={editedLastName} onChange={e => setEditedLastName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input type="text" id="firstname" value={editedFirstName} onChange={e => setEditedFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="type_of_contract">Type de contrat</label>
          <input type="text" id="type_of_contract" value={editedTypeOfContract} onChange={e => setEditedTypeOfContract(e.target.value)} />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date de naissance</label>
          <input type="text" id="date_of_birth" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} />
        </div>
        <div>
          <label htmlFor="place_of_birth">Lieu de naissance</label>
          <input type="text" id="place_of_birth" value={editedPlaceOfBirth} onChange={e => setEditedPlaceOfBirth(e.target.value)} />
        </div>
        <div>
          <label htmlFor="address">Adresse</label>
          <input type="text" id="address" value={editedAddress} onChange={e => setEditedAddress(e.target.value)} />
        </div>
        <div>
          <label htmlFor="city">Ville</label>
          <input type="text" id="city" value={editedCity} onChange={e => setEditedCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="state">Etat</label>
          <input type="text" id="state" value={editedState} onChange={e => setEditedState(e.target.value)} />
        </div>
        <div>
          <label htmlFor="zipcode">Code postal</label>
          <input type="text" id="zipcode" value={editedZipcode} onChange={e => setEditedZipcode(e.target.value)} />
        </div>

        <div>
          <label htmlFor="phone">Téléphone</label>
          <input type="text" id="phone" value={editedPhone} onChange={e => setEditedPhone(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="motivation">Motivation</label>
          <input type="text" id="motivation" value={editedMotivation} onChange={e => setEditedMotivation(e.target.value)} />
        </div>
        <button onClick={handleSave}>Enregistrer</button>
      </Section>
    </div>

  );
};



export default ListEditDeleteInfo;