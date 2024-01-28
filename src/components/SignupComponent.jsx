import React, { useState } from 'react';
import SuccessAlert from './SuccessAlert';

const SignupComponent = () => {
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

  return (
    <div className='flex flex-col'>
      <div className="card bg-base-300 h-12 text-center flex justify-center items-center rounded-none rounded-t-lg">
          <h2 className="">SIGNUP</h2>
      </div>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className='input rounded-none' />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className='input rounded-none'/>
      <button onClick={handleSignup} className='btn rounded-none btn-primary rounded-b-lg'>SUBMIT</button>
      {submit && <SuccessAlert message="Signed Up Successfully" />}
    </div>
  );
};

export default SignupComponent;
