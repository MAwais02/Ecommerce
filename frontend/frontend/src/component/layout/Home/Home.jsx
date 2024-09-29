import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";

import "./Home.css"
import Product from "./Product.jsx"

import { getproduct } from "../../../actions/productaction.jsx"
import {useSelector , useDispatch} from "react-redux"

const product = {
    name : "Nike under",
    Image : [{url : "https://img.freepik.com/free-photo/simple-black-t-shirt-worn-by-man_53876-102772.jpg?t=st=1727599344~exp=1727602944~hmac=fcd47894ab61c19da9930192d50932424b814e63670f8894355099ec6e69f469&w=740"}],
    price : "$300",
    _id : "Awais",
}
const Home = () => {
    const dispatch = useDispatch();
    const {loading , error , products , productsCount} = useSelector(
        (state) => state.products
    )

    useEffect(()=>{
        dispatch(getproduct());
    },[dispatch])
    return <>
        <div className="banner">
            <p>Welcome to Ecommerce Store</p>
            <h1>Find amazing products below</h1>
            <a href="#container">
                <button>Scroll Below <CgMouse /> </button>
            </a>
        </div>

        <h2 className="homeheading">Featured Products</h2>


        <div className="container" id="container">
            {products && products.map(product =>{
                <Product product={product} />
            })}
        </div>
    </>
}

export default Home