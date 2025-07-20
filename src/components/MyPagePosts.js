
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getAllMyLikedPosts, getAllMyPosts} from "@/service/MyPageService";
import Link from "next/link";
import ReactPaginate from "react-paginate";


export default function MyPagePosts() {

    const [allPostSelectedPage, setAllPostSelectedPage] = useState(1);
    const [LikedPostSelectedPage, setLikedPostSelectedPage] = useState(1);
    const [myPosts, setMyPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState(null);



    useEffect(() => {
        async function fetchAllData() {

            try {
                const result = await getAllMyPosts(allPostSelectedPage);

                if (result) {
                    setMyPosts(result);
                }
                if(result === null) {
                    console.log("내가 쓴 게시물들 조회 실패");
                }



            } catch (e) {
                console.error("내가 쓴 게시물들 조회 실패",e);
            }
        } fetchAllData();
    }, [allPostSelectedPage]);

    useEffect(() => {
        async function fetchLikedData() {

            try {
                const result2 = await getAllMyLikedPosts(LikedPostSelectedPage);

                if (result2) {
                    setLikedPosts(result2);
                }
                if(result2 === null) {
                    console.log("내가 좋아요 한  게시물들 조회 실패");
                }



            } catch (e) {
                console.error("내가 좋아요 한 게시물들 조회 실패",e);
            }
        } fetchLikedData();
    }, [LikedPostSelectedPage]);

    const handlePageClick = (event) => {
        setAllPostSelectedPage(event.selected + 1)
    };

    const handlePageClick2 = (event) => {
        setLikedPostSelectedPage(event.selected + 1)
    };


    return (
        <div className="flex flex-col text-black bg-white justify-start gap-1 items-center gap-4 w-full h-full">

            <div className="grid grid-cols-1 gap-4 w-full gap-1 bg-white w-full">
                <div className="flex justify-start items-center text-orange-400 text-2xl">
                    내가 쓴 게시글 조회
                </div>
                {myPosts?.boardAndImages?.length > 0 ? (
                    myPosts.boardAndImages.map((item) => {
                        const board = item.board;
                        const image = item.image;

                        return (
                            <Link href={`/board/${board.id}`} key={board.id}>
                                <div
                                    className="border border-orange-100 w-full h-25 flex flex-col gap-2 rounded-xl hover:shadow transition-all cursor-pointer ">

                                    <div className="flex w-full h-full justify-start items-center gap-5 p-4 ">

                                        {/* 이미지 */}
                                        <div
                                            className="w-20 h-20 rounded-md overflow-hidden ">
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
                                        <div className="flex justify-between items-center gap-1 w-full h-20">

                                            <div className="text-orange-300 font-bold text-lg truncate w-full">
                                                {board.title}
                                            </div>

                                            <div
                                                className="flex justify-center iteams-center gap-2 w-60 text-gray-700 text-sm text-gray-500">
                                                <div>
                                                    {board.updatedAt.split('T')[0]}
                                                </div>
                                                <div>
                                                    {board.updatedAt.split('T')[1].slice(0, 5)}
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>마이 페이지 데이터가 없습니다.</p>
                )}
            </div>

            <div className="mt-6 text-gray-200">
                <ReactPaginate
                    pageCount={myPosts?.totalPage || 1}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    forcePage={allPostSelectedPage - 1}
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

            <div className="grid grid-cols-1 gap-4 w-full gap-1 bg-white w-full">
                <div className="flex justify-start items-center text-orange-400 text-2xl">
                    내가 좋아요 한 게시글 조회
                </div>
                {likedPosts?.boardAndImages?.length > 0 ? (
                    likedPosts.boardAndImages.map((item) => {
                        const board = item.board;
                        const image = item.image;

                        return (
                            <Link href={`/board/${board.id}`} key={board.id}>
                                <div
                                    className="border border-orange-100 w-full h-25 flex flex-col gap-2 rounded-xl hover:shadow transition-all cursor-pointer ">

                                    <div className="flex w-full h-full justify-start items-center gap-5 p-4 ">

                                        {/* 이미지 */}
                                        <div
                                            className="w-20 h-20 rounded-md overflow-hidden ">
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
                                        <div className="flex justify-between items-center gap-1 w-full h-20">

                                            <div className="text-orange-300 font-bold text-lg truncate w-full">
                                                {board.title}
                                            </div>

                                            <div
                                                className="flex justify-center iteams-center gap-2 w-60 text-gray-700 text-sm text-gray-500">
                                                <div>
                                                    {board.updatedAt.split('T')[0]}
                                                </div>
                                                <div>
                                                    {board.updatedAt.split('T')[1].slice(0, 5)}
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>좋아요 한 데이터가 없습니다.</p>
                )}
            </div>

            <div className="mt-6 text-gray-200">
                <ReactPaginate
                    pageCount={likedPosts?.totalPage || 1}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick2}
                    forcePage={LikedPostSelectedPage - 1}
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


        </div>


    )
}