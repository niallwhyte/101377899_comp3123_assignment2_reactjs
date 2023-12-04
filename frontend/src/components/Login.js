import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });

  const handleChanges = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  // Submit btn handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', loginInput, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      // Assuming your server responds with user data upon successful login
      onLogin(response.data);

      // Clear the login form
      setLoginInput({ username: '', password: '' });
    } catch (error) {
      console.error(error.response.data);
      // Handle login error, show a message or redirect to an error page
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={loginInput.username}
            onChange={handleChanges}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginInput.password}
            onChange={handleChanges}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;