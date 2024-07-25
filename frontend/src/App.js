import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { CreateCv, Dashboard, Home, Info, Login, Register } from "./pages";

import Detail from "./service/Detail";
import ProtectedRoute from "./utils/ProtectedRoute";
import NavBar from './components/NavBar';



import FilePdf from './components/generatePDF/FilePdf';
import File2Pdf from './components/generatePDF/File2Pdf';
import File3Pdf from './components/generatePDF/File3Pdf';

import UpdateCv from './service/UpdateCv';
import Footer from './components/Footer';


const App = () => (
  <Router>
    <AuthProvider>
    <NavBar />
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
        <Route path='/update/:id' element={<ProtectedRoute><UpdateCv /></ProtectedRoute>} /> 
        <Route path="/pdf/:id" element={<ProtectedRoute><FilePdf /></ProtectedRoute>} />
        <Route path="/pdf2/:id" element={<ProtectedRoute><File2Pdf /></ProtectedRoute>} />
        <Route path="/pdf3/:id" element={<ProtectedRoute><File3Pdf /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </AuthProvider>
  </Router>
);

export default App;