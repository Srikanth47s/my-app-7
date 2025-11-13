import { useEffect, useState } from "react";
import { Footer } from "../Shared/Footer";
import { Header } from "../Shared/Header";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";



export function Cart() {

    const [cartData, setCartData] = useState([]);
    // console.log(cartData)
    let userId = 20 // UserID();

    useEffect(() => {
        try {

            let apiData = async () => {
                let apiResponce = await axios.get('https://dummyjson.com/carts/user/' + userId)
                console.log(apiResponce.data.carts)
                setCartData(apiResponce.data.carts)
            }
            apiData();
        } catch (ex) {
            toast.error(ex.message)
        }
    }, [])

    const updateCart = async (apijson) => {
        let apiResponce = await axios.put('https://dummyjson.com/carts/' + userId, apijson)
        console.log(apiResponce)
    }

    const increaseBtn = (cart, i, product, j) => {
        let tempCart = [...cartData]
        if (product.quantity < 5) {
            let newQuantity = product.quantity + 1
            tempCart[i].products[j].quantity = newQuantity
            setCartData([...tempCart])

            let apijson = {
                merge: 'true',
                products: [
                    {
                        id: product.id,
                        quantity: newQuantity
                    }
                ]
            }
            updateCart(apijson, product)
        } else {
            toast.warning("Quantity cannot be greater than 5");
        }

        // console.log(tempCart[i].products[j].quantity)
    }
    const decreaseBtn = (cart, i, product, j) => {
        let tempCart = [...cartData]
        if (product.quantity > 1) {
            let newQuantity = product.quantity - 1
            tempCart[i].products[j].quantity = newQuantity
            setCartData([...tempCart])

            let apijson = {
                merge: 'true',
                products: [
                    {
                        id: product.id,
                        quantity: newQuantity
                    }
                ]
            }
            updateCart(apijson)

        } else {
            toast.warning("Quantity cannot be less than 1");
        }
    }

    const calculateSubtotal = (products) => {
        let totalPrice = 0;
        let toatalProducts = 0;
        products.forEach(product => {
            totalPrice = totalPrice + product.quantity * product.price
            toatalProducts = toatalProducts + product.quantity
        });
        // console.log(totalPrice,toatalProducts)
        return "(" + toatalProducts + " items) " + totalPrice;
    }

    let deleteProduct = async (product, cartIndex) => {
        let tempCartData = [...cartData];
        let preCartData = [...cartData];
        try {
            tempCartData[cartIndex].products = tempCartData[cartIndex].products.filter((prod) => (prod.id != product.id))
            let newCartData = tempCartData[cartIndex].products.length === 0 ? tempCartData.filter((_, idx) => idx != cartIndex) : tempCartData;
            setCartData([...newCartData])
            console.log(tempCartData[cartIndex].products)
            let apiResponce = await axios.delete('https://dummyjson.com/products/' + product.id)
            console.log(apiResponce)
            if (tempCartData.length === 0) {
                toast.info("Your cart is empty now.");
            } else {
                toast.success("Product deleted successfully!");
            }
        } catch (ex) {
            setCartData([...preCartData])
            toast.warning(ex.message)
        }





    }


    return (
        <div>
            <Header />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-8">
                        {
                            cartData.length === 0 ? (
                                // ✅ Empty Cart UI
                                <div className="card shadow text-center p-5">
                                    <h4 className="text-muted">🛒 Your cart is empty</h4>
                                    <p>Add some products to see them here!</p>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={() => (window.location.href = "/home")}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) :
                                cartData != null && cartData.map((cart, i) => (
                                    <div className="card shadow" key={i}>
                                        <div className="card-body">
                                            {
                                                cart.products.map((product, j) => (
                                                    <div className="card border-0 mb-3 border-bottom" key={j}>
                                                        <div className="row">
                                                            <div className="col-2 me-2">
                                                                <img src={product.thumbnail} className="fluid mb-3 img-small" />
                                                            </div>
                                                            <div className="col-7 ms-5">
                                                                <h5>{product.title}</h5>
                                                                <div>
                                                                    <span className="border p-1 border-warning rounded-pill">
                                                                        <button className=" btn-button" onClick={e => decreaseBtn(cart, i, product, j)}><strong>-</strong></button>
                                                                        <span className="me-3 ms-3">{product.quantity}</span>
                                                                        <button className=" btn-button" onClick={e => increaseBtn(cart, i, product, j)}><strong>+</strong></button>
                                                                    </span>
                                                                    <span className="text-primary"> | </span>
                                                                    <a href="#" className="card-link" onClick={e => deleteProduct(product, i)}>Delete</a> <span className="text-primary"> | </span>
                                                                    <a href="#" className="card-link">Save for later</a>
                                                                </div>
                                                            </div>
                                                            <div className="col-2 text-end">
                                                                <span className="badge text-bg-danger">Limited Deal</span>
                                                                <strong><i className="bi bi-currency-rupee"></i> {product.price}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="text-end">
                                                <strong className="text-success">Subtotal {calculateSubtotal(cart.products)}</strong>
                                            </div>
                                        </div>
                                    </div>





                                ))
                        }

                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}