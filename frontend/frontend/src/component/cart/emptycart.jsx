import React from "react";
import { Button, Typography, Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importing the ShoppingCart Icon

const NoItemsInCart = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center" >
            <ShoppingCartIcon style={{ fontSize: 80, color: "#1976d2" }} />

            <Typography variant="h4" gutterBottom>
                Your Cart is Empty
            </Typography>

            <Typography variant="body1" color="textSecondary" gutterBottom>
                It looks like you haven’t added anything to your cart yet.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                href="/products"
            >
                Start Shopping
            </Button>
        </Box>
    );
};

export default NoItemsInCart;
