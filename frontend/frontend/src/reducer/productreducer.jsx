import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productconstraints";

export const productreducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                ...state, // Preserve existing state
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state, // Preserve existing state
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.CountProduct,
            };
        case ALL_PRODUCT_FAIL:
            return {
                ...state, // Preserve existing state
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
