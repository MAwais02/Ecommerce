import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar.jsx";
import "./slider.css";
import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const { data: productsData } = await axios.get("http://localhost:4000/api/v1/admin/products", { withCredentials: true });
      setProducts(productsData.products);


      const { data: ordersData } = await axios.get("http://localhost:4000/api/v1/admin/orders", { withCredentials: true });
      setOrders(ordersData.order);


      const { data: usersData } = await axios.get("http://localhost:4000/api/v1/admin/users", { withCredentials: true });
      setUsers(usersData.users);

      const total = productsData.products.reduce((acc, product) => acc + product.price, 0);
      setTotalAmount(total);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [0, totalAmount],
      }
    ]
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox1">
            <Typography variant="h6">Total Amount</Typography>
            <Typography variant="h4">₹{totalAmount}</Typography>
          </div>
        </div>

        <div className="dashboardSummaryBox2">

          <Link to="/admin/products">
            <Typography variant="h6">Products</Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Link>


          <Link to="/admin/orders">
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">{orders.length}</Typography>
          </Link>


          <Link to="/admin/users">
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">{users.length}</Typography>
          </Link>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
