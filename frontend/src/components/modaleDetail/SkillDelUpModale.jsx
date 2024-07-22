import axios from 'axios';
import React, { useEffect, useState } from 'react';



const SkillDelUpModale = () => {
  const [skills, setSkills] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    axios.get('http://localhost:8000/curriculum/skills/')
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => console.error("Il y a eu une erreur lors de la récupération des compétences", error));
  };

  const deleteSkill = (id) => {
    axios.delete(`http://localhost:8000/curriculum/skills/${id}/`)
      .then(() => {
        alert('Compétence supprimée avec succès');
        setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
      })
      .catch(error => console.error("Erreur lors de la suppression de la compétence", error));
  };

  const handleUpdateSkill = (id, updatedSkill) => {
    axios.put(`http://localhost:8000/curriculum/skills/${id}/`, updatedSkill)
      .then(() => {
        alert('Compétence mise à jour avec succès');
        fetchSkills();
      })
      .catch(error => console.error("Erreur lors de la mise à jour de la compétence", error));
  };

  const handleEditClick = (skill) => {
    setEditingId(skill.id);
    setEditedName(skill.title_skill);
  };

  const handleSave = (id) => {
    handleUpdateSkill(id, { title_skill: editedName });
    setEditingId(null);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* Liste des Compétences & Supprimer*/}
          <h2 className='text-2xl my-4'>Liste des Compétences</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {skills.map(skill => (
                <li
                  className='flex justify-between items my-6'
                  key={skill.id}>
                  {skill.title_skill}
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors'
                    onClick={() => deleteSkill(skill.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-10">
          {/* Modifier une compétence */}
          <h2 className='text-2xl my-4'>Modifier une compétence</h2>
          <div className='border-2 rounded-md p-4 w-96'>

            <ul>
              {skills.map(skill => (
                <li
                  className='flex justify-between items-center my-6'
                  key={skill.id}>
                  {editingId === skill.id ? (
                    <>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className='mr-2 px-2 border-2 rounded-md'
                      />
                      <button
                        className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors'
                        onClick={() => handleSave(skill.id)}>Sauvegarder</button>
                    </>
                  ) : (
                    <>
                      {skill.title_skill}
                      <button
                        className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => handleEditClick(skill)}>Modifier</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillDelUpModale;