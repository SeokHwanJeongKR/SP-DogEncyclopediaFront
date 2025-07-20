import axios from "axios";
import Cookies from "js-cookie";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

//먼저 요청 보내는 코드임
export const axiosAuthRequest = axios.create({
    baseURL: API_ORIGIN,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true

})


//AccessToken 갱신하는 코드
export const reissueAccessToken = async () => {
    try {
        const response = await axiosAuthRequest.post("/api/auth/reissue", {}, {
            withCredentials: true // 반드시 있어야 함
        });
        if (process.env.NODE_ENV === "development") {
            console.log("accessToken 재발급 성공");
        }
        return response.data;
    } catch (err) {
        if (process.env.NODE_ENV === "development") {
        console.error("accessToken 재발급 실패", err.response?.data || err.message);
        }
        throw err;
    }
};

axiosAuthRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //401 Unauthorized && 재시도하지 않은 요청만 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await reissueAccessToken(); // 쿠키 갱신 요청
                if (process.env.NODE_ENV === "development") {
                    console.log("원래 요청 재시도");
                }
                return axiosAuthRequest(originalRequest); // 실패했던 요청 재시도
            } catch (e) {
                if (process.env.NODE_ENV === "development") {
                    console.error("재발급 실패, 로그아웃 등 처리 필요");
                }
                // 로그아웃 처리나 리디렉션
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);


  







