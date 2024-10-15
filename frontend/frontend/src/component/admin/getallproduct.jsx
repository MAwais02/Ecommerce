import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './GetAllorder.css'; // Import the styles
import Sidebar from './sidebar';

const GetAllorder = () => {
  const [order, setorder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchorder = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/admin/orders', {
          withCredentials: true,
        });
        setorder(data.order);
      } catch (err) {
        setError('Failed to fetch order.');
      } finally {
        setLoading(false);
      }
    };

    fetchorder();
  }, []);

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axios.put(`http://localhost:4000/api/v1/admin/order/${orderId}`, {
        status: 'Delivered',
      }, {
        withCredentials: true,
      });
      setorder((prevorder) =>
        prevorder.map((order) =>
          order._id === orderId ? { ...order, ordertatus: 'Delivered' } : order
        )
      );
      alert('Order marked as delivered');
    } catch (err) {
      setError('Failed to mark the order as delivered.');
    }
  };

  if (loading) {
    return <p>Loading order...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ordersContainer">
      <Sidebar />
      <h2>User Orders</h2>
      {order.length === 0 ? (
        <p>No order found.</p>
      ) : (
        <ul className="orderList">
          {order.map((order) => (
            <li key={order._id} className="orderItem">
              <div>
                <h3 className="orderHeader">Order ID: {order._id}</h3>
                <div className="shippingInfo">
                  <p><strong>Shipping Info:</strong></p>
                  <p>Address: {order.shippinginfo.address}, {order.shippinginfo.city}, {order.shippinginfo.state}, {order.shippinginfo.country}</p>
                  <p>Phone Number: {order.shippinginfo.phonenumber}</p>
                  <p>Pincode: {order.shippinginfo.pincode}</p>
                </div>
                
                <div className="paymentInfo">
                  <p><strong>Payment Status:</strong> {order.paymentinfo.status}</p>
                  <p><strong>Paid At:</strong> {new Date(order.paidat).toLocaleString()}</p>
                </div>
                
                <div className="orderItems">
                  <p><strong>Order Items:</strong></p>
                  <ul>
                    {order.orderitems.map((item) => (
                      <li key={item._id}>
                        <p>Name: {item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="orderSummary">
                  <p><strong>Tax Price:</strong> ${order.taxprice}</p>
                  <p><strong>Shipping Price:</strong> ${order.shippingprice}</p>
                  <p><strong>Total Price:</strong> ${order.totalprice}</p>
                  <p><strong>Order Status:</strong> {order.ordertatus}</p>
                </div>

                <div className="orderActions">
                  {order.ordertatus !== 'Delivered' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMarkAsDelivered(order._id)}
                    >
                      Mark as Delivered
                    </Button>
                  ) : (
                    <p><strong>Delivered At:</strong> {new Date(order.deliveredat).toLocaleString()}</p>
                  )}
                </div>
              </div>
              <hr className="orderDivider" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllorder;
