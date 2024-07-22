import axios from 'axios';
import React, { useEffect, useState } from 'react';


const FormationDelUpModale = () => {
  const [formations, setFormations] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedBusiness, setEditedBusiness] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedEndDate, setEditedEndDate] = useState('');
  const [editedLocation, setEditedLocation] = useState('');

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = () => {
    axios.get('http://localhost:8000/curriculum/formations/')
      .then(response => {
        setFormations(response.data);
      })
      .catch(error => console.error("Il y a eu une erreur lors de la récupération des formations", error));
  };

  const deleteFormation = (id) => {
    axios.delete(`http://localhost:8000/curriculum/formations/${id}/`)
      .then(() => {
        alert('Formation supprimée avec succès');
        setFormations(prevFormations => prevFormations.filter(formation => formation.id !== id));
      })
      .catch(error => console.error("Erreur lors de la suppression de la formation", error));
  };

  const handleUpdateFormation = (id, updatedFormation) => {
    axios.put(`http://localhost:8000/curriculum/formations/${id}/`, updatedFormation)
      .then(() => {
        alert('Formation mise à jour avec succès');
        fetchFormations();
      })
      .catch(error => console.error("Erreur lors de la mise à jour de la formation", error));
  };

  const handleEditClick = (formation) => {
    setEditingId(formation.id);
    setEditedTitle(formation.title_formation);
    setEditedDescription(formation.description_formation);
    setEditedBusiness(formation.business);
    setEditedStartDate(formation.start_date_of_formation);
    setEditedEndDate(formation.end_date_of_formation);
    setEditedLocation(formation.location_formation);
  };

  const handleSave = (id) => {
    handleUpdateFormation(id, {
      title_formation: editedTitle,
      description_formation: editedDescription,
      business: editedBusiness,
      start_date_of_formation: editedStartDate,
      end_date_of_formation: editedEndDate,
      location_formation: editedLocation,
    });
    setEditingId(null);
  };

  return (

      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* Liste des Formations & Supprimer */}
          <h2 className='text-2xl my-4'>Liste des Formations</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {formations.map(formation => (
                <li
                  className='flex justify-between items my-6'
                  key={formation.id}>
                  {formation.title_formation} 
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors'
                    onClick={() => deleteFormation(formation.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-10">
          {/* Modifier une formation */}
          <h2 className='text-2xl my-4'>Modifier une formation</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {formations.map(formation => (
                <li
                  className='flex justify-between items-center my-6'
                  key={formation.id}>
                  {editingId === formation.id ? (
                    <>
                      <div className="">
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className='mr-2 px-2 border-2 rounded-md'
                        />
                        <textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className='mr-2 px-2 border-2 rounded-md mt-2'
                        />
                        <input
                          type="text"
                          value={editedBusiness}
                          onChange={(e) => setEditedBusiness(e.target.value)}
                          className='mr-2 px-2 border-2 rounded-md mt-2'
                        />
                        <input
                          type="date"
                          value={editedStartDate}
                          onChange={(e) => setEditedStartDate(e.target.value)}
                          className='mr-2 px-2 border-2 rounded-md mt-2'
                        />
                        <input
                          type="date"
                          value={editedEndDate}
                          onChange={(e) => setEditedEndDate(e.target.value)}
                          className='mr-2 px-2 border-2 rounded-md mt-2'
                        />
                        <input
                          type="text"
                          value={editedLocation}
                          onChange={(e) => setEditedLocation(e.target.value)}
                          className='mr-2 px-2 border-2 rounded-md mt-2'
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors'
                          onClick={() => handleSave(formation.id)}>Sauvegarder</button>
                      </div>
                    </>
                  ) : (
                    <>
                      {formation.title_formation} 
                      <button
                        className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => handleEditClick(formation)}>Modifier</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

  );
};

export default FormationDelUpModale;