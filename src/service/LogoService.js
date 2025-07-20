import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

export async function createOrUpdateLogo(formData) {
    try {
        const response = await axiosAuthRequest.put("/api/logo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("로고 등록 혹은 수정 실패 ", error)
        }
        throw new Error("로고 등록 혹은 수정 실패")
    }
}


export const getLogo = async () => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/logo`);
        return response.data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("로고 조회 실패", error)
        }
        throw new Error("로고 조회  실패");
    }

}

