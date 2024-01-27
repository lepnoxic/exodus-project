import React from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import HomeGlobe from '../components/HomeGlobe';
import { NavLink } from 'react-router-dom';

const width=window.innerWidth;

function Home() {
  return (
    <div className=''>
      <div className='flex h-screen w-screen text-white'>
        <div className='grow flex flex-col gap-10 justify-center items-start ml-40   z-0'>
          <div className='text-6xl'>
            Company Name
          </div>
          <div className='flex flex-row gap-5'>
            <NavLink to="/Signup">
              <button className='btn'>
                Sign Up
              </button>
            </NavLink>
            <NavLink to="/Login">
              <button className='btn' >
                Log In
              </button>
            </NavLink>
          </div>
          <div className='text-3xl'>
            Announcements
          </div>
        </div>
        <div className='w-[50vw]'>
          <HomeGlobe 
            width={width * 0.5}
          />
        </div>
      </div>
    </div>
  )
}

export default Home