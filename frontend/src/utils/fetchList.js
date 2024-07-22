import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FetchList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/curriculum/curriculum_create/')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    // Demander une confirmation
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (isConfirmed) {
      axios.delete(`http://localhost:8000/curriculum/curriculum_create/${id}`)  
        .then(function (response) {
          console.log(response);
          // Mise à jour de l'état pour refléter la suppression
          setData(data.filter(item => item.id !== id));
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <div className=''>
      <h1 className='text-white text-4xl'>Liste des Curriculums</h1>
      <br />
      <ul className='flex flex-row justify-center items-start gap-8'>
        {data.map((item, index) => (
          <li 
            className='border-2 rounded-md p-4 w-72'
            key={index}>

            <p className='text-white font-semibold text-2xl py-2 underline flex flex-row justify-center items-center w-full'>
              <Link to={`detail-cv/${item.id}`}>{item.title}</Link>
            </p>
            <p className='text-lg text-white'>Créé le : {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Date non disponible'}</p>
            
            <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md transition-colors duration-300 ease-in-out text-white" onClick={() => handleDelete(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchList;