import {createSlice} from '@reduxjs/toolkit';
import { ProductCart } from '../types';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return {};
        }

        return JSON.parse(serializedState)?.orders;
    } catch (err) {
        return undefined;
    }
};

export interface OrderSliceState {
    orders: {
        [key:string]: ProductCart[]
    };
}

const initialState: OrderSliceState = {
    orders: {},
};

const persistedState = loadState();
const CartSlice = createSlice({
    name: 'orderState',
    initialState: {
        ...initialState,
        ...persistedState,
    },
    reducers: {
        cacheOrder(state, action) {
            const orderId = action.payload.id
            state.orders = Object.assign({}, {
                ...state.orders,
                [orderId]: action.payload.order,
            }) 
        },
    }
});

export default CartSlice;

export const {cacheOrder} = CartSlice.actions;