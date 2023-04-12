import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../store";
import {ProductCart} from "../types";
import Button from "../components/Button";

const OrderPage = () => {
    let {orderId} = useParams();
    const navigate = useNavigate()
    const orders = useAppSelector((state) => state.orderState.orders)
    let notFound = false;
    let order: ProductCart[] | null = null

    if (!orders.hasOwnProperty(orderId)) {
        notFound = true
    } else {
        // @ts-ignore
        order = orders[orderId]
    }

    return notFound || !order ? (
        <div className="grid place-content-center text-center min-h-screen gap-4">
            <h1 className="text-5xl font-bold">Oops!</h1>
            <p className="text-xl">Sorry, we not find your order.</p>
        </div>
    ) : (
        <div className="container mx-auto">
            <div className="text-center pb-8">
                <h1 className="text-4xl font-medium">Thank you for your order</h1>
            </div>
            <div className="text-center py-16">
                <table className="mx-auto">
                    {
                        order.map((product) => {
                            return (
                                <tr key={`order-${product.id}`} className="border-b-2 border-gray-300">
                                    <th className="py-2 px-4">
                                        <div className="flex">
                                            <div>{product.quantity}x</div>
                                            <div className="pl-8">{product.name}</div>
                                        </div>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </table>
                <div className="pt-16">Please send us the payment
                    of <h3
                        className="inline-block text-2xl">{order.reduce((result, item: ProductCart) => result + ((item?.unit_price_incl_vat || 0) * item.quantity), 0).toFixed(2)} €</h3> to
                    our bitcoin address
                </div>
                <div className="pt-20">
                    <Button onClick={() => navigate("/products")}>
                        <>Continue Shopping</>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
