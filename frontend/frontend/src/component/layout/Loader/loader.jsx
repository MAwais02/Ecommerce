// Loader.js
import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Import the icon
import './loader.css'; // Import your CSS for styling

const Loader = () => {
    return (
        <div className="loader-container">
            <CircularProgress size={60} color="primary" />
            <div className="icon-container">
                <HourglassEmptyIcon style={{ fontSize: 40, color: "#1976d2" }} />
            </div>
            <Typography variant="h6" className="loader-text">
                Loading, please wait...
            </Typography>
        </div>
    );
};
export default Loader;
