import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import "./NewProduct.css"; // Import the CSS for styling
import Sidebar from "./sidebar";

const NewProduct = () => {
  const navigate = useNavigate(); // To navigate after successful creation

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProductData({
        ...productData,
        image: e.target.files[0]
      });
    } else {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("image", productData.image);

      // Send POST request to the backend to create a new product
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/admin/product/new",
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert("Product created successfully!");
      navigate("/admin/products"); // Navigate to the product list after creation
    } catch (err) {
      setError("Error creating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newProductContainer">
      <Sidebar />
      <div className="newProductContent">
        <Typography variant="h4" gutterBottom>Create New Product</Typography>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="newProductForm">
          <TextField
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <TextField
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            name="image"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {productData.image && <p>{productData.image.name}</p>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="submit-button"
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;