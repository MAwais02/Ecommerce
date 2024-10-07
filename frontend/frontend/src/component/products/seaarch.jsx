import React, { useState } from "react";
import { GetProductWithKeywordSearch } from "../../statemanagment/state"
import { useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";
const SearchProduct = () => {
    const [loading , setLoading]= useState(true);
    const ProductKeywordSearch = useRecoilValueLoadable(GetProductWithKeywordSearch);
    
    useEffect(() => {
        if (ProductKeywordSearch.state === "hasValue") {
            setLoading(false);
        } else if (ProductKeywordSearch.state === "loading") {
            setLoading(true);
        }
    }, [ProductKeywordSearch]);

    if (loading == true) {
        return <div>Loading...</div>;
    }

    if (ProductKeywordSearch.state === "hasError") {
        return <div>Error loading product details.</div>;
    }
    const data = ProductKeywordSearch.contents.products;
    console.log(data);
    return <>
        <div>
            Hello i came here
        </div>
    </>
}
export default SearchProduct;