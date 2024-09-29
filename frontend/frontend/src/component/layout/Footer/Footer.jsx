import React from "react";

import playstore from '../../../assets/playstore.png'
import AppStore from "../../../assets/AppStore.png"

import "./footer.css"
export const Footer = () =>{
    return (
        <>
            <footer id="footer">
                <div className="leftfooter">
                    <h4>Download our app</h4>
                    <p>Download App for andriod and ios mobile phone</p>
                    <img src={playstore} alt="playstore" />
                    <img src={AppStore} alt="Appstore" />
                </div>
                <div className="middlefooter">
                    <h1>ECOMMERCE</h1>
                    <p>High Quality is our first priority</p>

                    <p>CopyRight 2021 &copy; DiSparta</p>
                </div>
                <div className="rightfooter">
                    <h4>Follow us</h4>
                    <a href="">Instagram</a>
                    <a href="">Youtube</a>
                    <a href="">Facebook</a>
                </div>

            </footer>
        </>
    )
}