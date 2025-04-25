//login page here.
//signup button if no login info yet
import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
const LoginPage = () => {
  return (
    <div className='page-wrapper'>
      <div className='logcontainer'>
        <form action=''>
          <div className='logheader'>
            <div className='text'>Log In</div>
            <div className='underline'></div>
          </div>

          <div className='loginput-field'>
            <div className='input'>
              <img src={email_icon} alt='emailIcon' />
              <input type='email' name='email' id='email' placeholder='Email' />
            </div>
            <div className='input'>
              <img src={password_icon} alt='passwordIcon' />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
              />
            </div>
          </div>
          <div className='forgot-password'>
            Forgot Password?<span>Click Here</span>
          </div>
          <div className='submit-container'>
            <button className='submit'>Log In</button>
            <Link to='/signup' className='submit'>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
