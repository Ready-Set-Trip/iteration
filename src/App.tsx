import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import LoginPage from './components/OnboardingComponents/LoginPage';
import SignUp from './components/OnboardingComponents/SignUp';
import SoloPage from './components/SoloPage/SoloPage';
import GroupTripPage from './components/GroupTripPage/GroupTripPage'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/solopage' element={<SoloPage />} />
      <Route path='/grouptrippage' element={<GroupTripPage tripName="Cancun" tripGoals={{ workout: 10, diet: 10, language: 5}}/>} />
    </Routes>
  );
}

export default App;
