import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./sidebar";
import "./productList.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/v1/admin/products", { withCredentials: true });
            setProducts(data.products);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`, { withCredentials: true });

            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    };


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 1 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <Link to={`/admin/product/${params.row.id}`}>
                    {params.row.name}
                </Link>
            ),
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "ratings",
            headerName: "Ratings",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Link to={`/admin/product/${params.row.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={() => handleDeleteProduct(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ];

    // Map the products to rows for DataGrid
    const rows = products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        ratings: product.ratings,
    }));

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">All Products</h1>

                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;
