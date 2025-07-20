import {useRouter} from "next/navigation";
import {getMemberInfo, logoutUser} from "@/service/loginService";
import { useEffect, useState} from "react";

export default function LoginAndLogout() {

    const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const [user, setUser] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberProfile, setMemberProfile] = useState("");

    const handleLogin = () => {
        // 백엔드에서 설정한 OAuth2 리다이렉트 URL
        window.location.href = `${API_ORIGIN}/oauth2/authorization/google`
    }

    const handleOpenLoginModal = () => {
        setIsOpen(true)
    }
    const handleCloseLoginModal = () => {
        setIsOpen(false)
    }

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result) {
            alert("로그아웃이 성공 했습니다.")
            setUser("");
            setMemberName("");
            setMemberProfile("");
            router.push("/main");
        } else {
            alert("로그아웃이 실패 했습니다.")
        }
    }

    const handleMypage = () => {
        router.push("/mypage");
    }


    useEffect(() => {
        async function loadMember() {
            try {

                const user = await getMemberInfo();
                setUser(user);
                setMemberName(user.nickname);
                setMemberProfile(user.profileImageUrl);
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                    console.log("유저 정보 조회에 실패 했습니다.", error);
                }
            }
        }

        loadMember();
    }, []);

    return (
        <div className="flex justify-end items-center w-full h-full gap-2">


            {!memberName && (
                <button
                    type="button"
                    onClick={handleOpenLoginModal}
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

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 flex flex-col gap-4 items-center shadow-xl w-150">
                        <p className="text-xl">처음 가입하시는 분은 자동으로 회원가입이 됩니다.</p>
                        <br/>
                        <p>로그인 하시겠습니까?</p>
                        <br/>
                        <div className="flex gap-4">
                            <button
                                onClick={handleLogin}
                                className="px-4 py-2 rounded bg-orange-400 text-white hover:bg-orange-500"
                            >
                                Google 로그인
                            </button>
                            <button
                                onClick={handleCloseLoginModal}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}