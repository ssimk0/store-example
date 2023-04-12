import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom"
import {Provider} from "react-redux";
import Root from './Root'
import ErrorPage from './pages/ErrorPage'
import ProductsPage from './pages/productsPage'
import './index.css'
import CartPage from './pages/cartPage'
import OrderPage from './pages/OrderPage'
import store from "./store";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/products" replace={true}/>,
            },
            {
                path: "/products",
                element: <ProductsPage/>,
            },
            {
                path: "/cart",
                element: <CartPage/>
            },
            {
                path: "/order/:orderId",
                element: <OrderPage/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
