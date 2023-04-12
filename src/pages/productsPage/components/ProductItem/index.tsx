import {FC} from "react";
import {Product, ProductCart} from "../../../../types";
import {useAddToCart} from "../../../../hooks";
import Button from "../../../../components/Button";
import {findUsedStockQuantity} from "../../../../helper"
import { useAppSelector } from "../../../../store";
interface Props {
    product: Product,
}

const ProductItem: FC<Props> = ({product}) => {
    const addToCart = useAddToCart()
    const orders: {
        [key: string]: ProductCart[]
    } = useAppSelector((state) => state.orderState.orders)

    return (
        <div className="gap-y-4 grid" key={`products-${product.id}`}>
            <div>
                <img src="http://via.placeholder.com/640x360"/>
            </div>
            <h3 className="font-medium text-lg">{product.name}</h3>
            <div className="flex justify-between">
                <p>{product.unit_price_incl_vat.toFixed(2)} €</p>
                <Button
                    disabled={findUsedStockQuantity(orders, product) <= 0}
                    onClick={() => addToCart(product)}>
                    <>
                        Add to cart
                    </>
                </Button>
            </div>
        </div>
    )
}

export default ProductItem