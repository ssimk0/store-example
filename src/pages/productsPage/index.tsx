import {useEffect} from "react";
import {useProductsQuery} from "../../api/product";
import Loader from "../../components/Loader";
import {usePreloadImages} from "../../hooks";
import ProductItem from "./components/ProductItem";

const ProductsPage = () => {
    const {data: productsData, isFetching} = useProductsQuery()
    const {preloadImages, isLoading} = usePreloadImages()

    useEffect(() => {
        // could be replaces with product images to don't show products until we have images
        preloadImages(['http://via.placeholder.com/640x360'])
    }, [])

    return (
        <div>
            <div className="text-center">
                <h1 className="text-4xl font-medium">Products</h1>
            </div>
            <Loader isFetching={isFetching || isLoading}>
                <div className="grid gap-8 grid-cols-4 p-16">
                    {productsData?.map((product) => {
                        return (
                            <ProductItem product={product} key={`products-${product.id}`}/>
                        )
                    })}
                </div>
            </Loader>
        </div>
    )
}


export default ProductsPage
