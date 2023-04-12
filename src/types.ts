export interface Product {
    id: number
    name: string,
    unit_price_incl_vat: number,
    stock_quantity: number,
    vat_category: number
}

export interface ProductCart extends Product {
    total: number,
    quantity: number
}
