import axios from 'axios'
import { ADD_TO_CART_ERROR, REMOVE_FROM_CART, RESET_CART } from '../constants/cartConstants'
import { ADD_TO_CART } from '../constants/cartConstants'
const URL = "http://localhost:8000"
export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        // console.log(quantity)
        const dat = await axios.get(`${URL}/product/${id}`)
        dat.data.quantity = quantity
        dispatch({ type: ADD_TO_CART, payload: { ...dat } })
    }
    catch (err) {
        dispatch({ type: ADD_TO_CART_ERROR, payload: err.message })
    }
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id })
}
export const resetCart = () => (dispatch) => {
    dispatch({ type: RESET_CART, payload: true })
}