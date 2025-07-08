'use client'

import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import { useParams } from 'next/navigation';
import {useRouter} from "next/navigation";
import {getEvent, updateEvent} from "@/service/EventService";

export default function EditPost() {

    const router = useRouter();

    const postId = useParams().id;
    console.log(postId);

    const [baseData, setBaseData] = useState(null);

    const [formData, setFormData] = useState(
        {
            title: "",
            content: "",
        });

    const [previewUrls, setPreviewUrls] = useState([]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!postId) return;

        const fetchPost = async () => {
            try {
                const result = await getEvent(postId);
                setBaseData(result); // 기존 data 저장

                setFormData((prev) => ({
                    ...prev,
                    title: result.title || "",
                    content: result.content || "",

                }));

                console.log("postId :", postId);


            } catch (err) {
                console.error("게시글 불러오기 실패", err);
            }
        };

        fetchPost();
    }, [postId]);






    const handleChange = (e) => {
        const { name, value } = e.target;

        // 나머지 필드는 그대로 처리
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5); // 최대 5개
        setImages(files);

        if (e.target.files.length > 5) {
            alert("사진은 최대 5개까지만 등록할 수 있습니다.");
        }

        // 미리보기 URL 생성
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };


    const handleSubmit = async (e) => {
        //새로고침 막기
        e.preventDefault();

        if(!formData.title) {
            alert("제목을 입력해주세요.");
            return; // 등록 막기
        }

        if(!formData.content) {
            alert("본문을 입력 해주세요.");
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

        const result = await updateEvent(data,postId);
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


                <div className="flex w-full justify-center h-230 bg-white">

                    {/* 왼쪽 여백 공간 */}
                    <div className="bg-white w-full h-full">

                    </div>

                    <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">



                        <div className="w-full">
                            <TopBar/>
                        </div>

                        <div className="h-5">

                        </div>
                        <div className="flex justify-start p-1 w-full items-center text-gray-700 font-bold text-2xl">
                            <p>
                                게시글 수정
                            </p>
                        </div>
                        {/* 제목 */}
                        <div className="bg-white p-1 w-full">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full h-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="상품명(제목)"
                            />
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
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            {/* 미리보기 이미지 출력 */}
                            <div className="flex justify-start gap-2 items-center p-1">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <div key={index}
                                         className="bg-gray-200 w-13 h-13 rounded-xs overflow-hidden flex items-center justify-center">
                                        {previewUrls[index] ? (
                                            <img src={previewUrls[index]} alt={`사진${index + 1}`}
                                                 className="w-full h-full object-cover"/>
                                        ) : (
                                            <span
                                                className="text-[8px] text-gray-500 cursor-default">사진{index + 1}</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* 본문 */}
                        <div className="flex-col w-full p-1 bg-white">
                            <label htmlFor="content" className="block text-gray-700 mb-2 text-sm font-semibold">
                                본문 등록
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full h-120 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="본문을 입력하세요..."
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