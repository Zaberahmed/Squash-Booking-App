import React from 'react';
import { Link } from 'react-router-dom';
import LandingImage from './../../assets/LandingImage.jpg';

function Landing() {
  return (
    <div>
      <h2 className='font-bold text-3xl mt-16'>Book a Squash Court</h2>
      <br />
      <p>Challenge your friend and play together a game of squash</p>
      <br />
      <img src={LandingImage} alt='Squash playing logo' />

      <br />
      <br />
      <Link to='/register' className='rounded-full bg-orange-400 p-4'>
        Sign Up for an Account
      </Link>
      <br />
      <p>Already a member?</p>
      <Link to='/login' className='rounded-full bg-orange-400 p-4'>
        login
      </Link>
    </div>
  );
}

export default Landing;
