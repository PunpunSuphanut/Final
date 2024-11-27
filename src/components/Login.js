import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="login-label">
        Username:
        <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="login-label">
        Password:
        <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="login-button" type="submit">Login</button>
    </form>
  );
};

export default Login;
