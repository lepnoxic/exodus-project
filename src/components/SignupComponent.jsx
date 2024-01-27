import React, { useState } from 'react';

const SignupComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Implement code to store username and password in local JSON file
    // For simplicity, you can use localStorage or sessionStorage
    localStorage.setItem('user', JSON.stringify({ username, password }));
    // Optionally, you can redirect to login page
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupComponent;
