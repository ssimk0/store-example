import {createSlice} from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return {};
        }

        return JSON.parse(serializedState)?.card;
    } catch (err) {
        return undefined;
    }
};

export interface CartSliceState {
    cartProducts: {
        [key:number]: number
    };
}

const initialState: CartSliceState = {
    cartProducts: {},
};

const persistedState = loadState();
const CartSlice = createSlice({
    name: 'cartState',
    initialState: {
        ...initialState,
        ...persistedState,
    },
    reducers: {
        updateCartProductQuantity(state, action) {
            const productId = action.payload.id
            const quantity = !isNaN(action.payload.quantity) ? action.payload.quantity : state.cartProducts[productId] ? state.cartProducts[productId] + 1 : 1
            const newState = Object.assign({}, {
                ...state.cartProducts,
                [productId]: quantity,
            })
            if (quantity == 0) delete newState[productId]
            state.cartProducts = newState 
        },
        clearCart(state) {
            state.cartProducts = {}
        }
    }
});

export default CartSlice;

export const {updateCartProductQuantity, clearCart} = CartSlice.actions;