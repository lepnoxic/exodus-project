import React, { useState } from 'react';
import SuccessAlert from './SuccessAlert';
import { FaLeftLong } from 'react-icons/fa6';

const SignupComponent = ({ setCurrentState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);


  const handleSignup = () => {
    // Implement code to store username and password in local JSON file
    // For simplicity, you can use localStorage or sessionStorage
    localStorage.setItem('user', JSON.stringify({ username, password }));
    // Optionally, you can redirect to login page
    setSubmit(true);
  };

  const handleLogin = () => {
    setCurrentState(2);
  };

  const handleBack = () => {
    setCurrentState(0);
  };

  return (
    <div className='flex flex-col bg-slate-700 w-[25vw] h-[60vh] rounded-xl justify-center items-center gap-7'>
      <button onClick={handleBack} className='btn btn-circle absolute top-[27vh] left-[32vh]'>
          <FaLeftLong />
      </button>
      <h2 className="self-center text-4xl">SIGN UP</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className='input' />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className='input'/>
      <div className='flex flex-row gap-5'>
        <button onClick={handleSignup} className='btn btn-primary'>SUBMIT</button>
        {submit && <SuccessAlert message="Signed Up Successfully" />}
        <button onClick={handleLogin} className='btn'>
          GO TO LOGIN
        </button>
      </div>
    </div>
  );
};

export default SignupComponent;
