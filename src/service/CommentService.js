import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

export async function createComment(formData) {
    try {
        const response = await axiosAuthRequest.post(`${API_ORIGIN}/api/comment`, formData);

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("Comment 생성 실패 ", error)
        }
        throw new Error("Comment 생성 실패")
    }
}


export async function getCommentList(postId) {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/comment/${postId}`);

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("Comments 조회 실패 ", error)
        }
        throw new Error("Comments 조회 실패")
    }
}


export async function updateComment(commentId ,formData) {
    try {
        const response = await axiosAuthRequest.put(`${API_ORIGIN}/api/comment/${commentId}`, formData);

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("Comment 수정 실패 ", error)
        }
        throw new Error("Comment 수정 실패")
    }
}

export async function deleteComment (commentId) {
    try {
        const response = await axiosAuthRequest.delete(`${API_ORIGIN}/api/comment/${commentId}`);

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("Comment 삭제 실패 ", error)
        }
        throw new Error("Comment 삭제 실패")
    }
}
