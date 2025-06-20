'use client'

import {useEffect, useState} from "react";
import {getPost, updatePost} from "@/service/PostService";
import TopBar from "@/components/TopBar";
import { useParams } from 'next/navigation';
import {useRouter} from "next/navigation";
import {createPediaEditRequest, getPedia, updatePedia} from "@/service/PediaService";

export default function EditPost() {

    const router = useRouter();

    const pediaId = useParams().id;
    console.log(pediaId);

    const [target, setTarget] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [newInfo, setNewInfo] = useState(null);

    const options = [
        { label: "원산지", value: "origin" },
        { label: "크기", value: "size" },
        { label: "육아 난이도", value: "parentingLevel" },
        { label: "털 빠짐", value: "sheddingLevel" },
        { label: "산책 필요도", value: "walkLevel" },
        { label: "추천 운동량", value: "recommendedExercise" },
        { label: "짖음 정도", value: "barkingLevel" },
        { label: "성격", value: "personality" },
        { label: "유전병", value: "diseases" },
        { label: "간단 설명", value: "history" },
    ];

    const handleSelect = (option) => {
        setTarget(option);
        setIsOpen(false); // 선택 후 닫기
    }

    const [baseData, setBaseData] = useState(
        {
            name: "",                   // 종류
            origin: "",                 //원산지
            size: "",                   // 크기
            parentingLevel: "",         //육아 난이도
            sheddingLevel: "",          //털빠짐 레벨
            walkLevel: "",              //산책 레벨
            recommendedExercise: "",    //추천 운동량
            barkingLevel: "",           //짖음 정도
            personality: "",            //성격 설명
            diseases: "",               //질병 설명
            history: "",                //간단 설명
        });


    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!pediaId) return;

        const fetchPost = async () => {
            try {
                const result = await getPedia(pediaId);

                setBaseData((prev) => ({
                    ...prev,
                    name: result.name || "",
                    origin: result.origin || "",
                    size: result.size || "",
                    parentingLevel: result.parentingLevel || "",
                    sheddingLevel: result.sheddingLevel || "",
                    walkLevel: result.walkLevel || "",
                    recommendedExercise: result.recommendedExercise || "",
                    barkingLevel: result.barkingLevel || "",
                    personality: result.personality || "",
                    diseases: result.diseases || "",
                    history: result.history || ""

                }));

                console.log("pediaId :", pediaId);


            } catch (err) {
                console.error("피디아 글 불러오기 실패", err);
            }
        };

        fetchPost();
    }, [pediaId]);



    const handleSubmit = async (e) => {
        //새로고침 막기
        e.preventDefault();

        if (!target) {
            alert("수정할 항목을 선택해주세요.");
            return;
        }

        if (!newInfo.trim()) {
            alert("수정 내용을 입력해주세요.");
            return;
        }

        const originalInfo = baseData[target] || "";

        const cleanFormData = {
            pediaId,
            target,
            originalInfo,
            newInfo
        }

        const data = new FormData();

        const jsonBlob = new Blob([JSON.stringify(cleanFormData)], {
            type: 'application/json'
        });
        data.append("data", jsonBlob);

        console.log(data);

        const result = await createPediaEditRequest(data);
        if (result) {
            alert('수정 요청 보내기 성공!');
            router.push("/main");
        } else {
            alert('수정 요청 보내기 실패');
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full h-full min-h-screen bg-white">


                <div className="flex w-full justify-center h-full bg-white">

                    {/* 왼쪽 여백 공간 */}
                    <div className="bg-white w-full h-full">
                        <h3>section 1</h3>
                    </div>

                    <div className="flex flex-col gap-2 bg-white justify-start items-center w-2000 h-full">


                        <div className="w-full">
                            <TopBar/>
                        </div>

                        <div className="h-5">

                        </div>
                        <div className="flex justify-start p-1 w-full items-center text-gray-700 font-bold text-2xl">
                            <p>
                                피디아 강아지 수정
                            </p>
                        </div>

                        {/* 수정할 항목 선택 */}
                        <div
                            className="w-full h-12 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {target
                                ? `수정할 항목: ${options.find(o => o.value === target)?.label}`
                                : "수정할 내용을 선택해주세요."}

                            {/* 드롭다운 옵션들 */}
                            {isOpen && (
                                <div className="absolute text-black z-10 w-80 bg-orange-200 border rounded shadow">
                                    {options.map((option) => (
                                        <div
                                            key={option.value}
                                            onClick={() => handleSelect(option.value)}
                                            className="px-4 w-full py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>



                        {/* 기존 정보 */}
                        <div className="flex-col w-full p-1 bg-white">
                            <label className="block text-gray-700 mb-2 text-sm font-semibold">
                                기존 정보입니다.
                            </label>
                            <div className="w-full h-60 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg">
                                {target ? baseData[target] : "수정할 항목을 선택해주세요."}
                            </div>
                        </div>


                        {["parentingLevel", "sheddingLevel", "walkLevel", "barkingLevel"].includes(target) ? (
                            <input
                                type="number"
                                id={target}
                                name={target}
                                value={newInfo ?? ""}
                                onChange={(e) => setNewInfo(e.target.value)}
                                className="w-full p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none"
                                placeholder="숫자를 입력하세요"
                                min={1}
                                max={5}
                            />
                        ) : (
                            <textarea
                                id={target}
                                name={target}
                                value={newInfo ?? ""}
                                onChange={(e) => setNewInfo(e.target.value)}
                                className="w-full h-60 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg focus:ring-2 focus:ring-[#FDC453] focus:outline-none resize-none"
                                placeholder="수정할 내용을 입력하세요..."
                            />
                        )}



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
                        <h3>section 3</h3>
                    </div>


                </div>

            </div>
        </form>
    )
}