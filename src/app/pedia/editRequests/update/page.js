'use client'

import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import {useRouter, useSearchParams} from 'next/navigation';
import {deleteRequestAccept, editRequestAccept, getEditRequest} from "@/service/PediaService";
import {getMemberInfo} from "@/service/loginService";



export default function EditPost() {

    const searchParams = useSearchParams();
    const requestId = searchParams.get("requestId");
    const [newInfo, setNewInfo] = useState(null);
    const [result, setResult] = useState(null);
    const [target, setTarget] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getEditRequest(requestId);
                setResult(result);
                setTarget(result.target);

                console.log("result = " , result);

            } catch (e) {
                console.error("수정 요청 조회 실패",e);
            }
        }
        fetchData();
    },[requestId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanFormDate = {
            requestId,
            newInfo
        }
        console.log(cleanFormDate);
        console.log("reuqestId",requestId);
        console.log("new Info", newInfo);

        const data = new FormData();

        const jsonBlob = new Blob([JSON.stringify(cleanFormDate)], {
            type: 'application/json'
        })
        data.append('data', jsonBlob);

        console.log(data)


        const result = await editRequestAccept(data);

        if (result) {
            alert('수정 요청 승인 성공!');
            router.push("/main");
        } else {
            alert('수정 요청 승인 실패');
        }

    }
    const handleDelete = async (e) => {
        e.preventDefault();

        try {

            const result = await deleteRequestAccept(requestId);
            console.log(result);

            router.push("/pedia/editRequests?page=1")
        } catch (error) {
            console.error("삭제 실패",error);
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


                <div className="flex w-full justify-center h-full bg-white">

                    {/* 왼쪽 여백 공간 */}
                    <div className="bg-white w-full h-full">

                    </div>

                    <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full text-gray-900">


                        <div className="w-full">
                            <TopBar loginedUser={loginedUser}/>
                        </div>

                        <div className="h-5">

                        </div>
                        <div className="flex justify-start w-full items-center text-gray-700 font-bold text-2xl">
                            수정 할 내용 : {target}
                        </div>

                        <div className="flex justify-center items-center w-full h-full">
                            <div className="flex flex-col w-full h-full">
                                <div>
                                    기존 내용
                                </div>
                                <div
                                    className="w-full h-12 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg ">
                                    {result?.originalInfo}
                                </div>
                            </div>

                            <div className="w-30 h-full flex justify-center items-center">
                                <p>
                                    {'>'}
                                </p>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div>
                                    수정 요청 내용
                                </div>
                                <div
                                    className="w-full h-12 p-3 text-gray-800 bg-orange-200 border border-orange-300 rounded-lg ">
                                    {result?.newInfo}
                                </div>
                            </div>
                        </div>
                        {["parentingLevel", "sheddingLevel", "walkLevel", "barkingLevel"].includes(result?.target) ? (
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
                            <div
                                className="flex justify-center items-center mt-3 w-25 bg-orange-300 border-orange-300 border-2 text-black py-2 rounded-lg hover:bg-orange-400 transition hover:cursor-pointer "
                                onClick={handleDelete}
                            >
                                삭제
                            </div>

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