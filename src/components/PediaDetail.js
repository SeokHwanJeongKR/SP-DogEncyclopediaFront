import Link from 'next/link';
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {deletePedia, getPedia} from "@/service/PediaService";

export default function PediaDetail({loginedUser}) {

    const pediaId = useParams().id;
    const router = useRouter();

    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [size, setSize] = useState("");
    const [parentingLevel, setParentingLevel] = useState("");
    const [sheddingLevel, setSheddingLevel] = useState("");
    const [walkLevel, setWalkLevel] = useState("");
    const [recommendedExercise, setRecommendedExercise] = useState("");
    const [barkingLevel, setBarkingLevel] = useState("");
    const [personality, setPersonality] = useState("");
    const [diseases, setDiseases] = useState("");
    const [history, setHistory] = useState("");

    const [images, setImages] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const Rating = ({rating}) => {
        const totalRate = 5;
        return (
            <span>
            {[...Array(totalRate)].map((_, index) => (
                <span key={index}>
                    {index < rating ? "⭐️" : "☆"}
                </span>
            ))}
        </span>
        )
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getPedia(pediaId);

                console.log(result);

                setName(result.name || "");
                setOrigin(result.origin || "");
                setSize(result.size || "");
                setParentingLevel(result.parentingLevel || "");
                setSheddingLevel(result.sheddingLevel || "");
                setWalkLevel(result.walkLevel || "");
                setRecommendedExercise(result.recommendedExercise || "");
                setBarkingLevel(result.barkingLevel || "");
                setPersonality(result.personality || "");
                setDiseases(result.diseases || "")
                setHistory(result.history || "");
                setImages(result.images)


            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }

        }
        fetchData();
    }, []);

    const handleDelete = async () => {
        const result = await deletePedia(pediaId);

        if (result) {
            alert("게시글 삭제가 성공 했습니다.")
            router.push("/main");
        } else {
            alert("게시글 삭제가 실패 했습니다.")
        }
    }



    return (

        <div className="flex flex-col gap-3 bg-white justify-start items-center w-full h-full text-gray-700">

            <div className="flex text-xm text-orange-300 justify-start items-center w-full font-semibold">
                강아지 백과
            </div>


            <div className="flex justify-start items-center bg-white gap-4 h-120   w-full ">

                <div className="flex justify-center items-center w-160 h-100 ">
                    {images && images.length > 0 ? (
                        <img
                            src={images[images.length === 1 ? 0 : (images.length === 2 ? 1 : 0)].imageUrl}
                            alt="강아지 사진"
                            className="w-100 h-100 object-cover my-2 rounded-xl"
                        />
                    ) : (
                        <p className="text-white">이미지가 없습니다.</p>
                    )}


                </div>

                <div className="flex flex-col text-xl justify-between  items-start gap-3 w-full h-100">

                    <div className="flex text-xl justify-between items-center w-full font-semibold">

                        <div className="flex text-2xl justify-start items-center w-full h-full ">
                            {name}
                        </div>

                        <div className="flex justify-end items-center gap-2 w-80 h-full text-lg font-medium">
                            {(loginedUser.role === "MEMBER") && (
                                <Link href={`/pedia/${pediaId}/edit/request`}>
                                    <p className="flex justify-center items-center">수정요청</p>
                                </Link>
                            )}
                            {(loginedUser.role === "ADMIN") && (
                                <>
                                    <Link href={`/pedia/${pediaId}/edit`}>
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

                    <div className="flex flex-col justify-start items-start w-full h-full ">
                        <p>원산지 : {origin}</p>
                        <p>크기 : {size}</p>
                    </div>

                    <div className="flex flex-col justify-start items-start w-full h-full">
                        <p>육아 난이도 : <Rating rating={parentingLevel}/></p>
                        <p>털 빠짐 :  <Rating rating={sheddingLevel}/></p>
                    </div>

                    <div className="flex flex-col justify-start items-start w-full h-full">
                        <p>산책 필요도 : <Rating rating={walkLevel}/></p>
                        <p>추천 운동량 : {recommendedExercise} </p>
                    </div>

                    <div className="w-full h-full">
                        <p>짖음 정도<Rating rating={barkingLevel}/></p>
                    </div>

                </div>

            </div>

            <div className="flex flex-col justify-start items-center p-2 w-full h-full gap-10">

                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="flex text-2xl justify-start items-center w-full h-full">
                        <p>
                            성격
                        </p>
                    </div>

                    <div className="flex justify-start items-center w-full h-full">
                        <p className="whitespace-pre-wrap break-words">
                            {personality}
                        </p>
                    </div>
                </div>


                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="flex text-2xl justify-start items-center w-full h-full">
                        <p>
                            유전병
                        </p>
                    </div>

                    <div className="flex justify-start items-center w-full h-full">
                        <p className="whitespace-pre-wrap break-words">
                            {diseases}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="flex text-2xl justify-start items-center w-full h-full">
                        <p>
                            간단 설명
                        </p>
                    </div>

                    <div className="flex justify-start items-center w-full h-full">
                        <p className="whitespace-pre-wrap break-words">
                            {history}
                        </p>
                    </div>
                </div>

            </div>

            <div className="flex flex-col bg-white justify-start items-start gap-1 w-full h-auto">
                <p className=" text-xl whitespace-pre-wrap text-sl">

                </p>
            </div>


            <hr className="w-full h-px bg-orange-300 border-0 my-2"/>

            <div className="w-full h-60">

            </div>

        </div>


    )
}