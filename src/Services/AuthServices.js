import API_URL from "../apis/apiInstances"
import ENDS_URL from "../apis/ends";


export const SIGN_IN_URL = async (data) => {
    return await API_URL.post(ENDS_URL.LOG_IN, data);
}

export const SIGN_UP_URL = async (data) => {
    return await API_URL.post(ENDS_URL.SIGN_UP, data);
}

export const RESET_PASSWORD_URL = async (data) => {
    return await API_URL.post(ENDS_URL.FORGOT_PASSWORD, data);
}


