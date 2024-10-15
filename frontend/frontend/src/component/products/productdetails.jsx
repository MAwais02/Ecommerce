import { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productdetails.css";
import { fetchsingledataproduct } from "../../statemanagment/state";
import { useRecoilState, useRecoilValueLoadable } from "recoil"; // Import Loadable
import { AddItemsToCart, CartProductID, CartQuantity, Cart } from "../../statemanagment/Cartstate.jsx"
import axios from "axios"
import ReviewCard from "./ReviewCard.jsx"
import ReactStars from "react-rating-stars-component"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating
} from "@mui/material";

const ProductDetails = () => {
    const [cart, setcart] = useRecoilState(Cart); // This will store the list of the Products which will be used for the displying of data
    const loadableData = useRecoilValueLoadable(fetchsingledataproduct);
    const [open, setopen] = useState(false);
    const [rating, setRating] = useState(0);

    const [comment, setcomment] = useState("");
    const [loading, setLoading] = useState(true);
    const [quantity, setquantity] = useState(1); // default quantity
    useEffect(() => {
        if (loadableData.state === "hasValue") {
            setLoading(false);
        } else if (loadableData.state === "loading") {
            setLoading(true);
        }

    }, [loadableData]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadableData.state === "hasError") {
        return <div>Error loading product details.</div>;
    }
    // Get the actual data
    const data = loadableData.contents.product;

    //const images = data.images;
    //console.log("data of images" + JSON.stringify(images));
    //const url = images[0].url;
    //console.log(url);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: data.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    }
    async function callcartbackend({ id, quantity }) {
        const response = await fetch(`http://localhost:4000/api/v1/product/${id}`);
        const data = await response.json();
        console.log(data);
        return {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        }
    }
    const submitReviewToggle = () => {
        open ? setopen(false) : setopen(true);
    }
    return (
        <>
            <div className="productdetail">
                <div className="carousel-container"> {/* Added container for better control */}
                    <Carousel>
                        {data.images && data.images.length > 0 ? (
                            data.images.map((item, i) => (
                                <img
                                    className="carosalimage"
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))
                        ) : (
                            <div>No images available</div>
                        )}
                    </Carousel>
                </div>
                <div className="textouter">
                    <div className="text-container1" >
                        <h2>{data.name}</h2>
                        <p>Product # {data._id}</p>
                    </div>
                    <div className="text-container2">

                        <ReactStars {...options} />
                        <span>({data.numOfreviews} Reviews)</span>

                    </div>
                    <div className="text-cont-3">
                        <h1>{`₹${data.price}`}</h1>
                        <div className="text-cont-3-1">
                            <div className="text-cont-3-1-1">
                                <button onClick={() => {
                                    if (quantity - 1 >= 1) {
                                        setquantity(quantity - 1);
                                    }
                                }
                                }>-</button>
                                <input readOnly type="number" value={quantity} />
                                <button onClick={() => {
                                    if (quantity + 1 <= 10) {
                                        setquantity(quantity + 1);
                                    }
                                }}>+</button>
                            </div>{" "}
                            <button onClick={async () => {
                                try {
                                    const r = await callcartbackend({ id: data._id, quantity }); // r is reteruning data
                                    console.log("Data is " + JSON.stringify(r));
                                    setcart((old) => [...old, r]);
                                    console.log(cart);
                                }
                                catch (error) {
                                    alert("Min");
                                    console.log("Eror in cart");
                                }
                            }} >Add to cart</button>
                        </div>
                        <p>
                            <b className={data.stock < 1 ? "redcolor" : "greencolor"}>
                                {data.stock < 1 ? "Outofstock" : "In stock"}
                            </b>
                        </p>
                    </div>

                    <div className="text-cont-4">
                        Description : <p>{data.description}</p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitreview">Submit review</button>
                </div>
            </div>

            <h1 className="reviewHeading">Reviews</h1>
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}>

                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => { setRating(e.target.value) }}
                        value={rating}
                        size="large" />

                    <textarea
                        placeholder="Write your review here ..."
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                    >
                    </textarea>
                </DialogContent>

                <DialogActions>
                    <Button color="secondery" onClick={submitReviewToggle}>Cancel</Button>
                    <Button
                        color="primary"
                        onClick={async () => {
                            try {
                                const res = await axios.put(
                                    'http://localhost:4000/api/v1/review',
                                    {
                                        productid: data._id,
                                        comment: comment,
                                        rating: rating,
                                    },
                                    {
                                        withCredentials: true,
                                    }
                                );

                                // If the response is successful, you can proceed with the following
                                open ? setopen(false) : setopen(true);
                                alert("Your review has been submitted");
                            } catch (error) {
                                console.error("Error submitting review:", error);
                                alert("There was an error submitting your review. Please try again.");
                            }
                        }}
                    >
                        Submit
                    </Button>

                </DialogActions>
            </Dialog>


            {data.reviews && data.reviews[0] ? (
                <div className="reviews">
                    {
                        data.reviews && data.reviews.map((review) => {
                            return <ReviewCard key={review.id} review={review} />;
                        })
                    }
                </div>
            ) : (
                <p className="noreview">No reviews yet</p>
            )}

        </>
    );
}

export default ProductDetails;
