import {TrashIcon} from '@heroicons/react/20/solid';
import {FC, useCallback} from 'react'
import {debounce} from '../../../../helper';
import {useAddToCart} from '../../../../hooks';
import {Product, ProductCart} from '../../../../types';
import {VATCategory} from "../../index";
import productItem from "../../../productsPage/components/ProductItem";

interface Props {
    cartItems: ProductCart[],
    VATCategories: { [key: number]: VATCategory }
}

interface Column {
    name: string,
    textDirection: string
}

const columns: Column[] = [
    {
        name: "Item",
        textDirection: "left"
    },
    {
        name: "Quantity",
        textDirection: "left"
    },
    {
        name: "Unit Price incl. VAT",
        textDirection: "right"
    },
    {
        name: "VAT",
        textDirection: "right"
    },
    {
        name: "Total",
        textDirection: "right"
    }
]

const CartTable: FC<Props> = ({VATCategories, cartItems}) => {
    const exclVatTotal = cartItems.reduce((result, item: Product) => result + (item.unit_price_incl_vat / 100 * (100 - item.vat_category)), 0)
    const changeProductQuantity = useAddToCart()

    const changeQuantityHandler = useCallback(
        debounce((e: any, item: ProductCart) => {
            const quantity = e.target.value
            if (quantity === "") return
            changeProductQuantity(item, parseInt(quantity))
        }, 500)
        , [])

    return (
        <table className="w-full">
            <thead className="bg-gray-100 rounded">
            <tr>
                {
                    columns.map((column) => (
                        <th className={`text-${column.textDirection} p-4 font-semibold`} key={column.name}>{column.name}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {cartItems.map((item: any) => (
                <tr key={`cart-${item.id}`} className="border-b-2 border-gray-200">
                    <th className="text-left p-4">{item.name}</th>
                    <th className="text-left">
                        <div className="flex">
                            <input type="number" defaultValue={item.quantity}
                                   onChange={(e) => changeQuantityHandler(e, item)}
                                   className="border border-gray-500 w-8 h-8 text-center rounded"></input>
                            <TrashIcon className="w-6 h-6 mt-1 ml-2 hover:cursor-pointer" onClick={() => changeProductQuantity(item, 0)}/>
                        </div>
                    </th>
                    <th className="text-right">{item.unit_price_incl_vat} €</th>
                    <th>{item.vat_category}%</th>
                    <th className="text-right p-4">{item.total} €</th>
                </tr>
            ))}
            <tr className=" border-b-2 border-gray-200">
                <th className="text-right" colSpan={4}>Total excl. VAT</th>
                <th className="text-right p-4"><>{exclVatTotal.toFixed(2)} €</>
                </th>
            </tr>
            {Object.values(VATCategories).map((category) => (
                <tr className=" border-b-2 border-gray-200" key={category.name}>
                    <th className="text-right" colSpan={4}>{category.name}</th>
                    <th className="text-right p-4">{category.total.toFixed(2)} €</th>
                </tr>
            ))}
            <tr className=" border-b-2 border-gray-200">
                <th className="text-right font-semibold" colSpan={4}>Total</th>
                <th className="text-right p-4 font-semibold"><>{cartItems.reduce((result, item: Product) => result + (item?.unit_price_incl_vat || 0), 0).toFixed(2)} €</>
                </th>
            </tr>

            </tbody>
        </table>
    )
}

export default CartTable

