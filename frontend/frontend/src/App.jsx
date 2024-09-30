import React from 'react';
import { Footer } from './component/layout/Footer/Footer'; 
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from "./component/layout/Home/Home.jsx"
import ProductDetails from "./component/products/productdetails.jsx"
import { Loader } from './component/layout/Loader/loader.jsx';


const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product/:id' element={<ProductDetails />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    );
};

export default App; 