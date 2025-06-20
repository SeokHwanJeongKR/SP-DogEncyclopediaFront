import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";
const API_ORIGIN = "http://localhost:8080";

export async function createEvent(formData) {
    try {
        const response = await axiosAuthRequest.post("api/event", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;

    } catch (error) {
        console.log("이벤트 작성 실패 ",error)
        throw new Error("이벤트 작성 실패")
    }
}
export async function updateEvent(formData,postId) {
    try {
        const response = await axiosAuthRequest.put(`api/event/${postId}`,   formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;

    } catch (error) {
        console.log("이벤트 작성 실패 ",error)
        throw new Error("이벤트 작성 실패")
    }
}
export async function deleteEvent(postId) {
    try {
        const response = await axiosAuthRequest.delete(`api/event/${postId}`);
        return response.data

    } catch (error) {
        console.error("이벤트 삭제 실패", error)
        throw new Error("이벤트 삭제 실패");
    }
}

export const getAllEvent = async () => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/event/allEvent`);
        return response.data;
    } catch (error) {
        console.error("전체 이벤트 조회 실패",error)
        throw new Error("전체 이벤트 조회  실패");
    }

}

export const getEvent = async (postId) => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/event/${postId}`);
        return response.data;
    } catch (error) {
        console.error("이벤트 조회 실패",error)
        throw new Error("이벤트 조회  실패");
    }

}