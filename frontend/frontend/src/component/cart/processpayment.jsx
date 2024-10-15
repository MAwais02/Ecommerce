import React, { useState } from "react";
import "./processPayment.css";
import CheckoutSteps from "./checkoutsteps"; // Ensure this component is working
import { useRecoilValue } from "recoil";
import { Cart , shippingInfoState } from "../../statemanagment/Cartstate";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
const ProcessPayment = () => {
    const [cartItems, setCartItems] = useRecoilState(Cart);  
    const ship = useRecoilValue(shippingInfoState);
    console.log("Shipping ingdo " + ship);
    const orders = useRecoilValue(Cart);
    const navigate = useNavigate();
    console.log("CartItem" + JSON.stringify(cartItems));
    let i = 0;
    let p = 0;
    cartItems.map((item) => {
        i = i + item.quantity;
        p = p + item.price * item.quantity;
    })

    console.log("Items is " + i);
    console.log("Items Price is " + p);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const handlePaymentSelection = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            alert("Please select a payment method to proceed.");
            return;
        }
        alert(`Order has been placed ! Thank You reaching`);
        setCartItems(null);
        let i = 0;
        let p = 0;
        orders.map((item) => {
            i = i + item.quantity;
            p = p + item.price * item.quantity;
        })

        const orderData = {
            itemsprice: i,
            taxPrice: 0.18 * p, // 18 percent gst
            shippingprice: (p > 1000) ? 0 : 300,
            totalprice: i + 0.80 * p + (p > 1000) ? 0 : 300,

            orderitems: orders,
            shippinginfo: ship,

            paymentinfo: {
                id: "sample paymentInfo",
                status: "succeeded"
            }
        };

        const sendOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(JSON.stringify(orderData));
                const response = await axios.post('http://localhost:4000/api/v1/order/new', orderData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                console.log("Order placed successfully:", response.data);
            } catch (error) {
                console.error("Error placing order:", error.response ? error.response.data : error.message);
            }
        };
        sendOrder();

        navigate("/orders")
    };
    return (
        <>
            <CheckoutSteps activeStep={2} />
            <div className="processPaymentContainer">
                <h2 className="title">Payment Method</h2>

                <form onSubmit={handleSubmit} className="paymentForm">
                    <div className="paymentOption">
                        <input
                            type="radio"
                            id="creditCard"
                            name="paymentMethod"
                            value="Credit Card"
                            onChange={handlePaymentSelection}
                            required
                        />
                        <label htmlFor="creditCard">Credit Card</label>
                    </div>

                    <div className="paymentOption">
                        <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="PayPal"
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>

                    <div className="paymentOption">
                        <input
                            type="radio"
                            id="cashOnDelivery"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="cashOnDelivery">Cash on Delivery</label>
                    </div>

                    <button type="submit" className="submitPaymentButton">
                        Proceed to Payment
                    </button>
                </form>

                <div className="orderSummary">
                    <h3>Order Summary</h3>
                    <p>No of products : {i}</p>
                    <p>Items: ${p}</p>
                    <p>Shipping: $0</p>
                    <p><strong>Total: ${p}</strong></p>
                </div>
            </div>
        </>
    );
}
export default ProcessPayment