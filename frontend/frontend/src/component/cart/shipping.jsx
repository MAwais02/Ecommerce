import React, { useState, useEffect, Fragment } from "react";
import "./Shipping.css";
import { atom, useRecoilState } from "recoil";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./checkoutsteps.jsx"
import {shippingInfoState} from "../../statemanagment/Cartstate.jsx"
import { useNavigate } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Shipping = () => {
    const [shippingInfo, setShippingInfo] = useRecoilState(shippingInfoState);
    const [states, setStates] = useState([]); // State to hold the list of states
    const navigate = useNavigate();
    // Update states whenever country changes
    useEffect(() => {
        if (shippingInfo.country) {
            const fetchedStates = State.getStatesOfCountry(shippingInfo.country);
            setStates(fetchedStates);
        } else {
            setStates([]); // Reset states if no country is selected
        }
    }, [shippingInfo.country]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { address, city, state, country, phonenumber , pincode} = shippingInfo;

        if (!address || !city || !state || !country || !phonenumber || !pincode) {

            return;
        }
        console.log(shippingInfo);
        // You can proceed with the next steps in your workflow
        navigate('/order/confirm');

    };

    return (
        <Fragment>
            <CheckoutSteps activeSteps={0} />
            <div className="shippingContainer">
                <form onSubmit={handleSubmit}>
                    <div className="shippingForm">
                        <h2>Shipping Information</h2>
                        <div>
                            <PinDropIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={shippingInfo.address}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={shippingInfo.city}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                            />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <select
                                required
                                value={shippingInfo.state}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={shippingInfo.country}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                            >
                                <option value="">Select Country</option>
                                {Country.getAllCountries().map((country) => (
                                    <option key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <PhoneIcon />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                required
                                value={shippingInfo.phone}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, phonenumber: e.target.value }))}
                            />
                        </div>
                        <div>
                            <LocationOnIcon />
                            <input
                                type="text"
                                placeholder="Pincode"
                                required
                                value={shippingInfo.pincode}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, pincode: e.target.value }))}
                            />
                        </div>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};
export default Shipping;
