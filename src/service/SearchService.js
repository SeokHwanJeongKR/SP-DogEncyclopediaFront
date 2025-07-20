import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";


const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

export const getSearchResult = async (keyword) => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/search/both`, {
            params: { keyword }
        });
        return response.data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("검색 실패", error)
        }
        throw new Error("검색 실패");
    }

}
