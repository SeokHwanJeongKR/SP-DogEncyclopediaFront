import Cookies from "js-cookie";
import {axiosAuthRequest} from "@/service/AxiosConfig";
import axios from "axios";

export async function logoutUser() {

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get('refreshToken');

    console.log("accessToken : "+accessToken);
    console.log("refreshToken : "+refreshToken);
    console.log("로그아웃 api 호출 성공")


    try {
        const response = await axiosAuthRequest.delete('/api/auth/logout', {
            headers: {
                'refreshToken': refreshToken
            },
        });

        // 쿠키 정리
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        return response.data;

    } catch (error) {
        console.error("logout 실패", error);
        throw new Error("logout 실패");
    }

}


export async function getMemberInfo() {
    console.log("유저 조회 api 호출 시도");

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    try {
        const response = await axiosAuthRequest.get(`/api/member`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                refreshToken: refreshToken
            },
        });
        return response.data;

    } catch (error) {
        console.error("유저 정보 조회 실패", error);
        throw new Error("유저 정보 조회 실패");
    }
}
