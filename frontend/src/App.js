import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { CreateCv, Dashboard, Home, Info, Login, Register } from "./pages";
import CreateInfo from "./components/curriculumCreate/CreateInfo";
import CreateHobby from "./components/curriculumCreate/CreateHobby";
import CreateSkill from "./components/curriculumCreate/CreateSkill";
import CreateLangue from "./components/curriculumCreate/CreateLangue";
import CreateFormation from "./components/curriculumCreate/CreateFormation";
import CreateExperience from "./components/curriculumCreate/CreateExperience";
import Detail from "./pages/Detail";
import ProtectedRoute from "./utils/ProtectedRoute";

import ListDeleteInfo from './components/curriculumListDelete/ListDeleteInfo';
import ListDeleteHobby from './components/curriculumListDelete/List_Delete_Hobby';
import ListDeleteSkills from './components/curriculumListDelete/List_Delete_Skill';
import ListDeleteLanguages from './components/curriculumListDelete/List_Delete_Langue';
import ListDeleteExperiences from './components/curriculumListDelete/List_Delete_Experience';
import ListDeleteFormations from './components/curriculumListDelete/List_Delete_Formation';
import FilePdf from './components/generatePDF/FilePdf';
import File2Pdf from './components/generatePDF/File2Pdf';
import File3Pdf from './components/generatePDF/File3Pdf';

import UpdateCv from './pages/UpdateCv';


const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/info" element={<Info />} />

        {/* Routes protégées */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/detail-cv/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
        <Route path="/create-cv" element={<ProtectedRoute><CreateCv /></ProtectedRoute>} />


        <Route path="/info/create" element={<ProtectedRoute><CreateInfo /></ProtectedRoute>} />

        <Route path="/hobbie/create" element={<ProtectedRoute><CreateHobby /></ProtectedRoute>} />
        <Route path="/skill/create" element={<ProtectedRoute><CreateSkill /></ProtectedRoute>} />
        <Route path="/language/create" element={<ProtectedRoute><CreateLangue /></ProtectedRoute>} />
        <Route path="/formation/create" element={<ProtectedRoute><CreateFormation /></ProtectedRoute>} />
        <Route path="/experience/create" element={<ProtectedRoute><CreateExperience /></ProtectedRoute>} />


        <Route path="/info/list/:id" element={<ProtectedRoute><ListDeleteInfo/></ProtectedRoute>} />
        <Route path='/update/:id' element={<ProtectedRoute><UpdateCv /></ProtectedRoute>} /> 

        <Route path="/hobbies/list" element={<ProtectedRoute><ListDeleteHobby/></ProtectedRoute>} />
        <Route path="/skills/list" element={<ProtectedRoute><ListDeleteSkills /></ProtectedRoute>} />
        <Route path="/languages/list" element={<ProtectedRoute><ListDeleteLanguages /></ProtectedRoute>} />
        <Route path="/experiences/list" element={<ProtectedRoute><ListDeleteExperiences /></ProtectedRoute>} />
        <Route path="/formations/list" element={<ProtectedRoute><ListDeleteFormations /></ProtectedRoute>} />


        <Route path="/pdf/:id" element={<ProtectedRoute><FilePdf /></ProtectedRoute>} />
        <Route path="/pdf2/:id" element={<ProtectedRoute><File2Pdf /></ProtectedRoute>} />
        <Route path="/pdf3/:id" element={<ProtectedRoute><File3Pdf /></ProtectedRoute>} />



        
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;