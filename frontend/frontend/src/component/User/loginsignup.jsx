// src/components/Auth/LoginSignup.js

import React, { useState, useEffect } from 'react';
import './LoginSignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import axios from 'axios';

const LoginSignup = () => {
  const navigate = useNavigate();

  // State for toggling between Login and Signup
  const [isLogin, setIsLogin] = useState(true);

  // State for Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for Signup Form
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = signupData;

  // Avatar State
  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  // Error State
  const [error, setError] = useState(null);

  // Effect to handle redirection on successful authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  // Handle Login Form Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/v1/login', 
        { email: loginEmail, password: loginPassword },
        config
      );

      localStorage.setItem('token', data.token);
      alert('Logged in successfully');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  // Handle Signup Form Submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      myForm.set('name', name);
      myForm.set('email', email);
      myForm.set('password', password);
      myForm.set('avatar', avatar);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/v1/register', 
        myForm,
        config
      );

      localStorage.setItem('token', data.token);
      alert('Registered successfully');
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  // Handle Signup Input Changes
  const handleSignupDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) { // 2 means done 
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        {/* Toggle Button */}
        <button
          className="toggle-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>

        {/* Conditional Rendering of Forms */}
        {isLogin ? (
          // Login Form
          <div className="form login-form">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="input-field">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot" className="forgot-password">
                Forgot Password?
              </Link>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        ) : (
          // Signup Form
          <div className="form signup-form">
            <h2>Register</h2>
            <form onSubmit={handleSignupSubmit} encType="multipart/form-data">
              <div className="input-field">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={handleSignupDataChange}
                />
              </div>
              <div className="input-field">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleSignupDataChange}
                />
              </div>
              <div className="input-field">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={handleSignupDataChange}
                />
              </div>

              <div className="avatar-section">
                <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleSignupDataChange}
                />
              </div>
              <button type="submit" className="btn">
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
