import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Product} from "../../types";
import products from "../../assets/products.json?url";


export const ProductApi = createApi({
    reducerPath: 'product',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery(),
    endpoints: (build) => ({
        products: build.query<Product[], void>({
            query: () => ({url: products, method: 'get'}),
            providesTags: ['Products']
        }),
    })
})

export const {
    useProductsQuery,
} = ProductApi