import { GET_PRODUCT_DETAILS_FAIL, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS } from "../constants/productConstant";

export const getProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            return { products: action.payload }
        case GET_PRODUCT_FAIL:
            return { error: action.payload }
        default:
            return state
    }
}
export const getProductDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case GET_PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case GET_PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}