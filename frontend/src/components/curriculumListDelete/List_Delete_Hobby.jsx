import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Section from '../../components/ui/Section';
import NavBar from '../NavBar';


const List_Delete_Hobby = () => {
  const [hobbies, setHobbies] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedActive, setEditedActive] = useState(false);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = () => {
    axios.get('http://localhost:8000/curriculum/hobby/')
      .then(response => {
        setHobbies(response.data);
      })
      .catch(error => console.error("Il y a eu une erreur lors de la récupération des hobbies", error));
  };

  const deleteHobby = (id) => {
    axios.delete(`http://localhost:8000/curriculum/hobby/${id}/`)
      .then(() => {
        alert('Hobby supprimé avec succès');
        setHobbies(prevHobbies => prevHobbies.filter(hobby => hobby.id !== id));
      })
      .catch(error => console.error("Erreur lors de la suppression du hobby", error));
  };

  const handleUpdateHobby = (id, updatedHobby) => {
    axios.put(`http://localhost:8000/curriculum/hobby/${id}/`, updatedHobby)
      .then(() => {
        alert('Hobby mis à jour avec succès');
        fetchHobbies();
      })
      .catch(error => console.error("Erreur lors de la mise à jour du hobby", error));
  };

  const handleEditClick = (hobby) => {
    setEditingId(hobby.id);
    setEditedTitle(hobby.title_hobby);
    setEditedActive(hobby.active);
  };

  const handleSave = (id) => {
    handleUpdateHobby(id, { title_hobby: editedTitle, active: editedActive });
    setEditingId(null);
  };

  return (
    <Section className="w-auto box-border m-0 p-0 gap-6 flex flex-col justify-between items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <div className="flex flex-row justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* Liste des Hobbies & Supprimer*/}
          <h2 className='text-2xl my-4'>Liste des Hobbies</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {hobbies.map(hobby => (
                <li
                  className='flex justify-between items my-6'
                  key={hobby.id}>
                  {hobby.title_hobby} - {hobby.active ? 'Actif' : 'Inactif'}
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors'
                    onClick={() => deleteHobby(hobby.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-10">
          {/* Modifier un hobby */}
          <h2 className='text-2xl my-4'>Modifier un hobby</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {hobbies.map(hobby => (
                <li
                  className='flex justify-between items-center my-6'
                  key={hobby.id}>
                  {editingId === hobby.id ? (
                    <>

                      <div className="">
                        <div className="">
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
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
                        </div>

                        <div className="mt-4">
                          <button
                            className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors'
                            onClick={() => handleSave(hobby.id)}>Sauvegarder</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {hobby.title_hobby} - {hobby.active ? 'Actif' : 'Inactif'}
                      <button
                        className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => handleEditClick(hobby)}>Modifier</button>
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

export default List_Delete_Hobby;