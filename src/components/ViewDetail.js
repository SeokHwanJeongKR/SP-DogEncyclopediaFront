import Link from 'next/link';
import {getMemberInfo, logoutUser} from "@/service/loginService";
import LoginAndLogout from "@/components/LoginAndLogout";
import {useEffect, useState} from "react";
import {changeLike, deletePost, getPost, getTop2Post} from "@/service/PostService";
import {useParams, useRouter} from "next/navigation";
import {router} from "next/client";

export default function ViewDetail({loginedUser}) {

    const postId = useParams().id;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [updatedAt, setUpdateAt] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const router = useRouter();
    const [memberId, setMemberId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userProfileImage, setUserProfileImage] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getPost(postId);

                console.log(result);

                setTitle(result.title || "");
                setContent(result.content || "");
                setImages(result.images)

                const datetime = result.updatedAt
                const [datePart, timePart] = datetime.split("T");
                const timeOnly = timePart.substring(0, 5);
                const dateTimeFormatted = `${datePart} ${timeOnly}`;

                setUpdateAt(dateTimeFormatted);
                setMemberId(result.memberId);
                setUserNickname(result.memberNickname);
                setUserProfileImage(result.profileUrl);
                setLikeCount(result.likeCount)
                setIsLiked(result.isLiked)
                console.log("is Liked = " ,isLiked)

            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }

        }
        fetchData();
    }, []);

    const handleDelete = async () => {
        const result = await deletePost(postId);

        if (result) {
            alert("게시글 삭제가 성공 했습니다.")
            router.push("/main");
        } else {
            alert("게시글 삭제가 실패 했습니다.")
        }
    }
    const handleLike = async () => {

        const result = await changeLike(postId);
        if (result) {
            console.log("is Liked = " ,isLiked)
            setLikeCount(result.likeCount)
            setIsLiked(result.isLiked)
            alert("좋아요 상태 변경에 성공 했습니다.")
        } else {
            alert("좋아요 상태 변경에 실패 했습니다.")
        }
    }



    return (

        <div className="flex flex-col gap-3 bg-white justify-start items-center w-full h-auto">

            <div className="flex text-xm text-orange-300 justify-start items-center w-full font-semibold">
                커뮤니티
            </div>
            <div className="flex text-xl text-gray-700 justify-between items-center w-full font-semibold">
                <div>
                    {title}
                </div>

                <div className="flex justify-end items-center gap-2 w-70 h-full text-lg font-medium">
                    <div className="flex justify-center items-center w-full h-auto">
                        <div className="text-red-500 h-auto">
                            ❤
                        </div>
                        <div className="text-gray-900 h-auto">
                            {likeCount}
                        </div>
                    </div>
                    {(loginedUser.id === memberId) && (
                        <>
                            <Link href={`/board/${postId}/edit`} className="w-full h-full">
                                <p className="flex justify-center items-center">수정하기</p>
                            </Link>
                            <button onClick={openModal} className="w-full h-full">
                                <p className="flex justify-center items-center">삭제하기</p>
                            </button>
                        </>
                    )}

                    {isOpen && (
                        <div className="fixed inset-0 bg-none flex justify-center items-center z-50">
                            <div
                                className="bg-white w-150 h-150 border-1 border-orange-300 rounded-xl shadow-lg flex flex-col justify-center items-center">
                                <div className=" w-100 h-100 flex justify-center items-center">
                                    <p>정말로 삭제 하시겠습니까?</p>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <button onClick={handleDelete}
                                            className="flex justify-center items-center w-52 h-20 bg-orange-200 rounded-xl">
                                        삭제하기
                                    </button>
                                    <button onClick={closeModal}
                                            className="flex justify-center items-center w-52 h-20 bg-orange-200 rounded-xl">
                                        취소하기
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>


            </div>

            <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-center w-25">
                    <div className="flex justify-center items-center w-12 h-12 rounded-full bg-black">
                        {userProfileImage ? (
                            <img
                                src={userProfileImage}
                                alt="프로필 이미지"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-full text-xs text-white">
                                기본
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center items-center text-black text-xs">
                    {userNickname}
                    </div>
                </div>

                <div className="flex justify-center items-center p-2 text-gray-600">
                    {updatedAt}
                </div>
            </div>
            <hr className="w-full h-px bg-orange-300 border-0 my-2"/>

            <div className="flex flex-col justify-center items-center bg-white h-auto w-full">
                {images && images.length > 0 ? (
                    images.map((img, index) => (
                        <img
                            key={index}
                            src={img.imageUrl}
                            alt={`image-${index}`}
                            className="w-full max-w-md h-auto object-cover my-2 rounded"
                        />
                    ))
                ) : (
                    <p className="text-white">이미지가 없습니다.</p>
                )}
            </div>


            <div className="flex flex-col bg-white justify-start items-start gap-1 w-full h-auto">
                <p className="text-gray-700 text-xl whitespace-pre-wrap text-sl">
                    {content}
                </p>
            </div>


            <div className="flex w-full text-2xl justify-center items-center text-black   h-full ">
                {(loginedUser) && (
                    isLiked ? (
                            <button
                                onClick={handleLike}
                                className="flex justify-center items-center gap-2 w-52 h-20 bg-orange-400 rounded-xl">
                                <div className="text-red-500">
                                    ❤
                                </div>
                                <div className="text-gray-900">
                                    좋아요
                                </div>
                            </button>
                    ) : (
                            <button
                                onClick={handleLike}
                                className="flex justify-center items-center gap-2 w-52 h-20 bg-orange-400 rounded-xl">
                                <div className="text-gray-900">
                                    ♡
                                </div>
                                <div className="text-gray-900">
                                    좋아요
                                </div>

                            </button>
                    )
                )}

            </div>

        </div>


    )
}