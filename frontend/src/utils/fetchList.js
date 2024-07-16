import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FetchList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/curriculum/curriculum/')
      .then(function (response) {

        setData(response.data);
      })
      .catch(function (error) {

        console.error(error);
      });
  }, []);

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

            {item.infos && item.infos.map((info, infoIndex) => (
              <div className='flex flex-col w-full gap-2'>
                <p className='text-2xl text-white'>{info.lastname}</p>
                <p className='text-2xl text-white'>{info.firstname}</p>
                <img
                  className='w-48 h-48 rounded-full object-cover'
                  src={info.photo}
                  alt={`${info.lastname} - ${info.firstname}`} />

                <p className='text-lg text-white'>{info.type_of_contract}</p>

                <div className="my-4 gap-2">
                  <p className='text-lg text-white'>Adresse : {info.address}</p>
                  <p className='text-lg text-white'>Ville : {info.city}</p>
                  <p className='text-lg text-white'>Code postal : {info.zipcode}</p>
                  <p className='text-lg text-white'>Pays : {info.state}</p>
                  <p className='text-lg text-white'>Téléphone : {info.phone}</p>
                </div>
              </div>
            ))
            }

              <p className='text-lg text-white'>Créé le : {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Date non disponible'}</p>
              
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchList;