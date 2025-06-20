'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import {getAllPost} from "@/service/PostService";

export default function BoardAllPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get("page");
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const result =await getAllPost(page);
                console.log("result = " + result);
                if (result) {
                    setResult(result);
                }

                if(result === null) {
                    console.log("no posts found");
                }

            } catch (error) {
                console.error("전체 글 조회 실패",error);
            }


        }
        fetchPosts()
    }, [page]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1; // react-paginate는 0부터 시작
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(selectedPage));
        router.push(`/pedia/all?${params.toString()}`);
    };


    return (

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-full bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">
                    <h3>section 1</h3>
                </div>


                <div className="flex flex-col bg-white justify-start gap-1 items-center gap-4 w-2000 h-full">


                    <div className="w-full">
                        <TopBar/>
                    </div>

                    {/*구분선 검색*/}
                    <hr className="w-full h-px bg-orange-300 border-0"/>

                    <div className="w-full h-full">
                        <SearchBar/>
                    </div>

                    {/*구분선 피디아*/}
                    <hr className="w-full h-px bg-orange-300 border-0"/>

                    <div className="grid grid-cols-1 gap-4 w-full gap-1 bg-white w-full">
                        {result?.boardAndImages?.length > 0 ? (
                            result.boardAndImages.map((item) => {
                                const board = item.board;
                                const image = item.image;

                                return (
                                    <Link href={`/board/${board.id}`} key={board.id}>
                                        <div
                                            className="border border-orange-100 w-full h-60 flex flex-col gap-2 rounded-xl hover:shadow transition-all cursor-pointer ">

                                            <div className="flex w-full h-full justify-start items-center gap-5 p-4 ">

                                                {/* 이미지 */}
                                                <div
                                                    className="w-55 h-45 rounded-md overflow-hidden ">
                                                    {image?.imageUrl ? (
                                                        <img
                                                            src={image.imageUrl}
                                                            alt="게시글 이미지"
                                                            className="w-full h-full object-cover rounded-t-xl"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="flex justify-center items-center w-full h-full text-sm text-gray-400">
                                                            사진 없음
                                                        </div>
                                                    )}
                                                </div>

                                                {/* 텍스트 영역 */}
                                                <div className="flex flex-col justify-start items-start gap-1 w-full h-45">
                                                    <h2 className="text-orange-300 font-bold text-lg truncate">
                                                        {board.title}
                                                    </h2>
                                                    <p className="text-gray-700 text-sm">
                                                        {board.content}
                                                    </p>
                                                </div>
                                            </div>



                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <p>데이터가 없습니다.</p>
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="mt-6">
                        <ReactPaginate
                            pageCount={result?.totalPage || 1}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageClick}
                            containerClassName="flex gap-2 justify-center"
                            activeClassName="bg-orange-200 text-white"
                            pageClassName="px-3 py-1 border rounded hover:bg-orange-400"
                            previousLabel="<"
                            previousClassName="px-3 py-1 border rounded hover:bg-orange-400"
                            nextLabel=">"
                            nextClassName="px-3 py-1 border rounded hover:bg-orange-400"
                            breakLabel="..."
                        />
                    </div>
                    <div className="h-10">

                    </div>


                </div>

                {/* 우측 여백 공간 */}
                <div className="bg-gray-50 w-full h-full">
                    <h3>section 3</h3>
                </div>


            </div>

        </div>


    );
}