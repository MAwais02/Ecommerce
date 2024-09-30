import { Fragment, useEffect } from "react"
import Carousel from "react-material-ui-carousel"
import "./productdetails.css"
import {fetchsingledataproduct} from "../../statemanagment/state"
import {productIDAtom} from "../../statemanagment/state"
import {fetchbackenddata} from "../../statemanagment/state"
import { useRecoilState, useRecoilValue } from "recoil"

const ProductDetails = () => {
    const productid = useRecoilValue(productIDAtom);
    const productdetailfetcher = useRecoilValue(fetchsingledataproduct);

    let singleProductData;
    useEffect(()=>{
        singleProductData = productdetailfetcher(productid);
    }, [productdetailfetcher])
    return (
    <Fragment>
        <div className="productdetails">
            <div>
                <Carousel>
                    {
                        singleProductData.images && singleProductData.images.map((item , i) => {
                            <img  
                                className="carosalimage"
                                key  = {item.url}
                                src = {item.url}
                                alt = {`${i} Slide`}
                            />
                        })
                    }
                </Carousel>
            </div>
            <div>Hi</div>
        </div>
    </Fragment>
    );
}
export default ProductDetails