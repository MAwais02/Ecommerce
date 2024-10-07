import React from "react";
import "./AllProducts.css"
import ParentComponent from "../layout/Home/Product"
import { useState } from "react";
import { useEffect } from "react";
import { fetchbackenddata , PriceAtom , Category , Ratings , ProductKeyword } from "../../statemanagment/state"
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Page } from "../../statemanagment/state"
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const categories =[
    "laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]
const AllProducts = () => {
    const loadableData = useRecoilValueLoadable(fetchbackenddata);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setpage] = useRecoilState(Page);
    const [Price , setPrice] = useRecoilState(PriceAtom);
    const [category , setCategory] = useRecoilState(Category);
    const keyword = useRecoilValue(ProductKeyword);

    const [rating , setRating] = useRecoilState(Ratings);

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
        setpage(e);
    }
    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        if (loadableData.state === "hasValue" && isMounted) {
            setLoading(false);
        } else if (loadableData.state === "loading" && isMounted) {
            setLoading(true);
        }
        return () => {
            isMounted = false;
        };
    }, [loadableData , Price , currentPage , category]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadableData.state === "hasError") {
        return <div>Error loading product details.</div>;
    }
    // Get the actual data
    const AllProducts2 = loadableData.contents.products;
    //console.log('AllProducts2:', AllProducts2);
    //console.log('Type of AllProducts2:', Array.isArray(AllProducts2));
    const resultPerPage = loadableData.contents.ProductsperPage;
    const productsCount = loadableData.contents.CountProduct;
    console.log(productsCount);
    //console.log(productsCount);

    return <>
        <h1 className="PPHeading">
            Products
        </h1>
        <div className="pproducts">
            {AllProducts2 && AllProducts2.map((p) => {
                return <ParentComponent key={p._id} product={p} />
            })}
        </div>
        {<div className="filterbox">
            <Typography>Price</Typography>
                <Slider
                    value={Price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                />

                <Typography>Categerios</Typography>
                <ul className="categoryBox">
                    {categories.map((category)=> (
                        <li className="category-link" key={category} onClick={()=> setCategory(category)}>
                            {category}
                        </li>
                        ))}
                </ul>

                <fieldset>
                    <Typography component="legend">Rating Above</Typography>
                    <Slider value={rating} onChange={(e , newRating)=>{
                        setRating(newRating);
                    }} aria-labelledby="auto"
                    min={0}
                    max={5}/>
                </fieldset>
        </div>}
        {
            resultPerPage < productsCount && (
                <div className="paginationBox">
                    <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productsCount}
                        onChange={setCurrentPageNo} nextPageText="Next" prevPageText="Prev" firstPageText="1st" lastPageText="Last"
                        itemClass="page-item" linkClass="page-link" activeClass="pageItemActive" activeLinkClass="pageLinkActive" />
                </div>
            )
        }
    </>
}
export default AllProducts