import React, { useState } from 'react';
import HomeGlobe from '../components/HomeGlobe';
import SignupComponent from '../components/SignupComponent';
import LoginComponent from '../components/LoginComponent';

const width=window.innerWidth;


function Home() {
  const [currentState, setCurrentState] = useState(0);
  const handleClick = () => {
    setCurrentState(1);
  };

  return (
      <div className='flex h-screen w-screen text-white'>
        <div className='w-[50vw] flex justify-center items-center'>

          {(currentState === 0) && (<div className='grow flex flex-col gap-10 justify-center items-start ml-40   z-0'>
            <div className='text-6xl'>
              Bluepyter Services
            </div>
            <div className='text-3xl'>
              Travelling around Bluepyter at Mach 3000 
            </div>
            <div className='flex flex-row gap-5'>
              <button className='btn btn-primary' onClick={handleClick}>
                Sign Up | Log In
              </button>
            </div>
          </div>)}

          {(currentState === 1) && (<div className='flex flex-row gap-24'>
            <SignupComponent />
            <LoginComponent />
            </div>
          )}
        </div>

        <div className='w-[50vw]'>
          <HomeGlobe 
            width={width * 0.5}
          />
        </div>
      </div>
  )
}

export default Home