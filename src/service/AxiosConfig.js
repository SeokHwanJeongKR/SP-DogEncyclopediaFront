import axios from "axios";
import Cookies from "js-cookie";

const API_ORIGIN = "http://localhost:8080";

//먼저 요청 보내는 코드임
export const axiosAuthRequest = axios.create({
    baseURL: API_ORIGIN,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true

})


//AccessToken 갱신하는 코드
export const reissueAccessToken = async() => {

    const refreshToken = Cookies.get('refreshToken');

    console.log("refreshToken "+refreshToken);

    const response = await axiosAuthRequest.post("/api/auth/reissue", {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            refreshToken: refreshToken,

        },

    });
    return response.data
};

axiosAuthRequest.interceptors.request.use(async (config) => {
    const isReissueRequest = config.url?.includes("/api/auth/reissue");

    if (!isReissueRequest) {
        let accessToken = Cookies.get("accessToken");
        console.log("accessToken try문 밖", accessToken);

        if (!accessToken) {
            console.log("accessToken 없음 → 재발급 시도");

            try {
                const res = await reissueAccessToken()
                console.log("res = ", res);
                accessToken = res.accessToken;
                console.log("accessToken 재발급 성공 =", accessToken);
            } catch (err) {
                console.error("accessToken 재발급 실패 =", err.response?.data || err.message);
                throw err;
            }
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log("Authorization 헤더 추가 완료");
        }
    }

    return config;
});



  







