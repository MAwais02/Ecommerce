import axios from "axios";


import {ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS, CLEAR_ERRORS} from "../constants/productconstraints"

export const getproduct = () => async (dispatch) =>
{    

    try{
        dispatch({type:ALL_PRODUCT_REQUEST});

        const {data} = await axios.get("/api/v1/products");
        console.log(data);

        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : {
                products : data.products,
                CountProduct : data.CountProduct,
            }
        })

    }catch(error){
        dispatch(
            {
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,

            }
        )
    }
}

// clearing errors
export const clearErros = () => async (dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}