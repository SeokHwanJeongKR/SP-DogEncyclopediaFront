'use client'

import { useEffect, useState } from "react";
import { getSearchResult } from "@/service/SearchService";
import Link from "next/link";

export default function SearchedResult({ keyword }) {
    const [pediaData, setPediaData] = useState("검색된 백과 정보가 없습니다.");
    const [boardData, setBoardData] = useState("검색된 게시판이 없습니다.");

    useEffect(() => {
        async function fetchData() {
            console.log("키워드" +keyword);
            const result = await getSearchResult(keyword);

            console.log("pediaResult Length = " + result.pediaResults?.length);
            if (result.pediaResults?.length > 0) {
                setPediaData(result.pediaResults.slice(0, 5));
            } else {
                setPediaData("검색된 백과 정보가 없습니다.");
            }
            console.log("pediaData"+pediaData);

            console.log("boardResult Length = " + result.boardResults?.length);
            if (result.boardResults?.length > 0) {
                setBoardData(result.boardResults.slice(0, 5));
            } else {
                setBoardData("검색된 게시판이 없습니다.");
            }
        }

        fetchData()
    }, [keyword]);

    return (
        <div className="flex flex-col justify-start items-start text-black  w-full h-full gap-2">
            <div className="flex justify-between items-center w-full p-2 h-10 text-orange-400 text-2xl">
                검색어 : {keyword}
            </div>


            <div className="flex flex-col w-full h-full">

                <div className="flex justify-between items-center w-full p-2 h-10 text-orange-400 text-2xl ">
                    <div className="flex justify-start items-center cursor-default">
                        백과 검색 결과
                    </div>
                </div>

                <div
                    className="p-2 flex flex-col justify-start items-center text-gray-900 text-xl w-full h-full ">
                    {Array.isArray(pediaData) ? (
                        pediaData.map((pedia) => (
                            <div key={pedia.id}
                                 className="flex w-full h-full p-2 my-1 border-2 rounded-2xl border-orange-200">
                                <Link href={`/pedia/${pedia.id}`} className="w-full h-full">
                                    <div className="flex justify-start items-center w-full h-full gap-2">

                                        <div className="w-50 h-50">
                                            {pedia.images?.length > 0 ? (
                                                <img src={pedia.images[0].imageUrl} alt="pedia image"
                                                     className="w-full h-full object-cover rounded-2xl"/>
                                            ) : (
                                                <p>이미지가 없습니다.</p>
                                            )}
                                        </div>

                                        <div
                                            className="flex flex-col justify-start items-center w-full h-40">
                                            <div className=" w-full h-full text-2xl font-semibold">
                                                {pedia.name}
                                            </div>

                                            <div className=" w-full h-full text-xl">
                                                {pedia.origin}
                                            </div>
                                            <div className=" w-full  h-full text-xl">
                                                {pedia.size}
                                            </div>


                                        </div>

                                    </div>


                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>검색된 백과 정보가 없습니다.</p>
                    )}
                </div>

                <div className="flex justify-between items-center w-full p-2 h-10 text-orange-400 text-2xl">
                    <div>
                        게시판 검색 결과
                    </div>
                    <div className="flex justify-end items-center text-xs text-gray-400 p-2 cursor-pointer">
                        + 더보기
                    </div>
                </div>

                <div
                    className="p-2 flex flex-col justify-start items-center text-gray-900 text-xl w-full h-full">
                    {Array.isArray(boardData) ? (
                        boardData.map((board) => (
                            <div key={board.id}
                                 className=" w-full h-full p-2 my-1 border-2 rounded-2xl border-orange-200">
                                <Link href={`/board/${board.id}`}>

                                    <div className="flex justify-start items-center w-full h-full gap-2">
                                        <div className="w-50 h-50">
                                            {board.images?.length > 0 ? (
                                                <img src={board.images[0].imageUrl} alt="pedia image"
                                                     className="w-full h-full object-cover rounded-2xl"/>
                                            ) : (
                                                <p>이미지가 없습니다.</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-start items-center">
                                            <div className="text-2xl font-semibold">
                                                {board.title}
                                            </div>
                                            <div>
                                                {board.content}
                                            </div>
                                        </div>
                                    </div>

                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>검색된 게시판 정보가 없습니다.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
