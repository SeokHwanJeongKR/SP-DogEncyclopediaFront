import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

const API_ORIGIN = "http://localhost:8080";

export async function createPost(formData) {
    try {
        const response = await axiosAuthRequest.post("/api/board", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;

    } catch (error) {
        console.log("게시글 작성 실패 ",error)
        throw new Error("게시글 작성 실패")
    }
}
export async function updatePost(formData,postId) {
    try {
        const response = await axiosAuthRequest.put(`/api/board/${postId}`,   formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;

    } catch (error) {
        console.log("게시글 작성 실패 ",error)
        throw new Error("게시글 작성 실패")
    }
}
export async function deletePost(postId) {
    try {
        const response = await axiosAuthRequest.delete(`/api/board/${postId}`);
        return response.data

    } catch (error) {
        console.error("게시글 삭제 실패", error)
        throw new Error("게시글 삭제 실패");
    }
}

export const getTop2Post = async () => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/board/top2`);
        return response.data;
    } catch (error) {
        console.error("Updated Top2 조회 실패",error)
        throw new Error("Updated Top2 조회  실패");
    }

}

export const getPost = async (postId) => {
    try {

        const response = await axios.get(`${API_ORIGIN}/api/board/${postId}`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("게시글 조회 실패",error)
        throw new Error("게시글 조회  실패");
    }

}

export const getAllPost = async (page) => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/board/all/${page}`);
        return response.data;
    } catch (error) {
        console.error("전체 게시글 조회 실패",error)
        throw new Error("전체 게시글 조회  실패");
    }

}
export const changeLike = async (postId) => {

    try {
        const response = await axiosAuthRequest.post(`/api/board/like/${postId}`);
        return response.data;

    } catch (error) {
        console.log("좋아요 수정 실패 ",error)
        throw new Error("좋아요 수정 실패")
    }

}
