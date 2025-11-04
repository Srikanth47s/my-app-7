export function Product(data) {
    // console.log(data)

    

    return (
        <div className="card mt-3">
            <div className="row">
                <div className="col-4">
                    <a href={"/product/"+ data.data.id} target="_blanck">
                        <img src={data.data.thumbnail} className="img-fluid image-text p-3 rounded-start bg-secondary" alt="image" />
                    </a>

                </div>
                <div className="col-8">
                    <div className="card-body">
                        <a href={"/product/"+ data.data.id} target="_blanck">
                            <h5 className="card-title image-text" >{data.data.title}</h5>
                        </a>
                        <h5><i className="bi bi-currency-rupee"></i> {data.data.price}</h5>
                        <div><i className="bi bi-star-fill text-warning"></i> {data.data.rating}</div>
                        <div className="mt-3">
                            <button className="btn btn-warning">Add cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}