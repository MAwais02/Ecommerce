import React, { useEffect } from 'react';
import { Footer } from './component/layout/Footer/Footer'; 
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from "./component/layout/Home/Home.jsx"
import AboutPage from "./component/layout/About/About.jsx"
import ProductDetails from "./component/products/productdetails.jsx"
import  Loader from './component/layout/Loader/loader.jsx';
import Header from './component/layout/Header/Header.jsx';
import AllProducts from './component/Allproducts/AllProducts.jsx'
import SearchProduct from './component/products/seaarch.jsx'
import LoginSignUp from './component/User/loginsignup.jsx';
import UserOptions from '../src/component/layout/Header/UserOptions.jsx'
import { Userprofile , UserInformation} from './statemanagment/UserState.jsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserProfile from './component/User/userprofile.jsx'
import CartComponent from './component/cart/cart.jsx'
import Shipping from "./component/cart/shipping.jsx"
import ConfirmOrder from "./component/cart/confirmOrder.jsx"
import ProcessPayment from "./component/cart/processpayment.jsx"
import Orders from "./component/cart/order.jsx"
import OrderDetails from "./component/cart/orderDetails.jsx"
import Dashboard from "./component/admin/dashboard.jsx"
import ProductList from "./component/admin/ProductList.jsx"
import UpdateProduct from "./component/admin/UpdateProduct.jsx"
import NewProduct from "./component/admin/newproduct.jsx"
import GetAllOrders from './component/admin/getallproduct.jsx'
import GetAllUsers from './component/admin/getallusers.jsx'
import ContactUs from './component/layout/contactUs/contactsus.jsx'
const App = () => {
    const userprofile = useRecoilValue(Userprofile);
    return (
      <BrowserRouter>
      <Header />
      <UserOptions />
        <Routes>
          <Route path='/' element={<LoginSignUp />}></Route>
          <Route path='contact' element={<ContactUs />} />
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/product/:id' element={<ProductDetails />}></Route>
          <Route path='/product/search/:keyword' element={<SearchProduct/>}></Route>
          <Route path='/products' element={<AllProducts />}></Route>
          <Route path='/me' element={<UserOptions />} />
          <Route path='/account' element={<UserProfile user={userprofile}/>} />
          <Route path='/cart' element={<CartComponent />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          <Route path='/process/payment' element={<ProcessPayment />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/admin/dashboard" element={<Dashboard />}/>
          <Route path='/admin/products' element={<ProductList />} />
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
          <Route path='/admin/product/new' element={<NewProduct />} /> 
          <Route path='/admin/orders' element={<GetAllOrders />} /> 
          <Route path='/admin/users' element={<GetAllUsers />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    );
};

export default App; 