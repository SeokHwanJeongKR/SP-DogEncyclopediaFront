import Link from 'next/link';
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getEvent} from "@/service/EventService";
import {deleteEvent} from "@/service/EventService";


export default function EventDetail({loginedUser}) {

    const postId = useParams().id;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [updatedAt, setUpdateAt] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const router = useRouter();

    const [userNickname, setUserNickname] = useState("");
    const [userProfileImage, setUserProfileImage] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getEvent(postId);

                console.log(result);

                setTitle(result.title || "");
                setContent(result.content || "");
                setImages(result.images)

                const datetime = result.updatedAt
                const [datePart, timePart] = datetime.split("T");
                const timeOnly = timePart.substring(0, 5);
                const dateTimeFormatted = `${datePart} ${timeOnly}`;

                setUpdateAt(dateTimeFormatted);
                setUserNickname(result.memberNickname);
                setUserProfileImage(result.profileUrl);

            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }

        }
        fetchData();
    }, []);

    const handleDelete = async () => {
        const result = await deleteEvent(postId);

        if (result) {
            alert("게시글 삭제가 성공 했습니다.")
            router.push("/main");
        } else {
            alert("게시글 삭제가 실패 했습니다.")
        }
    }



    return (

        <div className="flex flex-col gap-3 bg-white justify-start items-center w-full h-auto">

            <div className="flex text-xm text-orange-300 justify-start items-center w-full font-semibold">
                이벤트
            </div>
            <div className="flex text-xl text-gray-700 justify-between items-center w-full font-semibold">
                <div>
                    {title}
                </div>

                <div className="flex justify-end items-center gap-2 w-50 h-full text-lg font-medium">
                    {(loginedUser.role === "ADMIN") && (
                        <>
                            <Link href={`/event/${postId}/edit`}>
                                <p className="flex justify-center items-center">수정하기</p>
                            </Link>
                            <button onClick={openModal}>
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
                            className="w-full h-full object-cover my-2 rounded"
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

            </div>

            <hr className="w-full h-px bg-orange-300 border-0 my-2"/>

            <div className="w-full h-60">

            </div>

        </div>


    )
}