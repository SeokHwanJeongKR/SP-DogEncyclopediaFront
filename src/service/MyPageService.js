import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

const API_ORIGIN = "http://localhost:8080";


export const getAllMyPosts= async (page) => {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/myPage/all/post/${page}`);
        return response.data;
    } catch (error) {
        console.error("내가 쓴 게시물들 조회 실패",error)
        throw new Error("내가 쓴 게시물들 조회 실패");
    }

}

export const getAllMyLikedPosts= async (page) => {
    try {
        const response = await axiosAuthRequest.get(`${API_ORIGIN}/api/myPage/all/likedPost/${page}`);
        return response.data;
    } catch (error) {
        console.error("내가 쓴 게시물들 조회 실패",error)
        throw new Error("내가 쓴 게시물들 조회 실패");
    }

}

