import React from "react";
import "./CartItemCard.css";

const CartItemCard = ({ item, handleRemove }) => {
    console.log(item);
    return (
        <div className="cartitemcard">
            <div className="item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
                <p className="item-name">{item.name}</p>
            </div>
            <div className="item-quantity">
                <p>Quantity: {item.quantity}</p>
            </div>
            <div className="item-price">
                <p>Total: ${item.price * item.quantity}</p>
            </div>
            <button className="remove-btn" onClick={() => handleRemove(item.product)}>
                Remove
            </button>
        </div>
    );
};

export default CartItemCard;
