import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MyOrders } from "../../statemanagment/order";
import './OrderDetails.css'; // Importing CSS file

const OrderDetails = () => {
    const { id } = useParams(); // Get the order ID from the URL
    const orders = useRecoilValue(MyOrders); // Fetch orders from Recoil state

    // Find the order by ID
    const order = orders.order.find((order) => order._id === id);

    if (!order) {
        return <p>Order not found</p>;
    }

    return (
        <div className="order-details-container">
            <h1 className="order-details-title">Order Details</h1>
            <div className="order-details-section">
                <h2>Shipping Information</h2>
                <p>Address: {order.shippinginfo.address}</p>
                <p>City: {order.shippinginfo.city}</p>
                <p>State: {order.shippinginfo.state}</p>
                <p>Country: {order.shippinginfo.country}</p>
                <p>Pincode: {order.shippinginfo.pincode}</p>
            </div>

            <div className="order-details-section">
                <h2>Payment Information</h2>
                <p>Payment Status: {order.paymentinfo.status}</p>
                <p>Payment ID: {order.paymentinfo.id}</p>
                <p>Total Price: ${order.totalprice}</p>
            </div>

            <div className="order-details-section">
                <h2>Order Status</h2>
                <p>Status: {order.orderstatus}</p>
            </div>

            <div className="order-details-section">
                <h2>Ordered Products</h2>
                {order.orderitems.map((item, index) => (
                    <div key={index} className="order-item">
                        <p>Product: {item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;
