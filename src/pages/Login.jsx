import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import SignupComponent from '../components/SignupComponent';


const Login = () => {
  return (
    <div className='grow flex flex-row h-screen p-5 gap-20 justify-center items-center'>
        <div id="signup" className="bg-slate-600 flex flex-col h-full rounded-lg justify-center items-center w-[40vw]">
          <SignupComponent />
        </div>
        <div id="login" className='bg-slate-600 flex flex-col h-full rounded-lg justify-center items-center w-[40vw]'>
          <div>
          <LoginComponent />
          </div>
        </div>
    </div>
  )
}

export default Login;