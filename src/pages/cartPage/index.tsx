import {useProductsQuery} from "../../api/product"
import Loader from "../../components/Loader";
import {useAppDispatch, useAppSelector} from "../../store";
import {ProductCart} from "../../types";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";
import CartTable from "./components/table";
import Button from "../../components/Button";
import {useState} from "react";
import {clearCart} from "../../store/cart-slice";
import {cacheOrder} from "../../store/order-slice";
import {v4 as uuidv4} from 'uuid';


export interface VATCategory {
    name: string,
    total: number
}

const CartPage = () => {
    const {data: productsData, isFetching} = useProductsQuery()
    const cartItems: {
        [key: number]: number
    } = useAppSelector((state) => state.cartState.cartProducts)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [isLoading, setLoading] = useState(false);

    let mergedCartItems: ProductCart[] = []

    if (productsData) {
        //@ts-ignore
        mergedCartItems = Object.keys(cartItems).map((id) => {
            const productId = parseInt(id)
            const product = productsData.find((product) => product.id === productId)
            if (product) {
                return {
                    ...product,
                    total: product?.unit_price_incl_vat ? product.unit_price_incl_vat * cartItems[productId] : 0,
                    quantity: cartItems[productId]
                }
            }
            return null
        }).filter(item => item !== null)
    }

    const VATCategories: { [key: number]: VATCategory } = {}

    mergedCartItems.forEach((item) => {
        if (item.vat_category === 0) return
        if (!VATCategories[item.vat_category]) {
            VATCategories[item.vat_category] = {
                name: `VAT ${item.vat_category} %`,
                total: 0,
            }
        }

        VATCategories[item.vat_category].total += item.unit_price_incl_vat / 100 * item.vat_category
    })

    const sendOrder = () => {
        setLoading(true);
        new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, Math.random() * 2000)
        }).then(() => {
            dispatch(clearCart())
            const id = uuidv4()
            dispatch(cacheOrder({id, order: mergedCartItems}))
            navigate(`/order/${id}`)
        })
    }

    return (
        <div className="container mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-medium">Cart</h1>
            </div>
            <Loader isFetching={isFetching || isLoading}>
                <div className="p-16 flex-1">
                    <CartTable cartItems={mergedCartItems} VATCategories={VATCategories}/>
                    <div className="flex justify-between py-8">
                        <Button type="inline" className="pl-4" onClick={() => navigate("/products")}>
                            <>
                                <ArrowLeftIcon className="h-6 w-6"/> Back
                            </>
                        </Button>
                        <Button onClick={() => sendOrder()}>
                            <>
                                Send Order
                            </>
                        </Button>
                    </div>
                </div>
            </Loader>
        </div>
    )
}

export default CartPage
