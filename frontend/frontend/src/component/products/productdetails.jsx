import { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productdetails.css";
import { fetchsingledataproduct } from "../../statemanagment/state";
import { useRecoilValueLoadable } from "recoil"; // Import Loadable
import ReviewCard from "./ReviewCard.jsx"
import ReactStars from "react-rating-stars-component"
const ProductDetails = () => {
    
    console.log("Came into product details");
    const loadableData = useRecoilValueLoadable(fetchsingledataproduct);
    const [loading, setLoading] = useState(true);

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
                        <h1>{`$${data.price}`}</h1>
                        <div className="text-cont-3-1">
                            <div className="text-cont-3-1-1">
                                <button>-</button>
                                <input type="number" value="1" />
                                <button>+</button>
                            </div>{" "}
                            <button>Add to cart</button>
                        </div>
                        <p>
                            Status : {" "}
                            <b className={data.stock < 1 ? "redcolor" : "greencolor"}>
                                {data.stock < 1 ? "Outofstock" : "In stock"}
                            </b>
                        </p>
                    </div>

                    <div className="text-cont-4">
                        Description : <p>{data.description}</p>
                    </div>

                    <button className="submitreview">Submit review</button>
                </div>
            </div>

            <h1 className="reviewHeading">Reviews</h1>
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
