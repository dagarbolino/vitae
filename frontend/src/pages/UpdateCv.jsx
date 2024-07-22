import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCv = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [active, setIsActive] = useState(false);
  const [userId, setUserId] = useState('');

  const [selectedInfos, setSelectedInfos] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);

  useEffect(() => {
    const loadDataAll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/curriculum/curriculum_create/${id}/`);
        const data = response.data;

        const hobbiesResponse = await axios.get('http://localhost:8000/curriculum/hobby/');
        const skillsResponse = await axios.get('http://localhost:8000/curriculum/skills/');
        const languagesResponse = await axios.get('http://localhost:8000/curriculum/languages/');
        const formationsResponse = await axios.get('http://localhost:8000/curriculum/formations/');
        const experiencesResponse = await axios.get('http://localhost:8000/curriculum/experiences/');
        const infosResponse = await axios.get('http://localhost:8000/curriculum/info/');

        setTitle(data.title);
        setIsActive(data.active);
        setUserId(data.user);

        setAllHobbies(hobbiesResponse.data);
        setAlldInfos(infosResponse.data);
        setAllSkills(skillsResponse.data);
        setAllLanguages(languagesResponse.data);
        setAllFormations(formationsResponse.data);
        setAllExperiences(experiencesResponse.data);

      } catch (error) {
        console.error("Erreur lors de la récupération des données du curriculum", error);
      }
    };

    loadDataAll();
  }, [id]);

  const [allHobbies, setAllHobbies] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allFormations, setAllFormations] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [allInfos, setAlldInfos] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const curriculumData = {
      title,
      active,
      user: userId,
      infos: selectedInfos,
      skills: selectedSkills,
      hobbies: selectedHobbies,
      languages: selectedLanguages,
      formations: selectedFormations,
      experiences: selectedExperiences,
    };

    axios.put(`http://localhost:8000/curriculum/curriculum_create/${id}/`, curriculumData)
      .then((response) => {
        alert('Curriculum mis à jour avec succès');
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert('Erreur lors de la mise à jour du curriculum');
      });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Modifier le curriculum</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <div className='mb-4'>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Titre du curriculum</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>

        {/* Champ Actif */}
        <div className='mb-4'>
          <label htmlFor='active' className='block text-sm font-medium text-gray-700'>Actif</label>
          <input
            type='checkbox'
            id='active'
            checked={active}
            onChange={(e) => setIsActive(e.target.checked)}
            className='mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
          />
        </div>

        {/* Champ User ID */}
        <div className='mb-4'>
          <label htmlFor='userId' className='block text-sm font-medium text-gray-700'>ID de l'utilisateur</label>
          <input
            type='text'
            id='userId'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>

        {/* Champs pour les catégories sélectionnées */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Infos</label>
          <div className='mt-1'>
            {allInfos.map((info) => (
              <div key={info.id}>
                <input
                  type="checkbox"
                  id={`info-${info.id}`}
                  value={info.id}
                  checked={selectedInfos.includes(info.id)}
                  onChange={(e) => {
                    const newSelectedInfos = e.target.checked
                      ? [...selectedInfos, info.id]
                      : selectedInfos.filter((id) => id !== info.id);
                    setSelectedInfos(newSelectedInfos);
                  }}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <label htmlFor={`info-${info.id}`} className='ml-3 text-sm text-gray-600'>
                  {info.lastname}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Hobbies</label>
          <div className='mt-1'>
            {allHobbies.map((hobby) => (
              <div key={hobby.id}>
                <input
                  type="checkbox"
                  id={`hobby-${hobby.id}`}
                  value={hobby.id}
                  checked={selectedHobbies.includes(hobby.id)}
                  onChange={(e) => {
                    const newSelectedHobbies = e.target.checked
                      ? [...selectedHobbies, hobby.id]
                      : selectedHobbies.filter((id) => id !== hobby.id);
                    setSelectedHobbies(newSelectedHobbies);
                  }}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <label htmlFor={`hobby-${hobby.id}`} className='ml-3 text-sm text-gray-600'>
                  {hobby.title_hobby}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Compétences</label>
          <div className='mt-1'>
            {allSkills.map((skill) => (
              <div key={skill.id}>
                <input
                  type="checkbox"
                  id={`skill-${skill.id}`}
                  value={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onChange={(e) => {
                    const newSelectedSkills = e.target.checked
                      ? [...selectedSkills, skill.id]
                      : selectedSkills.filter((id) => id !== skill.id);
                    setSelectedSkills(newSelectedSkills);
                  }}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <label htmlFor={`skill-${skill.id}`} className='ml-3 text-sm text-gray-600'>
                  {skill.title_skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Langues</label>
          <div className='mt-1'>
            {allLanguages.map((language) => (
              <div key={language.id}>
                <input
                  type="checkbox"
                  id={`language-${language.id}`}
                  value={language.id}
                  checked={selectedLanguages.includes(language.id)}
                  onChange={(e) => {
                    const newSelectedLanguages = e.target.checked
                      ? [...selectedLanguages, language.id]
                      : selectedLanguages.filter((id) => id !== language.id);
                    setSelectedLanguages(newSelectedLanguages);
                  }}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <label htmlFor={`language-${language.id}`} className='ml-3 text-sm text-gray-600'>
                  {language.title_language}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Formations</label>
          <div className='mt-1'>
            {allFormations.map((formation) => (
              <div key={formation.id}>
                <input
                  type="checkbox"
                  id={`formation-${formation.id}`}
                  value={formation.id}
                  checked={selectedFormations.includes(formation.id)}
                  onChange={(e) => {
                    const newSelectedFormations = e.target.checked
                      ? [...selectedFormations, formation.id]
                      : selectedFormations.filter((id) => id !== formation.id);
                    setSelectedFormations(newSelectedFormations);
                  }}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <label htmlFor={`formation-${formation.id}`} className='ml-3 text-sm text-gray-600'>
                  {formation.title_formation}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Expériences</label>
          <div className='mt-1'>
            {allExperiences.map((experience) => (
              <div key={experience.id}>
                <input
                  type="checkbox"
                  id={`experience-${experience.id}`}
                  value={experience.id}
                  checked={selectedExperiences.includes(experience.id)}
                  onChange={(e) => {
                    const newSelectedExperiences = e.target.checked
                      ? [...selectedExperiences, experience.id]
                      : selectedExperiences.filter((id) => id !== experience.id);
                    setSelectedExperiences(newSelectedExperiences);
                  }}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
                <label htmlFor={`experience-${experience.id}`} className='ml-3 text-sm text-gray-600'>
                  {experience.title_experience}
                </label>
              </div>
            ))}
          </div>
        </div>






        {/* Bouton de soumission */}
        <button type='submit' className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateCv;