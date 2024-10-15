import React from "react";

import playstore from '../../../assets/playstore.png';
import AppStore from "../../../assets/AppStore.png";

import "./footer.css";

export const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download Our App</h4>
                <p>Get the app for Android and iOS devices.</p>
                <div className="storeIcons">
                    <img src={playstore} alt="Playstore" />
                    <img src={AppStore} alt="App Store" />
                </div>
            </div>

            <div className="middleFooter">
                <h1>ECOMMERCE</h1>
                <p>Your satisfaction is our priority.</p>
                <p>&copy; 2021 DiSparta - All rights reserved</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
                <a href="#">Facebook</a>
            </div>
        </footer>
    );
};
