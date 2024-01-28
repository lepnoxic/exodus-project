import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import { FaLeftLong } from 'react-icons/fa6';


const LoginComponent = ({ setCurrentState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username === username && user.password === password) {
      localStorage.removeItem('cartItems');
      navigate('/items');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignup = () => {
    setCurrentState(1);
  };

  const handleBack = () => {
    setCurrentState(0);
  };

  return (
    <div className='flex flex-col bg-slate-700 w-[25vw] h-[60vh] rounded-xl justify-center items-center gap-7'>
      <button onClick={handleBack} className='btn btn-circle absolute top-[27vh] left-[32vh]'>
          <FaLeftLong />
      </button>
      <h2 className="self-center text-4xl">LOGIN</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className='input' />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className='input'/>
      <div className='flex flex-row gap-5'>
        <button onClick={handleLogin} className='btn btn-primary'>LOGIN</button>
        <button onClick={handleSignup} className='btn'>
          GO TO SIGNUP
        </button>
        {error && <ErrorAlert message={error} />}
      </div>
    </div>
  );
};

export default LoginComponent;
