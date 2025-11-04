import { use, useState } from 'react'
import logo from '../Logos/Amazon_logo.webp'
import emailTest from '../Utils/util';
import { RESET_PASSWORD } from '../apis/errors';
import { RESET_PASSWORD_URL } from '../Services/AuthServices';

export default function ResetPassword() {

    let [email, setEmail] = useState("")
    let [errors, setErrors] = useState({ emailError: false, apiError: false })
    let [apimsg, setApiMsg] = useState("");

    let handleResetPassword = async () => {
        let tempErrors = { ...errors }
        let hasError = false;
        if (!emailTest(email)) {
            tempErrors = { ...tempErrors, emailError: true }
            hasError = true;
        } else {
            tempErrors = { ...tempErrors, emailError: false }
        }

        setErrors({ ...tempErrors })

        if (hasError == false) {
            try {
                let apiResponce = await RESET_PASSWORD_URL({ email: email })

                setErrors({ ...errors, apiError: false })
                if (apiResponce.data.result == 'SUCCESS') {
                    setApiMsg(apiResponce.data.message);
                } else {
                    setApiMsg("");
                    setErrors({ ...errors, apiError: true })
                }
            } catch (err) {
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
                                <h3 className="card-title">Reset password</h3>
                            </div>
                            <div className='mb-3'>
                                <strong>Email</strong>
                                <input type='email' placeholder='Enter your email'
                                    className='form-control' onChange={e => setEmail(e.target.value)} />
                                <div className='text-danger'>
                                    {
                                        errors.emailError == true && <small>{RESET_PASSWORD.EMAIL_ERROR}</small>
                                    }
                                </div>
                            </div>



                            <div className='mb-3 d-grid'>
                                <button className='btn btn-warning' onClick={e => handleResetPassword()}>Reset passwoed</button>
                                <div className='text-danger'>
                                    {
                                        errors.apiError == true && 'Email is not registered'
                                    }
                                </div>
                                <div className='text-success'>
                                    {apimsg}
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