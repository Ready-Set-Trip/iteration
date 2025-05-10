import { useState } from 'react';
// import './App.css';
import LoginPage from './components/OnboardingComponents/LoginPage';
import SignUp from './components/OnboardingComponents/SignUp';
import SoloPage from './components/SoloPage/SoloPage';
import GroupTripPage from './components/GroupTripPage/GroupTripPage';
import { Routes, Route } from 'react-router-dom'; //deleted importing BrowserRouter
import CreateJoinTrip from './components/OnboardingComponents/CreateJoinTrip';
import TripTemplate from './components/TripTemplate/TripTemplate';
import TripIdContext from '../src/contexts/TripIdContext';
import UserIdContext from './contexts/UserIdContext';

function App() {
  const [tripId, setTripId] = useState<string | undefined>('');
  const [userId, setUserId] = useState<string | undefined>('');
  return (
    <TripIdContext.Provider value={[tripId, setTripId]}>
      <UserIdContext.Provider value={[userId, setUserId]}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/createJoinTrip' element={<CreateJoinTrip />} />
          <Route path='/tripTemplate' element={<TripTemplate />} />
          <Route path='/solopage' element={<SoloPage />} />
          <Route path='/grouptrippage/*' element={<GroupTripPage />} />
        </Routes>
      </UserIdContext.Provider>
    </TripIdContext.Provider>
  );
}

export default App;
