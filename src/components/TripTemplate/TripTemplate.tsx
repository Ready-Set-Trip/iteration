// manages the trip template components.
// after all filled in, submit button will create your trip id
// and send it to your friends (via email link) to come to the site and set up their profiles
import React from 'react';
import './template.css';
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
  // console.log('initial user ID:', userId)
  // console.log('initial trip ID:', tripId)

  //we will handle data input by client,
  // should be ChangeEvent cox we will call onChange event down
  const handleTripnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripName(e.target.value);
  };
  const handleEmail = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEmails = [...emails];
    newEmails[index] = e.target.value;
    setEmails(newEmails);
  };
  //whenever we press invite button, will be handle the submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   console.log('Trip created:', tripName);
    // };
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
    console.log('userId', userId)
    console.log('tripId', tripId)
    console.log('tempTripId', tempTripId)
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
    console.log('trip ID inside handleClick before navigate', tripId)
    if (tripId) {
      navigate('/grouptrippage', { state: { tripId } });
    } else {
      alert('Please create a trip first!');
    }
  };
  return (
    <div className='nametripcontainer'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='tripname'>
          <label>Name Your Trip</label>
          <input
            className='tripnamebox'
            type='text'
            placeholder='Enter your trip name'
            value={tripName}
            onChange={handleTripnameChange}
            required
          />
        </div>

        {tripId && (
          <div className='tripid'>
            New Trip Created! Your Trip ID is:
            <strong className='bold'>{tripId}</strong>
          </div>
        )}
        <div className='invitecontainer'>
          <label> Invite Your Friends</label>
          {emails.map((email, index) => (
            <input
              className='inputbox'
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
          <h5>After you get the id, please go to Group Page</h5>
          <button
            type='button'
            className='direct_to_grouppage'
            onClick={handleClick}
          >
            Group Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripTemplate;
