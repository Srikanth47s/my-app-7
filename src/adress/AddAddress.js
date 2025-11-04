import axios from "axios"
import { useState } from "react"
import { ADDRESS_ADD_API } from "../Services/AdressApi"

export function AddAddress({handleAddAddress}) {


    let [addressData, setAdrressData] = useState({
        name:'', mobile:'', address1:'', city:'', state:'', country:'', pincode:'', latLong:''
    })

    const getLocation = async (lat, long) => {
        try{
let key = 'AIzaSyAY1cLZkQ8z18FMknelsZKAUMoLhMBUXEA'
        let apiResponce = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' +key)
        console.log(apiResponce.data.results[0].address_components)
        let addressData = apiResponce.data.results[0].address_components;
        let city = '';
        let state = '';
        let pincode = '';
        let country = '';

        city = addressData.find(data => data.types.includes("locality")).long_name
        // console.log(city)
        state =  addressData.find(data => data.types.includes('administrative_area_level_1')).long_name
        // console.log(state)
        pincode = addressData.find(data => data.types.includes("postal_code")).long_name
        // console.log(pincode)
        country = addressData.find(data => data.types.includes("country")).long_name
        // console.log(country)
        setAdrressData({...addressData, city: city, country: country, pincode: pincode, state: state})
        }catch(err){
            alert(err.message);
        }
        
    }

    let getUserLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude + "," + position.coords.longitude);
                    setAdrressData({...addressData, latLong: position.coords.latitude + "," + position.coords.longitude})
                    getLocation(position.coords.latitude, position.coords.longitude)
                },
                (error) => {
                    alert("permision denied");
                }
            )
        }else{
            alert('Geolocation not support')
        }
    }

    let addAddressHandler =async () => {
        const apiResponce = await ADDRESS_ADD_API(addressData)
        console.log(apiResponce.data.data)
        handleAddAddress(apiResponce.data.data)
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h6 className="text-primary">Add new address</h6>
                <div className="mt-2">
                    <button className="btn btn-primary" onClick={e => getUserLocation()}><i className="bi bi-crosshair"></i> Use my location</button>
                </div>
                <div className="mt-2">
                    <label className="small">NAME</label>
                    <input type="text" className="form-control" value={addressData.name || ''} onChange={e=> setAdrressData({...addressData,name:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <label className="small">MOBILE</label>
                    <input type="text" className="form-control" value={addressData.mobile || ''} onChange={e=> setAdrressData({...addressData, mobile:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <label className="small">FLAT/BUILDING, DOOR NO</label>
                    <input type="text" className="form-control" value={addressData.address1 || ''} onChange={e=> setAdrressData({...addressData,address1:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <label className="small">CITY</label>
                    <input type="text" className="form-control" value={addressData.city} onChange={e=> setAdrressData({...addressData,city:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <label className="small">STATE</label>
                    <input type="text" className="form-control" value={addressData.state} onChange={e=> setAdrressData({...addressData,state:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <label className="small">COUNTRY</label>
                    <input type="text" className="form-control" value={addressData.country} onChange={e=> setAdrressData({...addressData,country:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <label className="small">PINCODE</label>
                    <input type="text" className="form-control" value={addressData.pincode} onChange={e=> setAdrressData({...addressData,pincode:e.target.value})}/>
                </div>
                <div className="mt-2">
                    <button className="btn btn-primary" onClick={e => addAddressHandler()}>Add address</button>
                </div>

            </div>
        </div>
    )
}