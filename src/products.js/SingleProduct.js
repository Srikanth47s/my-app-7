import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Shared/Header";
import { Footer } from "../Shared/Footer";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { UserID } from "../Utils/util";
import { toast, ToastContainer } from "react-toastify";

export function SingleProduct() {
    let { productId } = useParams();



    let [productData, setProductData] = useState(null);

    let [images, setImages] = useState([]);
    let [quantity, setQuantity] = useState(1);
    
    // console.log(productData)

    useEffect(() => {
        let productApi = async () => {
            try {
                const apiResponce = await axios.get('https://dummyjson.com/products/' + productId);
                // console.log(apiResponce.data);
                setProductData(apiResponce.data);
                setImages(apiResponce.data.images[0])

            } catch (err) {
                alert("api is not working")
            }

        }
        productApi();
    }, [])

    const handleAddToCart = async () => {
        
        if(quantity <= productData.stock){
            console.log(quantity)
            let userId = UserID();
            // console.log(userId,"yes")
            let products = [];
            let product = {
                id: productId, quantity: quantity
            }
            products.push(product)
            console.log(products)
            try{
                let apiResponce = await axios.post("https://dummyjson.com/carts/add",{userId: 1, products: products})
                console.log(apiResponce)
                toast.success('Added to cart',{position: "top-center"})
            }catch(ex){
                toast.warning(ex.message,{position: "top-center"})
            }
        }else{
            toast.error('no stock',{position: "top-center"})
        }
    }

    return (
        <div>
            <Header />
            <div className="container mb-3 mt-3">
                <div className="row">
                    <div className="col-5">
                        {
                            productData != null &&

                            <div className="row mt-2">
                                {
                                    productData.images.map((image, i) => (
                                        <div className="col-2" key={i}>
                                            <img src={image} className="img-thumbnail" onMouseOver={e => setImages(image)} />
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        {
                            productData != null &&
                            <SideBySideMagnifier className="mt-2"
                                imageSrc={images}
                                alwaysInPlace={false}
                                fillAvailableSpace={false}
                                zoomPosition="right"
                                zoomContainerBorder="1px solid #ccc"
                                zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,0.3)"
                                style={{ width: '300px', height: '300px' }}
                                interactionSettings={{tapToActivate: false, clickToActivate: false}}
                                activation="hover"
                                
                            />
                        }
                    </div>
                    <div className="col-4 card">
                        <h3>{productData?.title}</h3>
                        <h5><i className="bi bi-star-fill"></i> {productData?.rating}</h5>
                        <div>
                            <h5><i className="bi bi-currency-rupee"></i> {productData?.price}</h5>
                        </div>
                        <div className="mb-5">
                            <h5><i className="bi bi-bag"></i> Stock: {productData?.stock}</h5>
                        </div>
                        
                        
                    </div>
                    <div className="col-3">
                        <div className="card ">
                            <div className="card-body">
                                <div>
                                    <h5 className="text-warning">Add to cart</h5>
                                </div>
                                <div>
                                    <h6>Select quantity</h6>
                                    <select className="form-control" onChange={e => setQuantity(e.target.value)}>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>
                                        <option value={'3'}>3</option>
                                        <option value={'4'}>4</option>
                                        <option value={'5'}>5</option>
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-warning" onClick={e => handleAddToCart()}>Add to cart</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer/>            

            <Footer />
        </div>
    )
}