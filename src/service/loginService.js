import Cookies from "js-cookie";
import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

export async function logoutUser() {

    console.log("로그아웃 api 호출 시도")

    try {
        const response = await axiosAuthRequest.delete('/api/auth/logout');

        // 쿠키 정리
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("logout 실패", error);
        }
        throw new Error("logout 실패");
    }

}


export async function getMemberInfo() {

    try {
        const response = await axiosAuthRequest.get(`/api/member`);
        return response.data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("유저 정보 조회 실패", error);
        }
        throw new Error("유저 정보 조회 실패");
    }
}
