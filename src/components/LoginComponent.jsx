import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';

const LoginComponent = () => {
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

  return (
    <div className='flex flex-col'>
      <div className='card bg-base-300 h-12 text-center flex justify-center items-center rounded-none rounded-t-lg'><h2>LOGIN</h2></div>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className='input rounded-none'/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className='input rounded-none'/>
      <button onClick={handleLogin} className='btn rounded-none btn-success rounded-b-lg'>LOG IN</button>
      {error && <ErrorAlert message={error} />}
    </div>
  );
};

export default LoginComponent;
