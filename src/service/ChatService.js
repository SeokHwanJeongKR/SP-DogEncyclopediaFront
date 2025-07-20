import {axiosAuthRequest} from "@/service/AxiosConfig";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

export async function openChat() {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/chat`)

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("chat 오픈 실패 ", error)
        }
        throw new Error("chat 오픈 실패")
    }
}


export async function adminChat(userId) {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/chat/with/${userId}`);

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("admin chat 오픈 실패 ", error)
        }
        throw new Error("admin chat 오픈 실패")
    }
}

export async function sendMessage(data) {
    try {
        const response = await axiosAuthRequest.post(`${API_ORIGIN}/api/chat/send`,data);

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("메세지 전송 실패 ", error)
        }
        throw new Error("메세지 전송 오픈 실패")
    }
}

export async function getChatList() {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/chat/list`);

        return response.data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("room list 조회 실패")
        }
        throw  new Error("room list 조회 실패")
    }
}