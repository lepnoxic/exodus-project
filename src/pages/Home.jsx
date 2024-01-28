import React, { useState } from 'react';
import HomeGlobe from '../components/HomeGlobe';
import SignupComponent from '../components/SignupComponent';
import LoginComponent from '../components/LoginComponent';
import { FaChevronDown } from 'react-icons/fa6';
import { MarkGithubIcon } from '@primer/octicons-react';

const width=window.innerWidth;


function Home() {
  const [currentState, setCurrentState] = useState(0);
  const handleSignup = () => {
    setCurrentState(1);
  };
  const handleLogin = () => {
    setCurrentState(2);
  };

  return (
      <div className='flex flex-col h-screen w-screen text-white'>

          {(currentState === 0) && (
          <div className='grow flex flex-col'>
            <div className='grow flex flex-col gap-10 justify-center items-start h-screen pl-[8vw] z-0'>
              <div className='text-6xl'>
                Bluepyter Services
              </div>
              <div className='text-3xl'>
                Travelling around Bluepyter at Mach 3000 
              </div>
              <div className='flex flex-row gap-5'>
                <button className='btn btn-primary' onClick={handleSignup}>
                  Sign Up
                </button>
                <button className='btn btn-primary' onClick={handleLogin}>
                  Log In
                </button>
              </div>
            </div>
            <div className='absolute top-[92vh] left-[50vw]'>
              <FaChevronDown size={32} />
            </div>
            <div className='h-screen w-screen flex flex-col gap-16 justify-center items-center'>
              <div className='text-6xl font-semibold'>
                About Us
              </div>
              <div className='flex flex-row gap-16 items-center'>
                <img src="../../favicon.png" className='rounded-xl h-auto w-[25vw]' />
                <p className='w-[50vw]'>
                At Bluepyter Services, we are your dedicated partner in navigating the challenges of the captivating planet Bluepyter, where even celestial landscapes are not immune to extraordinary circumstances. Similar to the pandemics that have swept across various worlds, our mission is to ensure the well-being of individuals stranded in this entirely new and mysterious environment.
                <br />
                <br />
                Bluepyter Services is committed to delivering a comprehensive range of supplies, from basic necessities to advanced survival gear, making your stay on the planet Bluepyter as comfortable and secure as possible, especially during these challenging times. Our team is driven by a common goal — to serve you, the pioneers of Bluepyter, with dedication and innovation.
                <br />
                <br />
                As we embark on this extraordinary journey together, think of Bluepyter Services not just as a supplier but as your companions on this cosmic adventure, providing support akin to navigating a pandemic on a planetary scale. Connect with us, and let's make your experience on Bluepyter a testament to resilience and adaptability in the face of celestial challenges.
                </p>
              </div>
              <footer className="footer items-center p-4 bg-neutral text-neutral-content">
                <aside className="items-center grid-flow-col">
                  <img src="../../favicon.png" className='rounded-xl h-auto w-8' />
                  <p>Copyright © 2024 - All right reserved</p>
                </aside> 
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                  
                </nav>
              </footer>
            </div>
          </div>
          )}

          {(currentState === 1) && (
            <div className='w-[50vw] h-screen flex flex-col justify-center items-center'>
            <SignupComponent setCurrentState={setCurrentState} />
            </div>
          )}

          {(currentState === 2) && (
            <div className='w-[50vw] h-screen flex flex-col justify-center items-center'>
            <LoginComponent setCurrentState={setCurrentState} />
            </div>
          )}


        <div className='absolute w-[50vw] top-0 left-[50vw]'>
          <HomeGlobe 
            width={width * 0.5}
          />
        </div>
      </div>
  )
}

export default Home