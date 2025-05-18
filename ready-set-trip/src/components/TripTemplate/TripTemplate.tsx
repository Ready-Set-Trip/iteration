// manages the trip template components.
// after all filled in, submit button will create your trip id
// and send it to your friends (via email link) to come to the site and set up their profiles
import React from 'react';
import './template.css';
import beachChairs from '../../assets/beach_chairs.jpg';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TripTemplate = () => {
  const [tripName, setTripName] = useState('');
  const [emails, setEmails] = useState(['', '', '', '']);
  const [tripId, setTripId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;
  let tempTripId;

  //we will handle data input by client,
  // should be ChangeEvent cox we will call onChange event down
  const handleTripnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripName(e.target.value);
  };
  const handleEmail = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmails = [...emails];
    newEmails[index] = e.target.value;
    setEmails(newEmails);
  };
  //whenever we press invite button, will be handle the submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      tripName,
      emails: emails.filter((email) => email.trim() !== ''),
    };
    try {
      const response = await fetch('http://localhost:3000/trips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json(); //recieved id from backend
      tempTripId = data.tripId;
      setTripId(data.tripId);
      console.log("Trip created and here's ur id:", data.tripId);
    } catch (error) {
      console.error('Create trip:', error);
      throw error;
    }
    // TODO use tripId and userId to add user to the trip on the backend
    console.log('userId', userId);
    console.log('tripId', tripId);
    console.log('tempTripId', tempTripId);
    try {
      const response = await fetch('http://localhost:3000/users/setTrip', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, tempTripId }),
      });

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error setting newly created trip on user:', error);
      throw error;
    }
  };
  const handleClick = () => {
    console.log('trip ID inside handleClick before navigate', tripId);
    if (tripId) {
      navigate('/grouptrippage', { state: { tripId } });
    } else {
      alert('Please create a trip first!');
    }
  };
  return (
    <div className='tt-page-wrapper'>
      <div className='tt-background-image'>
        <img src={beachChairs} alt='Beach vacation' />
      </div>
      {!tripId && (
        <form className='form-card' onSubmit={handleSubmit}>
          <div className='tripname-container'>
            <label>What's Your Trip Called?</label>
            <div className='underline'></div>
            <input
              className='tripname-input-box'
              type='text'
              placeholder='Enter a trip name'
              value={tripName}
              onChange={handleTripnameChange}
              required
            />
          </div>
          <div className='invite-container'>
            <label> Invite Your Friends</label>
            <div className='underline'></div>
            {emails.map((email, index) => (
              <input
                className='email-input-box'
                key={index}
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => handleEmail(index, e)}
              />
            ))}
            <button type='submit' className='invitebutton'>
              Send Invite
            </button>
          </div>
        </form>
      )}
      {tripId && (
        <div className='form-card'>
          <div className='tripid'>
            New Trip Created! Your Trip ID is:
            <strong>{tripId}</strong>
            <h5>Take me to my group's page!</h5>
            <button type='button' className='direct_to_grouppage' onClick={handleClick}>
              Ready, Set, Trip!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripTemplate;
