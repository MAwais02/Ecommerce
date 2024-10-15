import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

const UpdateProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  // State to store form input values
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    ratings: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/product/${id}`, { withCredentials: true });
        setProductData({
          name: data.product.name,
          price: data.product.price,
          stock: data.product.stock,
          ratings: data.product.ratings,
        });
      } catch (err) {
        setError("Error fetching product details.");
      }
    };

    getProductDetails();
  }, [id]);

  
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/admin/product/${id}`,
        productData,
        { withCredentials: true }
      );
      alert("Product updated successfully!");
      navigate("/admin/products"); // Use navigate to redirect to product list
    } catch (err) {
      setError("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="updateProductContainer">
      <Typography variant="h4" gutterBottom>Update Product</Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} className="updateProductForm">
        <TextField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={productData.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ratings"
          name="ratings"
          type="number"
          value={productData.ratings}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "16px" }}
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
