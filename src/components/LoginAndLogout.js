import {useRouter} from "next/navigation";
import {getMemberInfo, logoutUser} from "@/service/loginService";
import {useEffect, useState} from "react";



export default function LoginAndLogout() {

    const router = useRouter()

    const handleLogin = () => {
        // 백엔드에서 설정한 OAuth2 리다이렉트 URL
        window.location.href = 'http://localhost:8080/oauth2/authorization/google'
    }
    const handleLogout = async () => {
        const result = await logoutUser();
        if (result) {
            alert("로그아웃이 성공 했습니다.")
            router.push("/");
        } else {
            alert("로그아웃이 실패 했습니다.")
        }
    }

    const handleMypage = () => {
        window.location.href = 'http://localhost:3000/mypage';
    }

    const [memberName, setMemberName] = useState("");
    const [memberProfile, setMemberProfile] = useState("");

    useEffect(() => {
        async function loadMember() {
            try {
                const user = await getMemberInfo();
                setMemberName(user.nickname);
                setMemberProfile(user.profileImageUrl);
                console.log(user);
            } catch (error) {
                console.log("유저 정보 조회에 실패 했습니다.",error);
            }
        }

        loadMember();
    }, []);
    return (
        <div className="flex justify-end items-center w-full h-full gap-2">


            {!memberName && (
                <button
                    type="button"
                    onClick={handleLogin}
                    className="flex justify-center w-20 h-8 items-center bg-white rounded-xl hover:font-semibold"
                >
                    로그인
                </button>
            )}

            {memberName ? (
                <div className="flex justify-end items-center w-full h-full">

                    <div className="flex justify-center items-center w-full h-full gap-2">
                        <img className=" w-12 h-12 rounded-full" src={memberProfile} alt="profile"/>
                        <p>
                            &#39;{memberName}&#39; 님 반갑습니다.
                        </p>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex justify-center w-20 h-8 items-center bg-white rounded-xl hover:font-semibold "
                        >
                            로그아웃
                        </button>

                        <button
                            type="button"
                            onClick={handleMypage}
                            className="flex justify-center w-20 h-8 items-center bg-white rounded-xl hover:font-semibold "
                        >
                            마이페이지
                        </button>
                    </div>

                </div>


            ) : null}

        </div>
    )
}