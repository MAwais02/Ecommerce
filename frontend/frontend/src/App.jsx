import React from 'react';
import { Footer } from './component/layout/Footer/Footer'; 
import { BrowserRouter , Route , Routes } from 'react-router-dom';

import Home from "./component/layout/Home/Home.jsx"
const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    );
};

export default App; 