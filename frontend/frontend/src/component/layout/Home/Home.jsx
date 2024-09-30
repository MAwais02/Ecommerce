import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import Product from "./Product.jsx"
import {fetchbackenddata} from "../../../statemanagment/state.jsx"
import { productIDAtom } from "../../../statemanagment/state.jsx"; // setting product if for future use

import { useRecoilState, useRecoilValue } from "recoil";
const Home = () => {

    const { products , success } = useRecoilValue(fetchbackenddata);

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
            {success && products && products.map((product) => (
                <Product product={product} />
            ))}
        </div>
    </>
}

export default Home