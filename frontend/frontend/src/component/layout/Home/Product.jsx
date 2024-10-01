import React, { Fragment, Suspense } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
import { Loader } from "../Loader/loader";
import { productIDAtom } from "../../../statemanagment/state.jsx"; // setting product if for future use
import { useRecoilState } from "recoil";
const Image = {
    url: "https://img.freepik.com/free-photo/simple-black-t-shirt-worn-by-man_53876-102772.jpg?t=st=1727599344~exp=1727602944~hmac=fcd47894ab61c19da9930192d50932424b814e63670f8894355099ec6e69f469&w=740"
};
const ParentComponent = ({product}) => {
    const [productid , setproductid] = useRecoilState(productIDAtom);

    const options = {
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        value : product.ratings,
        isHalf : true,
        size : window.innerWidth < 600 ? 20 : 25,
    }
    return (
        <div className="hiverbox">
            <Link onClick ={()=> setproductid(product._id)} className="productcard" to={`/product/${product._id}`}>
                <img src={Image.url} alt={product.name}/>
                <p>{product.name}</p>

                <div>
                    <ReactStars {...options}/>
                    <span> ({product.numOfreviews})</span>
                </div>
                <span>${product.price}</span>
            </Link>
        </div>
    )
}
const Product = ({product}) =>{
    <Fragment>
        <Suspense fallback={<Loader />} >
            <ParentComponent product={product}/>
        </Suspense>
    </Fragment>
}
export default ParentComponent