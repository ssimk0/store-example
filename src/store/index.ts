import {configureStore} from '@reduxjs/toolkit';
import CartSlice, {CartSliceState} from "./cart-slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ProductApi} from "../api/product";
import OrderSlice, {OrderSliceState} from "./order-slice";

export const saveState = (card: CartSliceState, orders: OrderSliceState) => {
    try {
        const serializedState = JSON.stringify({card, orders});
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

const store = configureStore({
    reducer: {
        [ProductApi.reducerPath]: ProductApi.reducer,
        [CartSlice.name]: CartSlice.reducer,
        [OrderSlice.name]: OrderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            ProductApi.middleware,
        ),
});

// setupListeners(store.dispatch);
store.subscribe(() => {
    saveState({
        ...store.getState()[CartSlice.name],
    }, {...store.getState()[OrderSlice.name]});
});

// Infer the `RootState` and `AppDispatch` types from the index itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;