import axios from 'axios';
import React, { useEffect, useState } from 'react';


const List_Delete_Langue = () => {
  const [languages, setLanguages] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLevel, setEditedLevel] = useState('');
  const [editedActive, setEditedActive] = useState(false);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = () => {
    axios.get('http://localhost:8000/curriculum/languages/')
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => console.error("Il y a eu une erreur lors de la récupération des langues", error));
  };

  const deleteLanguage = (id) => {
    axios.delete(`http://localhost:8000/curriculum/languages/${id}/`)
      .then(() => {
        alert('Langue supprimée avec succès');
        setLanguages(prevLanguages => prevLanguages.filter(language => language.id !== id));
      })
      .catch(error => console.error("Erreur lors de la suppression de la langue", error));
  };

  const handleUpdateLanguage = (id, updatedLanguage) => {
    axios.put(`http://localhost:8000/curriculum/languages/${id}/`, updatedLanguage)
      .then(() => {
        alert('Langue mise à jour avec succès');
        fetchLanguages();
      })
      .catch(error => console.error("Erreur lors de la mise à jour de la langue", error));
  };

  const handleEditClick = (language) => {
    setEditingId(language.id);
    setEditedTitle(language.title_language);
    setEditedLevel(language.niveau_language);
    setEditedActive(language.active);
  };

  const handleSave = (id) => {
    handleUpdateLanguage(id, { title_language: editedTitle, niveau_language: editedLevel, active: editedActive });
    setEditingId(null);
  };

  return (
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* Liste des Langues & Supprimer */}
          <h2 className='text-2xl '>Liste des Langues</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {languages.map(language => (
                <li
                  className='flex justify-between items my-6'
                  key={language.id}>
                  {language.title_language} - {language.niveau_language} 
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors'
                    onClick={() => deleteLanguage(language.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-2 gap-10">
          {/* Modifier une langue */}
          <h2 className='text-2xl '>Modifier une langue</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {languages.map(language => (
                <li
                  className='flex justify-between items-center my-6'
                  key={language.id}>
                  {editingId === language.id ? (
                    <>

                      <div className="">
                        <div className="">
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className='mr-2 px-2 border-2 rounded-md'
                          />

                          <div className="flex flex-row justify-start items-center w-full mt-4">
                            <select
                              value={editedLevel}
                              onChange={(e) => setEditedLevel(e.target.value)}
                              className='mr-2'
                            >
                              <option value="Débutant">Débutant</option>
                              <option value="Intermédiaire">Intermédiaire</option>
                              <option value="Avancé">Avancé</option>
                            </select>
                          </div>

                        </div>

                        <div className="mt-4">
                          <button
                            className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors'
                            onClick={() => handleSave(language.id)}>Sauvegarder</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {language.title_language} - {language.niveau_language}
                      <button
                        className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => handleEditClick(language)}>Modifier</button>
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

export default List_Delete_Langue;