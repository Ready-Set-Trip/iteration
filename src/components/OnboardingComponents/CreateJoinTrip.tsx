// page with "create a trip?" or "have a trip ID already?"
// if trip id, sends to trip page and puts your username in the trip profile board
// if create a trip, send you to trip template

//stretch goal: view old trips? button

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import beach1_icon from '../../assets/beach1.jpg';
import './CreateJoinTrip.css';

const CreateJoinTrip = () => {
  const [tripId, setId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  //handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setError('');
  };
  const handleClick = async () => {
    //check if the id exist or not, if it is exist navigate to grouptrip page
    try {
      console.log('trip id: ', tripId)
      console.log('user id:', userId)
      console.log('json stringify', JSON.stringify({ userId, tripId }))
      const response = await fetch(`/trips/validate-id/${tripId.trim()}`);
      if (!response.ok) {
        console.log('response was ok');
        // after checking the trip ID is valid, tie the userId to the tripId
        try {
          console.log('setting trip for user');
          const res = await fetch(`http://localhost:3000/users/setTrip/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, tripId }),
          });
        } catch (err) {
          console.error(err);
          setError('Something went wrong assigning the user the trip ID.');
        }
        console.log('navigating to group trip page');
        throw new Error('Trip ID not found');
      }

      navigate('/grouptrippage', { state: { tripId } });
    } catch (err) {
      console.error(err);
      setError('Something went wrong fetching the trip ID.');
    }
  };

  return (
    <div className='boxcontainer'>
      <div className='background_pic'>
        <img src={beach1_icon} alt='beach_vacation' />
      </div>
      <div className='createboxcontainer'>
        <div className='createbox'>Create a trip?</div>
        <Link to='/TripTemplate' className='clickme'>
          Click Here
        </Link>
      </div>
      <div className='createboxcontainer'>
        <div className='createbox'>Have a trip ID already?</div>
        <input
          className='inputbox'
          type='text'
          value={tripId}
          onChange={handleChange}
          placeholder='Enter your id'
        />
        <button
          type='button'
          className='clickmego'
          onClick={handleClick}
          disabled={tripId.trim() === ''}
        >
          Go
        </button>
        {error && <p className='errormsg'>{error}</p>}
      </div>
    </div>
  );
};

export default CreateJoinTrip;
