import Link from 'next/link';
import {logoutUser} from "@/service/loginService";
import LoginAndLogout from "@/components/LoginAndLogout";
import {useEffect, useState} from "react";
import {getTop2Post} from "@/service/PostService";
import {getTop12Pedia} from "@/service/PediaService";

export default function PediaMain() {

    const [pedias, setPosts] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTop12Pedia();
                const pedias = result.pedias;
                const images = result.images;

                console.log("pedias:", pedias);
                console.log("images:", images);

                const imageMap = new Map(
                    images
                        .filter((img) => img !== null)
                        .map((img) => [img.postId, img.imageUrl])
                );

                pedias.forEach((pedia) => {
                    console.log("pedia id:", pedia.id);
                });

                console.log(imageMap)
                // 게시글 + 이미지 병합

                //posts.map을 하면 기존 posts를 순회하면서 새로운 배열을 만들수 있다
                //각 순회한 요소는 post 이름으로 객체를 생성한다
                // ({}) 안에는 return 이 생략 되어 있다. 반환 할 내용을 적으면 된다.
                const pediaWithImage = pedias.map((pedia) => ({
                    //...post를 하면 기존 posts를 post에 그대로 복사해서 넣는것이다
                    ...pedia,

                    //ImageUrl이라는 필드를 생성하며 get(postId)가 없을 경우 null을 부여한다.
                    imageUrl: imageMap.get(pedia.id) || null,
                }));

                console.log(pediaWithImage);

                setPosts(pediaWithImage);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }

        }
        fetchData();
    }, []);

    return (

        <div className="flex flex-col gap-2 bg-white justify-start items-center w-full h-full">

            <div className="flex flex-col justify-start items-center  w-full">
                <div className="flex justify-between items-center w-full p-2 h-10 text-orange-400 text-2xl">
                    <div className="flex justify-center items-center">
                        강아지 백과
                    </div>
                    <Link href={`http://localhost:3000/pedia/all?page=1`}>
                        <div className=" p-2 flex justify-center items-center text-gray-500 text-xs cursor-pointer">
                            +더보기
                        </div>
                    </Link>
                </div>
                <div className="p-2 flex justify-start items-start w-full h-10 text-gray-500 text-xm">
                    <p>#어떤 강아지를 찾아 볼까요? </p>
                </div>
            </div>


            <div className="grid grid-cols-4 gap-4 w-full">
                {pedias.map((pedia) => (
                    <Link href={`/pedia/${pedia.id}`} key={pedia.id}>
                        <div
                            className="border border-orange-100 w-50 h-60 flex flex-col rounded-xl hover:shadow transition-all cursor-pointer">
                            {/* 이미지 영역 */}
                            <div
                                className="w-50 h-45 flex justify-center items-center overflow-hidden">
                                {pedia.imageUrl ? (
                                    <img
                                        src={pedia.imageUrl}
                                        alt="게시판 이미지"
                                        className="w-full h-full object-cover rounded-t-xl"
                                    />
                                ) : (
                                    <div
                                        className="flex justify-center items-center w-full h-full text-sm text-gray-400">
                                        사진 없음
                                    </div>
                                )}
                            </div>

                            {/* 이름 */}
                            <div
                                className="w-full h-8 flex justify-start items-center text-sm text-gray-700 px-2">
                                {pedia.name}
                            </div>

                            {/* 날짜 */}
                            <div
                                className="w-full h-7 flex justify-start items-center text-xs text-gray-500 px-2">
                                {pedia.updatedAt ? pedia.updatedAt.split("T")[0] : ""}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>


    )
}