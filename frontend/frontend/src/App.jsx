import React, { useEffect } from 'react';
import { Footer } from './component/layout/Footer/Footer'; 
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from "./component/layout/Home/Home.jsx"
import ProductDetails from "./component/products/productdetails.jsx"
import { Loader } from './component/layout/Loader/loader.jsx';
import Header from './component/layout/Header/Header.jsx';
import AllProducts from './component/Allproducts/AllProducts.jsx'
import SearchProduct from './component/products/seaarch.jsx'
import LoginSignUp from './component/User/loginsignup.jsx';
import UserOptions from '../src/component/layout/Header/UserOptions.jsx'
const App = () => {
  useEffect({

  },[])
    return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<LoginSignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/product/:id' element={<ProductDetails />}></Route>
          <Route path='/product/search/:keyword' element={<SearchProduct/>}></Route>
          <Route path='/products' element={<AllProducts />}></Route>
          <Route path='/me' element={<UserOptions />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    );
};

export default App; 