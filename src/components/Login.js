import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, loginError, switchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
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
      {loginError && <p className="login-error">{loginError}</p>}
      <button className="login-button" type="submit">Login</button>
      <p className="switch-form" onClick={switchToSignUp}>Don't have an account? Sign Up</p>
    </form>
  );
};

export default Login;
