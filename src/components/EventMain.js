import Link from 'next/link';
import {useEffect, useState} from "react";
import {getAllEvent} from "@/service/EventService";


export default function PediaMain() {

    const [events, setEvents] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllEvent();

                const events = result.events;
                const images = result.images;

                console.log("events:", events);
                console.log("images:", images);

                const imageMap = new Map(
                    images
                        .filter((img) => img !== null)
                        .map((img) => [img.postId, img.imageUrl])
                );

                events.forEach((event) => {
                    console.log("pedia id:", event.id);
                });

                console.log(imageMap)

                // 게시글 + 이미지 병합
                const eventWithImage = events.map((event) => ({
                    ...event,
                    imageUrl: imageMap.get(event.id) || null,
                }));

                console.log(eventWithImage);

                setEvents(eventWithImage);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }

        }
        fetchData();
    }, []);

    return (

        <div className="flex flex-col gap-2 justify-start items-center w-full h-full bg-orange-50">
                {events.map((event) => (
                    <Link href={`/event/${event.id}`} key={event.id}>
                        <div
                            className=" w-full h-95 flex flex-col hover:shadow transition-all cursor-pointer">
                            {/* 이미지 영역 */}
                            <div
                                className="w-full h-95 flex justify-center items-center overflow-hidden">
                                {event.imageUrl ? (
                                    <img
                                        src={event.imageUrl}
                                        alt="게시판 이미지"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div
                                        className="flex justify-center items-center w-full h-full text-sm text-gray-400">
                                        사진 없음
                                    </div>
                                )}
                            </div>

                        </div>
                    </Link>
                ))}
        </div>


    )
}