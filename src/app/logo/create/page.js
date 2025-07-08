'use client'

import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import {useRouter} from "next/navigation";
import {createOrUpdateLogo} from "@/service/LogoService";
import {getMemberInfo} from "@/service/loginService";


export default function AddPost() {

    const router = useRouter();

    const [image, setImage] = useState(null);

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0]// 최대 1개

        if (!file) return;

        if (e.target.files.length > 1) {
            alert("사진은 최대 1개까지만 등록할 수 있습니다.");
        }

        setImage(file);

        // 미리보기 URL 생성
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };


    const handleSubmit = async (e) => {
        //새로고침 막기
        e.preventDefault();

        const data = new FormData();

        if(!image) {
            alert("사진을 넣어주세요.");
            return; // 등록 막기
        }

        //data에 담기
        data.append('image', image);

        const result = await createOrUpdateLogo(data);

        if (result) {
            alert('등록 성공!');
            router.push("/main");
        } else {
            alert('등록 실패');
        }
    }

    const [loginedUser, setLoginedUser] = useState("");

    useEffect(() => {
        async function loadMember() {
            try {
                const user = await getMemberInfo();
                setLoginedUser(user);
                console.log(user);
            } catch (error) {
                console.log("유저 정보 조회에 실패 했습니다.",error);
            }
        }

        loadMember();
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full h-full min-h-screen bg-white">


                <div className="flex w-full justify-center h-230 bg-white">

                    {/* 왼쪽 여백 공간 */}
                    <div className="bg-white w-full h-full">

                    </div>

                    <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">



                        <div className="w-full">
                            <TopBar loginedUser={loginedUser}/>
                        </div>

                        <div className="h-5">

                        </div>
                        <div className="flex justify-start p-1 w-full items-center text-gray-700 font-bold text-2xl">
                            <p>
                                Logo 등록
                            </p>
                        </div>


                        {/* 사진 등록 */}
                        <div className="bg-white p-1 w-full">

                            <div className="flex justify-between items-center mb-1">
                                <p className="cursor-default text-gray-700 mb-2 text-sm font-semibold">사진 등록</p>

                                {/* label로 클릭시 파일선택창 열리게 */}
                                <label htmlFor="imageUpload"
                                       className="text-xs font-semibold text-gray-700  cursor-pointer hover:underline">
                                    [+] 사진 추가하기
                                </label>

                                {/* 실제 파일 선택 input은 숨김 */}
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept=".jpg,.jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            {/* 미리보기 이미지 출력 */}
                            <div className="flex justify-start gap-2 items-center p-1">

                                <div className="bg-gray-200 w-13 h-13 rounded-xs overflow-hidden flex items-center justify-center">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt={`Logo사진`}
                                             className="w-full h-full object-cover"/>
                                    ) : (
                                        <span
                                            className="text-[8px] text-gray-500 cursor-default">사진 없음</span>
                                    )}
                                </div>

                            </div>

                        </div>


                        {/* 등록 버튼 */}
                        <div className="flex w-full justify-end items-center gap-2 p-2">
                            <button
                                type="submit"
                                className="mt-3 w-25 bg-orange-300 border-orange-300 border-2 text-black py-2 rounded-lg hover:bg-orange-400 transition hover:cursor-pointer "
                            >
                                등록
                            </button>
                        </div>

                    </div>

                    {/* 우측 여백 공간 */}
                    <div className="bg-gray-50 w-full h-full">

                    </div>


                </div>

            </div>
        </form>
    )
}