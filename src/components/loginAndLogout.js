import {useRouter} from "next/navigation";
import {logoutUser} from "@/service/loginService";



export default function LoginAndLogout() {
    const router = useRouter()

    const handleLogin = () => {
        // 백엔드에서 설정한 OAuth2 리다이렉트 URL
        window.location.href = 'http://localhost:8080/oauth2/authorization/google'
    }
    const handlelogout  = async () => {
        const result = await logoutUser();
        console.log(result);
        console.log("로그아웃 호출 성공")


        if (result) {
            alert('로그아웃 성공!');
            router.push("/");
        } else {
            alert('로그아웃 실패');
        }
        window.location.href = 'http://localhost:8080/logout'
    }

    return (
        <div className="flex justify-end items-center w-full h-full gap-2">

            <button
                onClick={handleLogin}
                className="bg-blue-500 text-black w-20 h-10 p-2 rounded-xl "
            >
                로그인
            </button>

            <button
                onClick={handlelogout}
                className="bg-blue-500 text-black w-20 h-10 p-2 rounded-xl "
                >
                로그아웃
            </button>

        </div>
    )
}