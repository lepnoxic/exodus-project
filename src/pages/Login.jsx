import React from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <div>
        <div>
            Login
        </div>
        <NavLink to="/location">
          <button className='btn'>
            Submit
          </button>
        </NavLink>
    </div>
  )
}

export default Login;