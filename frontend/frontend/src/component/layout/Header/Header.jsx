import React, { useState } from 'react';
import './Header.css';
import {ProductKeyword} from "../../../statemanagment/state"
import { useRecoilState } from 'recoil';
import SearchProduct from "../../products/seaarch"
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {

  const [keyword , setKyword] = useRecoilState(ProductKeyword);

  const [searchTerm, setSearchTerm] = useState('');
  const naviagte = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setKyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchTerm);
    naviagte(`products`)
  };

  return (
    <header className="header">
      <div className="logo">
        <h2>Ecommerce</h2>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="search-container"> {/* Wrapper for centering */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
