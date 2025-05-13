'use client'

import {getMemberInfo} from "@/service/loginService";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {reissueAccessToken} from "@/service/AxiosConfig";

export default function TestPage() {

    const [memberInfo, setMemberInfo] = useState(null);
    const router = useRouter();

    const handleReissueToken = async () => {
        await reissueAccessToken();
    }

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');


        if (!accessToken && !refreshToken) {
            alert('로그인이 필요합니다.');
            window.location.href = 'http://localhost:8080/oauth2/authorization/google'
            return;
        }

        async function getInfo() {
            try {
                const response = await getMemberInfo();
                setMemberInfo(response);
                console.log(response);
            } catch (error) {
                console.log("유저 정보 조회 실패",error);
            }
        }
        getInfo()
    }, []);

    return (
        <div>
            <p>Access 토큰 및 Refresh Token Test</p>
            <p>{memberInfo?.id}</p>
            <p>{memberInfo?.email}</p>
            <p>{memberInfo?.nickname}</p>
            <p>{memberInfo?.provider}</p>
            <p>{memberInfo?.createdAt}</p>
            <p>{memberInfo?.role}</p>
            <p>{memberInfo?.message}</p>
            <button
                onClick={handleReissueToken}
                className="bg-blue-500 text-black w-20 h-10 p-2 rounded-xl "
            >
                로그인
            </button>
        </div>

    )
}