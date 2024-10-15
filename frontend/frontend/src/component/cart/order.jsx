import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { MyOrders } from "../../statemanagment/order";
import { Link } from "react-router-dom"; 
import { Button } from "@mui/material"; 
import './Orders.css'; 
import Loader from "../layout/Loader/loader.jsx";
const OrdersContent = () => {
    const orders = useRecoilValue(MyOrders); 

    return (
        <div className="orders-container">
            <h1 className="orders-title">My Orders</h1>
            {orders.order.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Total Item</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {orders.order.map((order, index) => (
                            <tr key={index} className="order-row">
                                <td>{order.orderitems.length}</td>
                                <td>
                                    {order.orderitems.map((item, itemIndex) => (
                                        <div key={itemIndex}>{item.name}</div>
                                    ))}
                                </td> 
                                <td>
                                    {order.orderitems.map((item, itemIndex) => (
                                        <div key={itemIndex}>${item.price}</div>
                                    ))}
                                </td> 
                                <td>{order.orderstatus}</td> 
                                <td>
                                    <Link
                                        to={`/orders/${order._id}`} 
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="order-button"
                                        >
                                            View Order
                                        </Button>
                                    </Link>
                                </td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

// Main component with Suspense
const Orders = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <OrdersContent />
        </Suspense>
    );
};

export default Orders;