import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Section from '../../components/ui/Section';
import NavBar from '../NavBar';

const List_Delete_Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedBusiness, setEditedBusiness] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedEndDate, setEditedEndDate] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedActive, setEditedActive] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = () => {
    axios.get('http://localhost:8000/curriculum/experiences/')
      .then(response => {
        setExperiences(response.data);
      })
      .catch(error => console.error("Il y a eu une erreur lors de la récupération des expériences", error));
  };

  const deleteExperience = (id) => {
    axios.delete(`http://localhost:8000/curriculum/experiences/${id}/`)
      .then(() => {
        alert('Expérience supprimée avec succès');
        setExperiences(prevExperiences => prevExperiences.filter(experience => experience.id !== id));
      })
      .catch(error => console.error("Erreur lors de la suppression de l'expérience", error));
  };

  const handleUpdateExperience = (id, updatedExperience) => {
    axios.put(`http://localhost:8000/curriculum/experiences/${id}/`, updatedExperience)
      .then(() => {
        alert('Expérience mise à jour avec succès');
        fetchExperiences();
      })
      .catch(error => console.error("Erreur lors de la mise à jour de l'expérience", error));
  };

  const handleEditClick = (experience) => {
    setEditingId(experience.id);
    setEditedTitle(experience.title_experience);
    setEditedDescription(experience.description_experience);
    setEditedBusiness(experience.business);
    setEditedStartDate(experience.start_date_of_experience);
    setEditedEndDate(experience.end_date_of_experience);
    setEditedLocation(experience.location_experience);
    setEditedActive(experience.active);
  };

  const handleSave = (id) => {
    handleUpdateExperience(id, {
      title_experience: editedTitle,
      description_experience: editedDescription,
      business: editedBusiness,
      start_date_of_experience: editedStartDate,
      end_date_of_experience: editedEndDate,
      location_experience: editedLocation,
      active: editedActive
    });
    setEditingId(null);
  };

  return (
    <Section className="w-auto box-border m-0 p-0 gap-6 flex flex-col justify-between items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <div className="flex flex-row justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* Liste des Expériences & Supprimer */}
          <h2 className='text-2xl my-4'>Liste des Expériences</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {experiences.map(experience => (
                <li
                  className='flex justify-between items my-6'
                  key={experience.id}>
                  {experience.title_experience} - {experience.location_experience} - {experience.active ? 'Actif' : 'Inactif'}
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors'
                    onClick={() => deleteExperience(experience.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-10">
          {/* Modifier une expérience */}
          <h2 className='text-2xl my-4'>Modifier une expérience</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {experiences.map(experience => (
                <li
                  className='flex justify-between items-center my-6'
                  key={experience.id}>
                  {editingId === experience.id ? (
                    <>

                      <div className="">
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className='mr-2 px-2'
                        />
                        <textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className='mr-2 px-2'
                        />
                        <input
                          type="text"
                          value={editedBusiness}
                          onChange={(e) => setEditedBusiness(e.target.value)}
                          className='mr-2 px-2'
                        />
                        <input
                          type="date"
                          value={editedStartDate}
                          onChange={(e) => setEditedStartDate(e.target.value)}
                          className='mr-2 px-2'
                        />
                        <input
                          type="date"
                          value={editedEndDate}
                          onChange={(e) => setEditedEndDate(e.target.value)}
                          className='mr-2 px-2'
                        />
                        <input
                          type="text"
                          value={editedLocation}
                          onChange={(e) => setEditedLocation(e.target.value)}
                          className='mr-2 px-2'
                        />
                        <select
                          value={editedActive}
                          onChange={(e) => setEditedActive(e.target.value === 'true')}
                          className='mr-2'
                        >
                          <option value="true">Actif</option>
                          <option value="false">Inactif</option>
                        </select>

                        <div className="mt-4">
                          <button
                            className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors'
                            onClick={() => handleSave(experience.id)}>Sauvegarder</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {experience.title_experience} - {experience.location_experience} - {experience.active ? 'Actif' : 'Inactif'}
                      <button
                        className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => handleEditClick(experience)}>Modifier</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </Section>
  );
};

export default List_Delete_Experience;