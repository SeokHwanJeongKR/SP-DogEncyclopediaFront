import Link from 'next/link';
import {logoutUser} from "@/service/loginService";
import LoginAndLogout from "@/components/LoginAndLogout";
import {useEffect, useState} from "react";
import {getTop2Post} from "@/service/PostService";


export default function BoardMain() {

    const [posts, setPosts] = useState([]);

    const baseUrl = `https://mungpedia.kr`

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTop2Post();
                const posts = result.posts;
                const images = result.images;


                const imageMap = new Map(
                    images
                        .filter((img) => img !== null)
                        .map((img) => [img.postId, img.imageUrl])
                );

                posts.forEach((post) => {
                    if (process.env.NODE_ENV === "development") {
                        console.log("post id:", post.id);
                    }
                });

                if (process.env.NODE_ENV === "development") {
                    console.log(imageMap)
                }
                // 게시글 + 이미지 병합

                //posts.map을 하면 기존 posts를 순회하면서 새로운 배열을 만들수 있다
                //각 순회한 요소는 post 이름으로 객체를 생성한다
                // ({}) 안에는 return 이 생략 되어 있다. 반환 할 내용을 적으면 된다.
                const postsWithImage = posts.map((post) => ({
                    //...post를 하면 기존 posts를 post에 그대로 복사해서 넣는것이다
                    ...post,

                    //ImageUrl이라는 필드를 생성하며 get(postId)가 없을 경우 null을 부여한다.
                    imageUrl: imageMap.get(post.id) || null,
                }));
                if (process.env.NODE_ENV === "development") {
                    console.log(postsWithImage);
                }

                setPosts(postsWithImage);
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                    console.error("데이터 불러오기 실패:", error);
                }
            }

        }
        fetchData();
    }, []);

    return (

        <div className="flex flex-col gap-2 bg-white justify-start items-center w-full h-full">

            <div className="flex flex-col justify-start items-center  w-full">
                <div className="flex justify-between items-center w-full p-2 h-10 text-orange-400 text-2xl">
                    <div className="flex justify-center items-center">
                        커뮤니티
                    </div>
                    <Link href={`${baseUrl}/board/all?page=1`}>
                        <div className=" p-2 flex justify-center items-center text-gray-500 text-xs cursor-pointer">
                            +더보기
                        </div>
                    </Link>
                </div>
                <div className="p-2 flex justify-start items-start w-full h-10 text-gray-500 text-xm">
                    <p>#따끈 따끈한 오늘의 게시글이 왔어요~ </p>
                </div>
            </div>



            <div className="grid grid-cols-1 gap-4 w-full gap-1 bg-white w-full">

                {posts.map((post, index) => (
                    <Link href={`/board/${post.id}`} key={post.id}>
                        <div
                            key={index}
                            className="flex justify-center items-center w-full h-65 p-6 text-black gap-5 rounded-xl border border-orange-200 hover:shadow transition-all cursor-pointer"
                        >
                            {/* 이미지 */}
                            <div
                                className="w-55 h-45 rounded-md overflow-hidden ">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt="게시판 이미지"
                                        className="w-full h-full object-cover"
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
                                    {post.title}
                                </h2>
                                <p className="text-gray-700 text-sm">
                                    {post.content.length > 50 ? post.content.slice(0, 50) + '...' : post.content}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>


    )
}