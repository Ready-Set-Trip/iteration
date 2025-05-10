//login page here.
//signup button if no login info yet
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LoginPage.css';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import gshark from '../../assets/gshark.jpg';
import { ValidateForm } from './LoginValidation';
import { generateTripId, decodeTripId } from '../../../server/helperFuncs.ts';

const LoginPage = () => {
  //set up first initial state of our login form,
  // whenever client enter data, we will set the changed state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  //also setError, either email or password should be string according to typescript
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const navigate = useNavigate();
  //we will handle data input by client,
  // should be ChangeEvent cox we will call onChange event down
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    //set the change data, layout previous state by ... prev, name should be the value
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  //whenever we press login button, will be handle the submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = ValidateForm(loginData);
    //first we will set the error by using ValidateForm function
    setErrors(err);
    //if there is no error, we will post request to backend api
    if (!err.email && !err.password) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const message = `Error: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        const userId = data.userId;
        const tripId = data.tripId;
        console.log('data', data);
        console.log('userId', userId);
        console.log('tripId', tripId);
        console.log('response', response);
        // TODO: if user already part of a trip, go to trip page -- test and make sure this is working
        if (tripId) {
          console.log(
            'about to navigate straight from login to group trip page',
            tripId
          );
          const encodedId = generateTripId(tripId);
          navigate(`/GroupTripPage/${encodedId}`, {
            state: { tripId: encodedId }, //Ansara passed state through navigate()
            replace: true,
          }); //Ansara added { replace: true } to replace the current history entry. *This is useful for cases like login redirects, where you don’t want users to be able to use the back button to return to the previous page.
        } else {
          navigate('/CreateJoinTrip', { state: { userId }, replace: true });
        }
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  };

  return (
    <div className='page-wrapper'>
      <img src={gshark} className='gshark' />
      <div className='logcontainer'>
        <form action='' onSubmit={handleSubmit}>
          <div className='logheader'>
            <div className='text'>Log In</div>
            <div className='underline'></div>
          </div>

          <div className='loginput-field'>
            <div className='input'>
              <img src={email_icon} alt='emailIcon' />
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                onChange={handleInput}
              />
              {errors.email && (
                <span className='errordanger'>{errors.email}</span>
              )}
            </div>

            <div className='input'>
              <img src={password_icon} alt='passwordIcon' />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                onChange={handleInput}
              />
              {errors.password && (
                <span className='errordanger'>{errors.password}</span>
              )}
            </div>
          </div>
          <div className='forgot-password'>
            Forgot Password?<span>Click Here</span>
          </div>
          <div className='submit-container'>
            <button type='submit' className='submit-button'>
              Log In
            </button>
            <Link to='/signup' className='submit-button'>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
