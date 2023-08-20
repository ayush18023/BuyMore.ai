import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(product => product.data.id === item.data.id)
            if (exist) {
                for (let ele of state.cartItems) {
                    if (ele.data.id === item.data.id) {
                        ele.data.quantity = item.data.quantity
                    }
                }
                return { ...state, cartItems: [...state.cartItems] }
            }
            else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case REMOVE_FROM_CART:
            return { ...state, cartItems: state.cartItems.filter(product => product.data.id !== action.payload) }
        default:
            return state
    }
}