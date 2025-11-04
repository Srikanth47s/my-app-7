export function SingleAdress({address,handleAddress}){
    return(
        <div className="card mt-3">
            <div className="card-body">
                <div>
                    {address.flat}, {address.city},{address.state}, {address.country}, {address.pincode}
                </div>
                <div>
                    Name: { address.name}, Contact: {address.mobile}
                </div>

            </div>
            <div className="card-footer">
                <button className="btn btn-primary me-2"><small>Edit</small></button>
                <button className="btn btn-danger" onClick={e => handleAddress(address.id)}><small>Delete</small></button>
            </div>
        </div>
    )
}