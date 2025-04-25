// user signup!
// link back to login page after signup
import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';

const SignUp = () => {
  return (
    <div className='page-wrapper'>
      <div className='container'>
        <form action=''>
          <div className='header'>
            <div className='text'>Sign Up</div>
            <div className='underline'></div>
          </div>

          <div className='input-field'>
            <div className='input'>
              <img src={user_icon} alt='userIcon' />
              <input type='text' name='name' id='name' placeholder='Name' />
            </div>
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

          <div className='submit-container'>
            <div className='submit'>Sign Up</div>
            <Link to='/' className='submit'>
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
