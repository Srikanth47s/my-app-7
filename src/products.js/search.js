import { useEffect, useState } from "react";
import { Footer } from "../Shared/Footer";
import { Header } from "../Shared/Header";
import axios from "axios";
import { Product } from "./product";

export function Search() {

    let [searchProducts, setSearchProducts] = useState([])

    let searchKeyword = "";
    let queryParams = new URLSearchParams(window.location.search)
    searchKeyword = queryParams.get('keyword')

    useEffect(() => {
        const getProducts = async () => {
            // let apiResponce = await axios.get('https://dummyjson.com/products/search?q='+ searchKeyword)
            let apiResponce = await axios.get('https://dummyjson.com/products/search?q=phone')
            console.log(apiResponce.data.products)
            setSearchProducts(apiResponce.data.products)
        }
        getProducts()


    }, [0])


    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                <div className="col-6">
                    {
                        searchProducts.map((product, i) => (
                            <Product key={i} data={product} />
                        ))
                    }
                </div>
                </div>
                

            </div>
            <Footer />
        </div>
    )
}