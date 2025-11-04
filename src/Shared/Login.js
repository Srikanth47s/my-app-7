import { useState } from 'react'
import logo from '../Logos/Amazon_logo.webp'
import emailTest, { checkUserLogin } from '../Utils/util';
import { SIGNIN } from '../apis/errors';
import { SIGN_IN_URL } from '../Services/AuthServices';
import { Link } from 'react-router-dom';

export function Login() {

    let isUserLogin = checkUserLogin();
    if (isUserLogin == true) {
        window.location = '/';
    }

    let [login, setLogin] = useState({ email: '', password: '' });
    let [loginErors, setLoginErrors] = useState({ errorEmail: false, errorPasword: false, apiError: false });


    let hadleLogin = async () => {
        let tempErrors = { ...loginErors }
        let hasError = false;
        if (!emailTest(login.email)) {
            tempErrors = { ...tempErrors, errorEmail: true }
            hasError = true;
        } else {
            tempErrors = { ...tempErrors, errorEmail: false }
        }

        if (login.password.length < 6) {
            tempErrors = { ...tempErrors, errorPasword: true }
            hasError = true;
        } else {
            tempErrors = { ...tempErrors, errorPasword: false }
        }

        setLoginErrors({ ...tempErrors });

        if (hasError == false) {
            try{
                let apiResponce = await SIGN_IN_URL({ ...login })
     
                if (apiResponce.data.result == 'SUCCESS') {
                    setLoginErrors({...loginErors, apiError: false})
                    localStorage.setItem('user', JSON.stringify(apiResponce.data.data))
                    localStorage.setItem('userNum', 1);
                    window.location = '/';
                }else{
                    setLoginErrors({...loginErors, apiError: true})
                }

            }catch(err){
                console.log(err.message)                
            }
                

            

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
                                <h3 className="card-title">Login</h3>
                            </div>
                            <div className='mb-3'>
                                <strong>Email</strong>
                                <input type='email' placeholder='Enter your email' className='form-control' onChange={e => setLogin({ ...login, email: e.target.value })} />
                                <div className='text-danger'>
                                    {loginErors.errorEmail == true && <small>{SIGNIN.EMAIL_ERROR}</small>}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <strong>Password (at least 6 characters)</strong>
                                <input type='password' placeholder='Enter password' className='form-control' onChange={e => setLogin({ ...login, password: e.target.value })} />
                                <div className='text-danger'>
                                    {loginErors.errorPasword == true && <small>{SIGNIN.PASSWORD_ERROR}</small>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <i className="bi bi-info-circle-fill text-primary"></i> <small>Passwords must be at least 6 characters.</small>
                                <div>
                                    <Link to='/reset-password'>reset password ?</Link>
                                </div>
                            </div>


                            <div className='mb-3 d-grid'>
                                <button className='btn btn-warning' onClick={e => hadleLogin()}>Login</button>
                                <div className='text-danger'>
                                    {loginErors.apiError == true && <small>{SIGNIN.API_ERROR}</small>}
                                </div>
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