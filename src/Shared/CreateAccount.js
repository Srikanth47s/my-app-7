import { use, useState } from 'react'
import logo from '../Logos/Amazon_logo.webp'
import emailTest, { checkUserLogin } from '../Utils/util';
import { SIGN_UP_URL } from '../Services/AuthServices';
import { SIGN_UP_ERRORS } from '../apis/errors';
export function CreateAccount() {
    let isUserLogin = checkUserLogin();
    if(isUserLogin == true){
        window.location = '/';
    }

    let [signup, setSignUp] = useState({name:'',email:'',mobile:'', password:''});
    let [errors, setErrors] = useState({errorName: false, errorMobile: false, errorEmail: false, errorPassword: false});

    function  handleName(e){
        setSignUp({...signup, name: e.target.value});
    }

    function  handlemobile(e){
        setSignUp({...signup, mobile: e.target.value});
    }
    function  handleEmail(e){
        setSignUp({...signup, email: e.target.value});
    }
    function  handlePassword(e){
        setSignUp({...signup, password: e.target.value});
    }

   async function handleButton(){

        let errorCount = false;
        let tempErrors = {...errors}

        if(signup.name.length < 3){
            tempErrors = {...tempErrors, errorName: true};
            errorCount = true;
        }else{
            tempErrors = {...tempErrors, errorName: false};           
        }

        if(signup.mobile.length != 10){
            tempErrors = {...tempErrors, errorMobile: true};
            errorCount = true;
        }else{
            tempErrors = {...tempErrors, errorMobile: false};           
        }

        if(!emailTest(signup.email)){
           tempErrors ={...tempErrors, errorEmail: true};
           errorCount = true;
        }else{
            tempErrors ={...tempErrors, errorEmail: false};
        }
        
        if(signup.password.length < 6){
           tempErrors ={...tempErrors, errorPassword: true};
           errorCount = true;
        }else{
            tempErrors ={...tempErrors, errorPassword: false};
        }
        setErrors({...tempErrors});


        try{
             if(errorCount == false){
            let apiResponce =  await SIGN_UP_URL({...signup})

            console.log(apiResponce)
        
            if(apiResponce.data.result == 'SUCCESS'){
                localStorage.setItem('user', JSON.stringify(apiResponce.data.data))
                localStorage.setItem('token', apiResponce.data.data.token)
                localStorage.setItem('userNum',1);
                window.location = '/';
            }
            
        }
        }catch(er){
            console.log(er.message)
        }
       
        
    }



    return (
        <div className="container-fluid">
            <div className='row justify-content-center mt-3'>
                <div className='col-3'>
                    <div className='text-center'>
                        <img src={logo} className='logo-size' />
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            <div className='mb-3'>
                                <h3 className="card-title">Create Account</h3>
                            </div>
                            <div className='mb-3'>
                                <strong>Your name</strong>
                                <input type='text' placeholder='First and last name' className='form-control' onChange={e => handleName(e)} />
                                <div className='text-danger'>
                                    {errors.errorName == true && <small>{SIGN_UP_ERRORS.NAME_ERROR}</small>}
                                </div>
                            </div>
                            <div className='mb-3'> 
                                <strong>Email</strong>
                                <input type='email' placeholder='Enter your email' className='form-control' onChange={e => handleEmail(e)} />
                                <div className='text-danger'>
                                    {errors.errorEmail == true && <small>{SIGN_UP_ERRORS.EMAIL_ERROR}</small>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <strong>Mobile</strong>
                                <input type='text' placeholder='Enter mobile' className='form-control' onChange={e => handlemobile(e)} />
                                <div className='text-danger'>
                                    {errors.errorMobile == true && <small>{SIGN_UP_ERRORS.MOBILE_ERROR}</small>}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <strong>Password (at least 6 characters)</strong>
                                <input type='password' placeholder='Enter password' className='form-control' onChange={e => handlePassword(e)}/>
                                <div className='text-danger'>
                                    {errors.errorPassword == true && <small>{SIGN_UP_ERRORS.PASSWORD_ERROR}</small>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <i className="bi bi-info-circle-fill text-primary"></i> <small>Passwords must be at least 6 characters.</small>
                            </div>
                            <div className='mb-3'>
                                <small>To verify your mobile, we will send you a text message with a temporary code. Message and data rates may apply.</small>
                            </div>
                            <div className='mb-5 d-grid'>
                                <button className='btn btn-warning' onClick={e => handleButton()}>Create Account</button>
                            </div>
                            <div className='mb-3'>
                                <hr />
                            </div>
                            <div className='mb-3'>
                                <strong>Already a customer?</strong>
                                <div>
                                    <a className='link-underline link-underline-opacity-0' href='/login'><small>Sign in instead</small></a>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <hr />
                            </div>
                            <div className='mb-4'>
                                <strong>Buying for work?</strong>
                                <div>
                                    <a className='link-underline link-underline-opacity-0' href='#'><small>Create a free business account</small></a>
                                </div>
                            </div>
                            <div>
                                <small>By creating an account or logging in, you agree to Amazon’s <span><a href='#'>Conditions of Use</a></span> and <span><a href='#'> Privacy Policy.</a></span></small>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div className='row container-fluid mt-4' >
                <hr className='border border-1 opacity-100' />
            </div>
            <div className='row justify-content-center mt-4 mb-5'>
                <div className='col-4'>
                    <ul className='nav justify-content-center '>
                        <li className='nav-item'><a className='nav-link' href='#'><small>Conditions of Use</small></a> </li>
                        <li className='nav-item'><a className='nav-link' href='#'><small>Privacy</small></a> </li>
                        <li className='nav-item'><a className='nav-link' href='#'><small>Notice Help</small></a> </li>
                    </ul>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-4 text-center'>
                        <small>© 1996-2025, Amazon.com, Inc. or its affiliates</small>
                    </div>
                </div>
            </div>



        </div>
    )
}