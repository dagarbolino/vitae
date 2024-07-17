import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../ui/Section';
;

const FilePdf = () => {

  const { id } = useParams();
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/curriculum/curriculum/${id}/`);
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du CV:", error);
      }
    };

    fetchCvData();
  }, [id]);


  const generatePDF = () => {
    const images = document.querySelectorAll("#cvContent img");
    const imagesLoaded = Array.from(images).map(img => new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
      }
    }));

    Promise.all(imagesLoaded).then(() => {
      html2canvas(document.querySelector("#cvContent"), { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      });
    });
  };


  return (
    <Section>

      <button onClick={generatePDF} className='bg-blue-500  p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
        Générer PDF
      </button>

      <div id="cvContent" className="flex w-full flex-col justify-center items-center m-4 text-black">
        <div className="flex flex-row border-2">
          {cvData ? (
            <ul className="flex flex-col space-y-4 w-full">
              <div className="flex flex-row gap-6 mt-6 ">
                <div className="my-2 w-1/4 p-4">
                  {cvData.infos && cvData.infos.map((info, infoIndex) => (
                    <div key={infoIndex} className='flex flex-col w-full gap-2'>
                      <p className='text-2xl '>{info.lastname}</p>
                      <p className='text-2xl '>{info.firstname}</p>
                      <img
                        className='w-48 h-48 rounded-full object-cover'
                        src={info.photo}
                        alt={`${info.lastname} - ${info.firstname}`} />
                      <p className='text-lg '>{info.type_of_contract}</p>
                      <div className="my-4 gap-2">
                        <h3 className=' text-xl font-bold mb-4'>Informations personelles</h3>
                        <p className='text-lg '>Adresse : {info.address}</p>
                        <p className='text-lg '>Ville : {info.city}</p>
                        <p className='text-lg '>Code postal : {info.zipcode}</p>
                        <p className='text-lg '>Pays : {info.state}</p>
                        <p className='text-lg '>Téléphone : {info.phone}</p>
                        <p className='text-lg '>Email : {info.email}</p>
                        <p className='text-lg '>Née le : {info.date_of_birth}</p>
                        <p className='text-lg '>à : {info.place_of_birth}</p>
                      </div>
                    </div>
                  ))}
                  <h3 className='text-xl font-semibold underline  w-full mt-6'>Hobbies :</h3>
                  {cvData.hobbies && cvData.hobbies.map((hobby, hobbyIndex) => (
                    <li key={hobbyIndex} className='list-inside list-disc text-lg my-2  '>
                      {hobby.title_hobby}
                    </li>
                  ))}
                  <h3 className='text-xl font-semibold underline  w-full'>Compétences :</h3>
                  {cvData.skills && cvData.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className='list-inside list-disc text-lg my-2  '>
                      {skill.title_skill}
                    </li>
                  ))}
                  <h3 className='text-xl font-semibold underline  w-full'>Langues :</h3>
                  {cvData.languages && cvData.languages.map((language, languageIndex) => (
                    <li key={languageIndex} className=' text-lg my-2  '>
                      <div className="">
                        <p>- {language.title_language}</p>
                        <p>Niveau : {language.niveau_language}</p>
                      </div>
                    </li>
                  ))}
                </div>
                <div className="w-full px-4">
                  <div className="border-2 rounded-md my-4  p-4">
                    {cvData.infos && cvData.infos.map((info, infoIndex) => (
                      <div key={infoIndex} className='flex flex-col w-full gap-2'>
                        <p className='text-lg '>{info.motivation}</p>
                      </div>
                    ))}
                  </div>
                  <h3 className='text-xl font-semibold underline  w-full'>Formations :</h3>
                  {cvData.formations && cvData.formations.map((formation, formationIndex) => (
                    <li key={formationIndex} className='flex flex-col text-lg my-2  border-s-4  '>
                      <div className="flex flex-row justify-start items-center gap-2  ml-4">
                        <p>Titre :</p>
                        <p>{formation.title_formation} </p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2 ml-4">
                        <p>Entreprise :</p>
                        <p>{formation.business}</p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2 mb-2 ml-4">
                        <p>Status :</p>
                        <p className='text-black'>{formation.active ? "Actif" : "Inactif"}</p>
                      </div>
                    </li>
                  ))}
                  <h3 className='text-xl font-semibold underline  w-full'>Expériences :</h3>
                  {cvData.experiences && cvData.experiences.map((experience, experienceIndex) => (
                    <li key={experienceIndex} className='flex flex-col text-lg my-2   border-s-4'>
                      <div className="flex flex-row justify-start items-center gap-2 ml-4 ">
                        <p>Titre :</p>
                        <p>{experience.title_experience} </p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2 mb-2 ml-4">
                        <p>Entreprise :</p>
                        <p>{experience.business}</p>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </ul>
          ) : null}
        </div>
      </div>

    </Section>

  );
}




export default FilePdf;