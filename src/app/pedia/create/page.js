'use client'

import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import {createPedia} from "@/service/PediaService";
import { useRouter } from "next/navigation";
import {getMemberInfo} from "@/service/loginService";


export default function AddPost() {

    const router = useRouter();

    const [formData, setFormData] = useState(
        {
            name: "",
            origin: "",
            size: "",
            parentingLevel: "",
            sheddingLevel: "",
            walkLevel: "",
            recommendedExercise: "",
            barkingLevel: "",
            personality: "",
              diseases: "",
            history: "",
        });

    const [images, setImages] = useState([]);

    const [previewUrls, setPreviewUrls] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 숫자 필드일 경우
        if (
            ["parentingLevel", "sheddingLevel", "walkLevel", "barkingLevel"].includes(name)
        ) {
            // 빈 문자열 허용 (지울 수 있게)
            if (value === "") {
                setFormData((prev) => ({
                    ...prev,
                    [name]: "",
                }));
                return;
            }
            const numericValue = Number(value);
            // 유효 범위 검사
            if (numericValue < 1 || numericValue > 5) return;
        }

        // 나머지 필드는 그대로 처리
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 보이는 사진 (그림)
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[0] = file;  // index 0에 이미지 파일
            setImages(newImages);

            const newPreviewUrls = [...previewUrls];
            newPreviewUrls[0] = URL.createObjectURL(file);
            setPreviewUrls(newPreviewUrls);
        }
    };

    // 실물사진 파일 선택
    const handleRealImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[1] = file;  // index 1에 실물사진 파일
            setImages(newImages);

            const newPreviewUrls = [...previewUrls];
            newPreviewUrls[1] = URL.createObjectURL(file);
            setPreviewUrls(newPreviewUrls);
        }
    };

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

    const handleSubmit = async (e) => {
        //새로고침 막기
        e.preventDefault();

        if(!formData.name) {
            alert("강아지 종류를 입력해주세요.");
            return; // 등록 막기
        }

        if(!formData.origin) {
            alert("원산지를 입력 해주세요.");
            return; // 등록 막기
        }
        if(!formData.size) {
            alert("사이즈를 입력 해주세요.");
            return; // 등록 막기
        }

        if(!formData.parentingLevel) {
            alert("육아 난이도를 입력 해주세요.");
            return; // 등록 막기
        }

        if(!formData.sheddingLevel) {
            alert("털빠짐 레벨을 입력 해주세요.");
            return; // 등록 막기
        }

        if(!formData.walkLevel) {
            alert("산책 레벨을 입력 해주세요.");
            return; // 등록 막기
        }
        if(!formData.recommendedExercise) {
            alert("추천 운동량 입력 해주세요.");
            return; // 등록 막기
        }
        if(!formData.barkingLevel) {
            alert("짖음 정도를 입력 해주세요.");
            return; // 등록 막기
        }
        if(!formData.personality) {
            alert("성격을 입력 해주세요.");
            return; // 등록 막기
        }
        if(!formData.diseases) {
            alert("질병을 입력 해주세요.");
            return; // 등록 막기
        }
        if(!formData.history) {
            alert("역사을 입력 해주세요.");
            return; // 등록 막기
        }


        const cleanFormData = {
            ...formData
        };

        const data = new FormData();

        const jsonBlob = new Blob([JSON.stringify(cleanFormData)], {
            type: 'application/json'
        });

        //data에 담기
        data.append('data', jsonBlob);
        images.forEach((file) => data.append('images', file));

        const result = await createPedia(data);
        if (result) {
            alert('등록 성공!');
            router.push("/main");
        } else {
            alert('등록 실패');
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full h-full min-h-screen bg-white">


                <div className="flex w-full justify-center h-full bg-white">

                    {/* 왼쪽 여백 공간 */}
                    <div className="bg-white w-full h-full">

                    </div>

                    <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">


                        <div className="w-full">
                            <TopBar loginedUser={loginedUser} />
                        </div>

                        <div className="h-5">

                        </div>
                        <div className="flex justify-start p-1 w-full items-center text-gray-700 font-bold text-2xl">
                            <p>
                                피디아 강아지 등록
                            </p>
                        </div>
                        {/* 종류 */}
                        <div className="bg-white p-1 w-full">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="종류"
                            />
                        </div>

                        {/* 대표 이미지 등록 */}
                        <div className="bg-white p-1 w-full">
                            <div className="bg-white p-1 w-full">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="cursor-default text-gray-700 mb-2 text-sm font-semibold">대표 이미지 등록</p>

                                    {/* label로 클릭시 파일 선택창 열기 */}
                                    <label htmlFor="imageUpload"
                                           className="text-xs font-semibold text-gray-700 cursor-pointer hover:underline">
                                        [+] 사진 추가하기
                                    </label>

                                    {/* 실제 input은 숨김 */}
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        accept=".jpg,.jpeg"
                                        onChange={handleImageFileChange}
                                        className="hidden"
                                    />
                                </div>

                                {/* w-13 h-13 칸 */}
                                <div className="flex justify-start gap-2 items-center p-1">
                                    <div
                                        className="bg-gray-200 w-13 h-13 rounded-xs overflow-hidden flex items-center justify-center">
                                        {previewUrls[0] ? (
                                            <img src={previewUrls[0]} alt="일반 이미지 미리보기"
                                                 className="w-full h-full object-cover"/>
                                        ) : (
                                            <span className="text-[8px] text-gray-500 cursor-default">사진1</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* 실물 이미지 등록 */}
                            <div className="bg-white p-1 w-full">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="cursor-default text-gray-700 mb-2 text-sm font-semibold">실물 이미지 등록</p>

                                    {/* label로 클릭시 파일 선택창 열기 */}
                                    <label htmlFor="realImageUpload"
                                           className="text-xs font-semibold text-gray-700 cursor-pointer hover:underline">
                                        [+] 사진 추가하기
                                    </label>

                                    {/* 실제 input은 숨김 */}
                                    <input
                                        id="realImageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleRealImageFileChange}
                                        className="hidden"
                                    />
                                </div>

                                {/* w-13 h-13 칸 */}
                                <div className="flex justify-start gap-2 items-center p-1">
                                    <div
                                        className="bg-gray-200 w-13 h-13 rounded-xs overflow-hidden flex items-center justify-center">
                                        {previewUrls[1] ? (
                                            <img src={previewUrls[1]} alt="실물사진 미리보기"
                                                 className="w-full h-full object-cover"/>
                                        ) : (
                                            <span className="text-[8px] text-gray-500 cursor-default">사진2</span>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="bg-white p-1 w-full">
                            <input
                                type="text"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="원산지"
                            />
                        </div>
                        <div className="bg-white p-1 w-full">
                            <input
                                type="text"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="크기"
                            />
                        </div>
                        <div className="bg-white p-1 w-full">
                            <input
                                type="number"
                                min={1}
                                max={5}
                                name="parentingLevel"
                                value={formData.parentingLevel}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="육아 난이도를 입력하세요 (1~5) 만 가능합니다"
                            />
                        </div>
                        <div className="bg-white p-1 w-full">
                            <input
                                type="number"
                                min={1}
                                max={5}
                                name="sheddingLevel"
                                value={formData.sheddingLevel}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="털빠짐 레벨을 입력하세요 (1~5) 만 가능합니다"
                            />
                        </div>
                        <div className="bg-white p-1 w-full">
                            <input
                                type="number"
                                min={1}
                                max={5}
                                name="walkLevel"
                                value={formData.walkLevel}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="산책 레벨을 입력하세요 (1~5) 만 가능합니다"
                            />
                        </div>
                        <div className="bg-white p-1 w-full">
                            <input
                                type="text"
                                name="recommendedExercise"
                                value={formData.recommendedExercise}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="추천 운동량"
                            />
                        </div>
                        <div className="bg-white p-1 w-full">
                            <input
                                type="number"
                                min={1}
                                max={5}
                                name="barkingLevel"
                                value={formData.barkingLevel}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="짖음 정도를 입력하세요 (1~5) 만 가능합니다"
                            />
                        </div>


                        <div className="flex-col w-full p-1 bg-white">
                            <label htmlFor="content" className="block text-gray-700 mb-2 text-sm font-semibold">
                                성격을 입력하세요
                            </label>
                            <textarea
                                id="personality"
                                name="personality"
                                value={formData.personality}
                                onChange={handleChange}
                                className="w-full h-60 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="성격을 입력하세요..."
                            />
                        </div>
                        <div className="flex-col w-full p-1 bg-white">
                            <label htmlFor="content" className="block text-gray-700 mb-2 text-sm font-semibold">
                                질병을 입력하세요
                            </label>
                            <textarea
                                id="diseases"
                                name="diseases"
                                value={formData.diseases}
                                onChange={handleChange}
                                className="w-full h-60 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="질병을 입력하세요..."
                            />
                        </div>
                        <div className="flex-col w-full p-1 bg-white">
                            <label htmlFor="content" className="block text-gray-700 mb-2 text-sm font-semibold">
                                역사 및 설명을 입력하세요
                            </label>
                            <textarea
                                id="history"
                                name="history"
                                value={formData.history}
                                onChange={handleChange}
                                className="w-full h-60 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="역사 및 설명 을 입력하세요..."
                            />
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