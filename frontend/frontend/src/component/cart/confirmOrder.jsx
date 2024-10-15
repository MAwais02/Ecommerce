import React from "react";
import "./confirmOrder.css";
import { shippingInfoState, Cart } from "../../statemanagment/Cartstate";
import { Userprofile } from "../../statemanagment/UserState";
import { useRecoilValue } from "recoil";
import CheckoutSteps from "./checkoutsteps";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material"; // Assuming you're using Material UI
import { Link } from "react-router-dom";

const ConfirmOrder = () => {
    const shippingInfo = useRecoilValue(shippingInfoState);
    const cartItems = useRecoilValue(Cart);
    console.log("CartItem" + JSON.stringify(cartItems));
    let i = 0;
    let p = 0;
    cartItems.map((item)=>{
        i = i + item.quantity;
        p = p + item.price * item.quantity;
    })

    console.log("Items is " + i);
    console.log("Items Price is " + p);
    const user = useRecoilValue(Userprofile);
    const navigate = useNavigate();
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/process/payment');
    };

    return (
        <>
            <CheckoutSteps activeSteps={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography variant="h6">Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography variant="h6">Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="orderSummary">
                        <Typography variant="h6">Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;
