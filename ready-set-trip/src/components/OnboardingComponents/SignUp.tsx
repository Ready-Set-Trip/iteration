import React, { useState } from 'react';
import './Onboarding.css';
import { Link, useNavigate } from 'react-router-dom';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import { ValidateFormForSignUp } from './SignUpValidation';
import beachVid from '../../assets/beachVid.mp4';

const SignUp = () => {
  //set up first initial state of our login form,
  // whenever client enter data, we will set the changed state
  const [signupData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });
  //also setError, either email or password should be string according to typescript
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();
  //we will handle data input by client,
  // should be ChangeEvent cox we will call onChange event down
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    //set the change data, layout previous state by ... prev, name should be the value
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  //whenever we press login button, will be handle the submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = ValidateFormForSignUp(signupData);
    //first we will set the error by using ValidateForm function
    setErrors(err);
    //if there is no error, we will post request to backend api
    if (!err.name && !err.email && !err.password) {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        });

        if (!response.ok) {
          const message = `Error: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        navigate('/');
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  };

  return (
    <div className='page-wrapper'>
      <video className='beachVid' autoPlay loop muted>
        <source src={beachVid} type='video/mp4' />
      </video>
      <div className='container'>
        <form action='' onSubmit={handleSubmit}>
          <div className='header'>
            <div className='text'>Sign Up</div>
            <div className='underline'></div>
          </div>

          <div className='input-field'>
            <div className='input'>
              <img src={user_icon} alt='userIcon' />
              <input type='text' name='name' id='name' placeholder='Name' onChange={handleInput} />
              {errors.name && <span className='errordanger'>{errors.name}</span>}
            </div>
            <div className='input'>
              <img src={email_icon} alt='emailIcon' />
              <input type='email' name='email' id='email' placeholder='Email' onChange={handleInput} />
              {errors.email && <span className='errordanger'>{errors.email}</span>}
            </div>
            <div className='input'>
              <img src={password_icon} alt='passwordIcon' />
              <input type='password' name='password' id='password' placeholder='Password' onChange={handleInput} />
              {errors.password && <span className='errordanger'>{errors.password}</span>}
            </div>
          </div>

          <div className='submit-container'>
            <button type='submit' className='submit-button'>
              Sign Up
            </button>
            <Link to='/' className='faded-submit-button'>
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
