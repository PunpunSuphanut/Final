import React, { useState } from 'react';
import './SignUp.css';

const SignUp = ({ onSignUp, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      onSignUp(username, password);
      switchToLogin();
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label className="signup-label">
        Username:
        <input className="signup-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="signup-label">
        Password:
        <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="signup-label">
        Confirm Password:
        <input className="signup-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      {error && <p className="signup-error">{error}</p>}
      <button className="signup-button" type="submit">Sign Up</button>
      <p className="switch-form" onClick={switchToLogin}>Already have an account? Log in</p>
    </form>
  );
};

export default SignUp;
