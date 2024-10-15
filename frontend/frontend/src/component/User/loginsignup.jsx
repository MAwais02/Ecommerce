import React, { useState, useEffect } from 'react';
import './LoginSignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'
import { Userprofile } from '../../statemanagment/UserState';
import { useRecoilState, useRecoilValue } from 'recoil';


const LoginSignup = () => {
  const [userprofile , setUserprofile] = useRecoilState(Userprofile);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = signupData;

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const [error, setError] = useState(null);

  // Check if token exists in cookies and redirect if logged in
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Token is " + JSON.stringify(decodedToken.id)); // Log the user id

      // Define and call the async function
      var res;
      const fetchUserData = async () => {
        try {
          const data = await axios.get('http://localhost:4000/api/v1/me', {
            withCredentials: true, // Ensure cookies are sent with the request
        });
        // console.log("Your user data is " + JSON.stringify(data.data.user)); // this is giving the user details
        setUserprofile(data.data.user); // User Profile data is now setup ThankGod Takes too much time

        //console.log("UserProfile data is " + JSON.stringify(userprofile));

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(); 

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

      // Store token in cookie
      Cookies.set('token', data.token, { expires: 7 }); // Token expires in 7 days

      console.log("Data is " + JSON.stringify(data));
      setUserprofile(data.user); // store user state
      alert('Logged in successfully');
      navigate('/home');
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

      // Store token in cookie
      Cookies.set('token', data.token, { expires: 7 }); // Token expires in 7 days

      setUserprofile(data.user); // store user state


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
