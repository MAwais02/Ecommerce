import React, { Fragment } from "react";
import "./CartComponent.css";
import CartItemCard from "./cartitemcard.jsx"; 
import {Cart} from "../../statemanagment/Cartstate.jsx"
import { useRecoilState } from "recoil";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoItemsInCart from "./emptycart.jsx";

const CartComponent = () => {
    const [cartItems, setCartItems] = useRecoilState(Cart);  
    const navigate = useNavigate();
    console.log(cartItems);
    const handleRemove = (itemId) => 
    {
        console.log("Item ID to remove:", itemId);  // Debugging log
        const updatedCart = cartItems.filter(item => item.product !== itemId);
        console.log("Updated cart items:", updatedCart);  // Debugging log
        setCartItems(updatedCart);    
    };

    const calculateSubtotal = (item) => item.price * item.quantity;
    const calculateTotal = () => cartItems.reduce((acc, item) => acc + calculateSubtotal(item), 0);
    const checkoutHandler = () => {
        navigate('/shipping');  
    }

    return (

        cartItems == null || cartItems.length == 0 ? <NoItemsInCart />
        : <Fragment>
            <div className="cartpage">
                <div className="cartheader">
                    <p>Product</p>
                    <p></p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                    <p>Remove</p>
                </div>

                {cartItems.map((item) => (
                    <CartItemCard key={item.id} item={item} handleRemove={handleRemove}/>
                ))}
                <div className="carttotal">
                    Total: ${calculateTotal()}
                </div>

                <button className="checkoutbtn" onClick={checkoutHandler}>Proceed to Checkout</button>
            </div>
        </Fragment>
    );
};

export default CartComponent;
