// manages the trip template components.
// after all filled in, submit button will create your trip id
// and send it to your friends (via email link) to come to the site and set up their profiles
import React from 'react';
import './template.css';

const TripTemplate = () => {
  return (
    <div className='nametripcontainer'>
      <div className='tripname'>
        <label>Name Your Trip</label>
        <input type='text' placeholder='Enter your trip name'></input>
      </div>
      <div className='invitecontainer'>
        <label> Invite Your Friends</label>
        <input type='email' placeholder='Enter email'></input>
        <input type='email' placeholder='Enter email'></input>
        <input type='email' placeholder='Enter email'></input>
        <input type='email' placeholder='Enter email'></input>
      </div>
    </div>
  );
};

export default TripTemplate;
