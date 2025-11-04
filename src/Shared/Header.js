import { Link } from "react-router-dom";
import { checkUserLogin } from "../Utils/util"
import { useState } from "react";
import { SEARCH_SUGGESTION_URL } from "../Services/searchSuggestions";

export function Header() {

    let userLogin = checkUserLogin();

    let [searchDropDownList, setSearchDropDownList] = useState(false);

    let SearchText = "";
    let [SuggetionList, setSuggetionList] = useState([]);

    let handleLogout = () => {
        let userNum = localStorage.getItem('userNum');
        localStorage.clear();
        localStorage.setItem('userNum', userNum)
        window.location = '/';
    }

    let handleSearchText = async (e) => {
        let inputText = e.target.value.replace(/\s/g, "")
        SearchText = inputText;
        if(inputText.length > 0){
            setSearchDropDownList(true)
           let apiResponce = await SEARCH_SUGGESTION_URL({searchWord: inputText})
        //    console.log(apiResponce.data.data)
           let tempSugggestios = apiResponce.data.data.map(suggestion => {
            return suggestion.value
           })
           setSuggetionList(tempSugggestios);
        //    console.log(SuggetionList)
        }else{
            setSuggetionList([]);
            setSearchDropDownList(false)
        }
    }

    let handleSigleSuggetion = (suggestion) => {
        console.log(suggestion)
        window.location = '/product-search?keyword=' + suggestion;
    }



    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand">Amazon</a>

                <div className="input-group">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action before</a></li>
                        <li><a className="dropdown-item" href="#">Another action before</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                    <input type="text" className="form-control" onChange={ e => handleSearchText(e)} />
                    <button className="btn btn-outline-secondary " type="button"><i className="bi bi-search"></i></button>
                    {
                        searchDropDownList == true && <div className="search-dropdown">
                            <div>
                                {
                                    SuggetionList.map((suggestion , i) => (
                                        <div key={i} className="suugetion-item" onClick={ e => handleSigleSuggetion(suggestion)}> {suggestion} </div>
                                    ))
                                }
                            </div>
                            
                        </div>
                    }

                </div>

                <div className="d-flex">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/price">Price</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div>

                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Hello, user <span className="fw-bold">Account</span>
                            </button>
                            {
                                userLogin == false &&
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/signup">New customer? <span className="text-primary">Start here.</span></Link></li>
                                </ul>
                            }
                            {
                                userLogin == true &&
                                <ul className="dropdown-menu">
                                    <li><Link to= '/cart' className="dropdown-item"><i className="bi bi-cart4 text-primary"></i> Cart</Link></li>
                                    <li><Link to= '/address' className="dropdown-item">Manage address</Link></li>
                                    <li><a className="dropdown-item" onClick={e => handleLogout()}>Logout</a></li>
                                    
                                </ul>
                            }

                        </div>

                    </div>
                </div>

            </div>
        </nav>
    )
}