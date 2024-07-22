import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../../components/ui/Section';




const FilePdf = () => {
  // Utilisation des hooks pour gérer l'état local
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [colorText, setColorText] = useState('black');

  // Fonction pour changer la couleur du texte
  const changeColorText = () => {
    const colors = ['black', 'blue', 'green', 'yellow', 'pink'];
    const currentColorIndex = colors.indexOf(colorText);
    const newColorIndex = (currentColorIndex + 1) % colors.length;
    setColorText(colors[newColorIndex]);
  };

  // Fonction pour changer la couleur de fond
  const changeBackgroundColor = () => {
    const colors = ['white', 'lightblue', 'lightgreen', 'lightyellow', 'lightpink'];
    const currentColorIndex = colors.indexOf(backgroundColor);
    const newColorIndex = (currentColorIndex + 1) % colors.length;
    setBackgroundColor(colors[newColorIndex]);
  };

  // Fonction pour changer la famille de polices
  const changeFontFamily = () => {
    const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia'];
    const currentFontIndex = fonts.indexOf(fontFamily);
    const newFontIndex = (currentFontIndex + 1) % fonts.length;
    setFontFamily(fonts[newFontIndex]);
  };

  // Récupération des données du CV à partir d'une API
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

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const cvContentElement = document.querySelector("#cvContent");
    const originalBackgroundColor = cvContentElement.style.backgroundColor; 
    cvContentElement.style.backgroundColor = backgroundColor;

    const images = document.querySelectorAll("#cvContent img");
    const imagesLoaded = Array.from(images).map(img => new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
      }
    }));

    Promise.all(imagesLoaded).then(() => {
      html2canvas(cvContentElement, { useCORS: true }).then(canvas => {
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

        cvContentElement.style.backgroundColor = originalBackgroundColor;
      });
    });
  };

  // Rendu du composant
  return (
    <>
      <Section>
        <div style={{ color: colorText }}>
          <button onClick={generatePDF} className='bg-blue-500 p-2 rounded-md m-2 w-auto hover:bg-blue-600 transition-colors duration-300 ease-in-out'>
            Générer PDF
          </button>
        </div>

        <div style={{ backgroundColor: backgroundColor, fontFamily: fontFamily, color: colorText }}> 
          <button
            className='p-2 rounded-md m-2 w-auto h-full bg-blue-400 hover:bg-blue-600 transition-colors duration-300 ease-in-out'
            onClick={changeBackgroundColor}>Changer la couleur de fond</button>

          <button
            className='p-2 rounded-md m-2 w-auto bg-blue-400 hover:bg-blue-600 transition-colors duration-300 ease-in-out'
            onClick={changeFontFamily}>Changer la police</button>

          <button 
            className='p-2 rounded-md m-2 w-auto bg-blue-400 hover:bg-blue-600 transition-colors duration-300 ease-in-out'
            onClick={changeColorText}>Changer la couleur du texte</button> 
          <div id="cvContent" className="flex w-full flex-col justify-start items-center m-4  h-[1448px] max-w-[1024px]">
            <div className="flex flex-row h-full">
              {cvData ? (
                <ul className="flex flex-col space-y-4 w-full">
                  <div className="flex flex-row gap-6 mt-6 ">
                    <div className="my-2 w-1/4 p-4">
                      {cvData.infos && cvData.infos.map((info, infoIndex) => (
                        <div key={infoIndex} className='flex flex-col w-full gap-2'>
                          <p className='text-3xl flex justify-end w-full'>{info.lastname}</p>
                          <p className='text-3xl flex justify-end w-full'>{info.firstname}</p>
                          <div className=" justify-center items-center flex flex-row w-full">
                            <img
                              className='w-48 h-56 rounded-full object-cover my-4'
                              src={info.photo}
                              alt={`${info.lastname} - ${info.firstname}`} />
                          </div>

                          <p className='text-md '>{info.type_of_contract}</p>
                          <div className="my-4 gap-2 mb-4">
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
                      <div className="w-full my-2 ">
                        <h3 className='text-lg font-semibold'>Hobbies :</h3>
                        {cvData.hobbies && cvData.hobbies.map((hobby, hobbyIndex) => (
                          <li key={hobbyIndex} className='list-inside ml-2 text-md '>
                            - {hobby.title_hobby}
                          </li>
                        ))}
                      </div>
                      <div className="w-full my-2 ">
                        <h3 className='text-lg font-semibold '>Compétences :</h3>
                        {cvData.skills && cvData.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className='list-inside ml-2 text-md '>
                            - {skill.title_skill}
                          </li>
                        ))}
                      </div>
                      <div className="w-full my-2 ">
                        <h3 className='text-lg font-semibold '>Langues :</h3>
                        {cvData.languages && cvData.languages.map((language, languageIndex) => (
                          <li key={languageIndex} className='list-inside ml-2 text-md  '>
                            <div className="">
                              <p>- {language.title_language}</p>
                              <p>Niveau : {language.niveau_language}</p>
                            </div>
                          </li>
                        ))}
                      </div>
                    </div>


                    <div className="flex flex-col justify-start items-center w-3/4 h-full">


                      <div className="border-2 border-slate-400 rounded-md m-4 p-2">
                        {cvData.infos && cvData.infos.map((info, infoIndex) => (
                          <div key={infoIndex} className=' flex flex-col justify-start items-start w-full'>
                            <p className='text-lg p-2 m-2 '>{info.motivation}</p>
                          </div>
                        ))}
                      </div>

                      <div className=" my-4 flex flex-col  w-full">

                        <h3 className='w-full flex flex-row justify-center items-center text-xl my-3 font-bold '>Formations :</h3>
                        <div className="px-3">
                          {cvData.formations && cvData.formations.map((formation, formationIndex) => (

                            <li key={formationIndex} className='flex flex-col text-md my-2  border-s-8 mb-6 px-4 '>

                              <div className="flex flex-row justify-start">
                                <p className='flex flex-col justify-start w-full text-lg underline mb-4'>
                                  <span>{formationIndex + 1} - {formation.title_formation} </span>
                                </p>
                              </div>

                              <div className="flex flex-row justify-start">
                                <div className="text-md w-auto flex flex-col justify-start items-start mt-1">
                                  <p className='w-auto mr-6'>{formation.start_date_of_formation}</p>
                                  <p className=' w-auto mr-6'>{formation.end_date_of_formation}</p>
                                </div>

                                <div className="flex flex-row justify-start">
                                  <div className=" w-auto flex flex-col justify-start items-start">
                                    <p className='text-lg'>{formation.description_formation}</p>
                                    <p class='mt-2 w-auto text-md'>Entreprise: {formation.business} à {formation.location_formation}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </div>


                        <h3 className='w-full flex flex-row justify-center items-center text-xl my-3 font-bold '>Expériences :</h3>
                        <div className="px-3">
                          {cvData.experiences && cvData.experiences.map((experience, experienceIndex) => (

                            <li key={experienceIndex} className='flex flex-col text-md my-2  border-s-8 mb-6 px-4 '>

                              <div className="flex flex-row justify-start">
                                <p className='flex flex-col justify-start w-full text-lg underline mb-4'>
                                  <span>{experienceIndex + 1} - {experience.title_experience} </span>
                                </p>
                              </div>

                              <div className="flex flex-row justify-start">
                                <div className="text-md w-auto flex flex-col justify-start items-start mt-1">
                                  <p className='w-auto mr-6'>{experience.start_date_of_experience}</p>
                                  <p className=' w-auto mr-6'>{experience.end_date_of_experience}</p>
                                </div>

                                <div className="flex flex-row justify-start">
                                  <div className=" w-auto flex flex-col justify-start items-start">
                                    <p className='text-lg'>{experience.description_experience}</p>
                                    <p class='mt-2 w-auto text-md'>Entreprise: {experience.business} à {experience.location_experience}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}

                        </div>

                      </div>

                    </div>
                  </div>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


export default FilePdf;