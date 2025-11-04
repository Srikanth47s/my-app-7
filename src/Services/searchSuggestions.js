import API_URL from "../apis/apiInstances"
import ENDS_URL from "../apis/ends"

export const SEARCH_SUGGESTION_URL = async (data) => {
    return await API_URL.post(ENDS_URL.SEARCH_SUGGESTIONS, data);
}