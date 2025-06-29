import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";
const API_ORIGIN = "http://localhost:8080";

export async function openChat() {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/chat`)

        return response.data;

    } catch (error) {
        console.log("chat 오픈 실패 ",error)
        throw new Error("chat 오픈 실패")
    }
}


export async function adminChat(userId) {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/chat/with/${userId}`);

        return response.data;

    } catch (error) {
        console.log("admin chat 오픈 실패 ",error)
        throw new Error("admin chat 오픈 실패")
    }
}

export async function sendMessage(data) {
    try {
        const response = await axiosAuthRequest.post(`${API_ORIGIN}/api/chat/send`,data);

        return response.data;

    } catch (error) {
        console.log("메세지 전송 실패 ",error)
        throw new Error("메세지 전송 오픈 실패")
    }
}

export async function getChatList() {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/chat/list`);

        return response.data;
    } catch (error) {
        console.log("room list 조회 실패")
        throw  new Error("room list 조회 실패")
    }
}