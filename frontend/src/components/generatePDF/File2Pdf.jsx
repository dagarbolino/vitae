import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../../components/ui/Section';


const FilePdf = () => {
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [colorText, setColorText] = useState('black');

  const changeColorText = () => {
    const colors = ['black', 'blue', 'green', 'yellow', 'pink'];

    const currentColorIndex = colors.indexOf(colorText);
    const newColorIndex = (currentColorIndex + 1) % colors.length;
    setColorText(colors[newColorIndex]);
  };

  const changeBackgroundColor = () => {
    const colors = ['white', 'lightblue', 'lightgreen', 'lightyellow', 'lightpink'];

    const currentColorIndex = colors.indexOf(backgroundColor);
    const newColorIndex = (currentColorIndex + 1) % colors.length;
    setBackgroundColor(colors[newColorIndex]);
  };

  const changeFontFamily = () => {
    const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia'];

    const currentFontIndex = fonts.indexOf(fontFamily);
    const newFontIndex = (currentFontIndex + 1) % fonts.length;
    setFontFamily(fonts[newFontIndex]);
  };

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

  return (
    <>
      <Section>
        <div className="" style={{ color: colorText }}>
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


          <div id="cvContent" className="flex w-full flex-col justify-center items-center m-5  h-[1448px] max-w-[1024px]">
            <div className="flex flex-row  p-4">
              {cvData ? (
                <ul className="flex flex-col space-y-4 w-full">
                  <div className="flex flex-row gap-8 mt-8 ">
                    <div className="my-3 w-1/4 p-5 bg-white border-4 rounded-md border-gray-200 ">
                      {cvData.infos && cvData.infos.map((info, infoIndex) => (
                        <div key={infoIndex} className='flex flex-col w-full gap-3'>
                          <p className='text-3xl font-semibold'>{info.lastname}</p>
                          <p className='text-3xl font-semibold'>{info.firstname}</p>
                          <img
                            className='w-48 h-48 rounded-full object-cover '
                            src={info.photo}
                            alt={`${info.lastname} - ${info.firstname}`} />
                          <p className='text-md'>{info.type_of_contract}</p>
                          <div className="my-5 gap-3">
                            <h3 className='text-xl font-bold mb-5'>Informations personnelles</h3>
                            <p className='text-lg'>Adresse : {info.address}</p>
                            <p className='text-lg'>Ville : {info.city}</p>
                            <p className='text-lg'>Code postal : {info.zipcode}</p>
                            <p className='text-lg'>Pays : {info.state}</p>
                            <p className='text-lg'>Téléphone : {info.phone}</p>
                            <p className='text-lg'>Email : {info.email}</p>
                            <p className='text-lg'>Née le : {info.date_of_birth}</p>
                            <p className='text-lg'>à : {info.place_of_birth}</p>
                          </div>
                        </div>
                      ))}
                      <h3 className='text-lg font-semibold underline w-full mt-8'>Hobbies :</h3>
                      {cvData.hobbies && cvData.hobbies.map((hobby, hobbyIndex) => (
                        <li key={hobbyIndex} className='list-inside list-disc text-md my-3'>
                          {hobby.title_hobby}
                        </li>
                      ))}
                      <h3 className='text-lg font-semibold underline w-full'>Compétences :</h3>
                      {cvData.skills && cvData.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className='list-inside list-disc text-md my-3'>
                          {skill.title_skill}
                        </li>
                      ))}


                      <h3 className='text-lg font-semibold underline w-full'>Langues :</h3>
                      {cvData.languages && cvData.languages.map((language, languageIndex) => (
                        <li key={languageIndex} className='text-md my-3'>
                          <div className="">
                            <li key={languageIndex} className='list-inside list-disc text-md'> 
                              {language.title_language}</li>
                            <p className='text-sm'>Niveau : {language.niveau_language}</p>
                          </div>
                        </li>
                      ))}


                    </div>
                    <div className="w-full p-4 flex flex-col justify-start items-center">
                      <div className="border-4 border-gray-200 rounded-md my-5 p-5 bg-white ">
                        {cvData.infos && cvData.infos.map((info, infoIndex) => (
                          <div key={infoIndex} className='flex flex-col w-full gap-3'>
                            <p className='text-xl'>{info.motivation}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-4 border-gray-200 rounded-md p-5 bg-white ">
                        <h3 className='text-2xl font-semibold underline  w-full flex flex-row justify-center items-center'>Formations :</h3>
                        {cvData.formations && cvData.formations.map((formation, formationIndex) => (
                          <li key={formationIndex} className='flex flex-col text-xl my-3 border-t-4 border-gray-300 pt-2'>
                            <div className="flex flex-row justify-start text-sm">
                              <div className="flex flex-row justify-start items-center gap-3 ml-5">
                                <p className='w-auto '>Du {formation.start_date_of_formation}</p>

                                <p className=' w-auto '> au {formation.end_date_of_formation}</p>
                              </div>

                            </div>
                            <div className="flex flex-row justify-start items-center gap-3 mb-3 ml-5">
                              <div className=" w-auto flex flex-col justify-start items-start">
                                <p className='text-lg'>{formation.description_formation}</p>
                                <p class='mt-2 w-auto text-sm'>Entreprise: {formation.business} à {formation.location_formation}</p>

                              </div>

                            </div>

                          </li>
                        ))}
                      </div>
                      <div className="border-4 border-gray-200 rounded-md mt-4 p-5 bg-white ">
                        <h3 className='text-2xl font-semibold underline  w-full flex flex-row justify-center items-center'>Expériences :</h3>
                        {cvData.experiences && cvData.experiences.map((experience, experienceIndex) => (
                          <li key={experienceIndex} className='flex flex-col text-xl my-3 border-t-4 border-gray-300 pt-2'>
                            <div className="flex flex-row justify-start text-sm">
                              <div className="flex flex-row justify-start items-center gap-3 ml-5">
                                <p className='w-auto '>Du {experience.start_date_of_experience}</p>
                                <p className=' w-auto '> au {experience.end_date_of_experience}</p>
                              </div>
                            </div>


                            <div className="flex flex-row justify-start items-center gap-3 mb-3 ml-5">
                              <div className=" w-auto flex flex-col justify-start items-start">
                                <p className='text-lg'>{experience.description_experience}</p>
                                <p class='mt-2 w-auto text-sm'>Entreprise: {experience.business} à {experience.location_experience}</p>

                              </div>

                            </div>
                          </li>
                        ))}
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