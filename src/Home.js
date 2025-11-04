import { Footer } from "./Shared/Footer";
import { Header } from "./Shared/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let res = await axios.get("https://dummyjson.com/products");
                setProducts(res.data.products); // API returns { products: [] }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div>
                <div className="container mt-4">
                    <h2 className="mb-4">🛍️ Latest Products</h2>
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title">{product.title}</h6>
                                        <p className="text-muted small mb-2">{product.brand}</p>
                                        <p className="fw-bold">₹ {product.price}</p>
                                        <button className="btn btn-primary mt-auto">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}