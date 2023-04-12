import { ProductCart, Product } from "./types";

export function debounce(func: any, timeout = 300) {
    let timer: any;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { // @ts-ignore
            func.apply(this, args);
        }, timeout);
    };
}

export const findUsedStockQuantity = (orders: { [key: string]: ProductCart[] }, product: Product): number => {
    const orderedQuantity = Object.values(orders).reduce<number>((result, cartItems: ProductCart[]) => {
        return result + (cartItems.filter((p) => product.id === p.id)?.reduce<number>((r, p) => r + p.quantity, 0) || 0)
    }, 0) || 0
    return product.stock_quantity - orderedQuantity
}