import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

const API_ORIGIN = "http://localhost:8080";

export async function createPedia(formData) {
    try {
        const response = await axiosAuthRequest.post(`${API_ORIGIN}/api/pedia`, formData, {
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
export async function updatePedia (formData,postId) {
    try {
        const response = await axiosAuthRequest.put(`${API_ORIGIN}/api/pedia/${postId}`,   formData, {
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
export async function deletePedia (postId) {
    try {
        const response = await axiosAuthRequest.delete(`${API_ORIGIN}/api/pedia/${postId}`);
        return response.data

    } catch (error) {
        console.error("게시글 삭제 실패", error)
        throw new Error("게시글 삭제 실패");
    }
}


export const getPedia = async (postId) => {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/pedia/${postId}`);
        return response.data;
    } catch (error) {
        console.error("게시글 조회 실패",error)
        throw new Error("게시글 조회  실패");
    }

}

export const getTop12Pedia = async () => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/pedia/top12`);
        return response.data;
    } catch (error) {
        console.error("Top12 조회 실패",error)
        throw new Error("Top12 조회  실패");
    }

}

export const getAllPedia = async (page) => {
    try {
        const response = await axios.get(`${API_ORIGIN}/api/pedia/all/${page}`);
        return response.data;
    } catch (error) {
        console.error("전체 게시글 조회 실패",error)
        throw new Error("전체 게시글 조회  실패");
    }

}

export async function createPediaEditRequest(formData) {
    try {
        const response = await axiosAuthRequest.post(`${API_ORIGIN}/api/pedia/editRequest`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        return response.data;

    } catch (error) {
        console.log("게시글 수정 요청 실패 ",error)
        throw new Error("게시글 수정 요청  실패")
    }
}


export const getAllEditRequests = async (page) => {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/pedia/editRequest/all/${page}`);
        return response.data;
    } catch (error) {
        console.log("모든 백과 수정 요청 조회 실패",error)
        throw new Error("모든 백과 수정 요청 조회 실패")
    }
}

export const getEditRequest = async (id) => {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/pedia/editRequest/${id}`);
        return response.data;
    } catch (error) {
        console.log(" 백과 수정 요청 조회 실패",error)
        throw new Error(" 백과 수정 요청 조회 실패")
    }
}

export const editRequestAccept = async (formData) => {
    try {
        const response = await axiosAuthRequest.post(`${API_ORIGIN}/api/pedia/editRequest/accept`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })


        return response.data;
    } catch (error) {
        console.log(" 백과 수정 요청 승인 실패",error)
        throw new Error(" 백과 수정 요청 승인 실패")
    }
}