import API_URL from "../apis/apiInstances"
import ENDS_URL from "../apis/ends"

export const ADDRESS_VIEW_API = async (data) => {
    return await API_URL.post(ENDS_URL.ADDRESS_VIEW, data);
}

export const ADDRESS_ADD_API = async (data) => {
    return await API_URL.post(ENDS_URL.ADDRESS_ADD, data);
}

export const ADDRESS_DELETE_API = async (data) => {
    return await API_URL.post(ENDS_URL.ADDRESS_DELETE, data);
}