import { useEffect, useState } from "react";
import { Footer } from "../Shared/Footer";
import { Header } from "../Shared/Header";
import { AddAddress } from "./AddAddress";
import { ADDRESS_DELETE_API, ADDRESS_VIEW_API } from "../Services/AdressApi";
import { UserID } from "../Utils/util";
import { SingleAdress } from "./SingleAddress";


export function Adresses() {
    let [showAdd, setShowAdd] = useState(false);
    let [hideBtn, setHideBtn] = useState(true);

    let i = 0

    let [addresses, setAdresses] = useState([])
    // console.log(adresses)

    let handleBtn = () => {
        setShowAdd(true);
        setHideBtn(false);
    }

    useEffect(() => {
        let viewadress = async () => {
            let apiResponce = await ADDRESS_VIEW_API({ id: UserID()});
            // console.log(UserID())
            // console.log(apiResponce.data.data)
            setAdresses([...apiResponce.data.data])
            
        }
        viewadress();

    }, [])

    let handleAddress = async (id) => {
        let temp = addresses;
        try{
            let tempdata = temp.filter((add) => {
            if(add.id != id){
                return add
            }
        })
        setAdresses([...tempdata])
        await ADDRESS_DELETE_API({addressId: id})


        }catch(err){
            alert(err.message)
        }
        
    }

    let handleAddAddress = (address) => {
        let temp = addresses;
        temp.push(address)
        setAdresses([...temp])
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row mt-3">
                    <div className="col-3"></div>
                    <div className="col-6">
                        {
                            hideBtn == true && <button className="btn btn-primary" onClick={e => handleBtn()}>Add new address</button>
                        }

                        {
                            showAdd == true && <AddAddress handleAddAddress={handleAddAddress} />
                        }
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {
                            addresses.map((address, i) => (
                                <SingleAdress key={i} address = {address} handleAddress = {handleAddress}/>                        
                            
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}