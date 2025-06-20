import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";


const API_ORIGIN = "http://localhost:8080";

export const getSearchResult = async (keyword) => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/search/both`, {
            params: { keyword }
        });
        return response.data;
    } catch (error) {
        console.error("검색 실패",error)
        throw new Error("검색 실패");
    }

}
