import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "./store";
import {updateCartProductQuantity} from "./store/cart-slice";
import {Product, ProductCart} from "./types";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {findUsedStockQuantity} from "./helper"

export function useAddToCart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItems = useAppSelector((state) => state.cartState.cartProducts)
    const orders: {
        [key: string]: ProductCart[]
    } = useAppSelector((state) => state.orderState.orders)



    return (product: Product, quantity: number = 1) => {
        const cartItemCount = cartItems[product.id] || 0
        const stockQuantity = findUsedStockQuantity(orders, product)
        if ((!quantity && cartItemCount >= stockQuantity) || quantity > stockQuantity) {
            toast.error(`No more "${product.name}" available in the stock`)
            return
        }

        dispatch(updateCartProductQuantity({id: product.id, quantity}))

        toast.success(`"${product.name}" sucessfuly updated your card`)
        navigate('/cart')
    }

}

export function usePreloadImages() {
    const [isLoading, setLoading] = useState<boolean>(false);

    return {
        preloadImages: async (images: string[]) => {
            setLoading(true)
            const promises = images.map((image) => {
                return new Promise((resolve, reject) => {
                    const img = new Image()

                    img.src = image
                    img.onload = resolve
                    img.onerror = reject
                })
            })

            await Promise.all(promises)
            setLoading(false)
        }, isLoading
    }
}