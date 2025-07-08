"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import { getAllEvent } from "@/service/EventService";
import Link from "next/link";

export default function PediaMain() {
    const [events, setEvents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000 })]
    );

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllEvent();
                const events = result.events;
                const images = result.images;

                const imageMap = new Map(
                    images
                        .filter((img) => img !== null)
                        .map((img) => [img.postId, img.imageUrl])
                );

                const eventWithImage = events.map((event) => ({
                    ...event,
                    imageUrl: imageMap.get(event.id) || null,
                }));

                setEvents(eventWithImage);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        }
        fetchData();
    }, []);

    // 페이지네이션 상태 갱신
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <div className="flex flex-col items-center w-full bg-orange-50 overflow-hidden">
            <div className="embla w-full h-95" ref={emblaRef}>
                <div className="embla__container flex">

                    {events.map((event) => (
                        <div className="embla__slide flex-[0_0_100%] h-95" key={event.id}>
                            <Link href={`/event/${event.id}`}>
                                <div className="w-full h-95 flex justify-center items-center cursor-pointer overflow-hidden">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt="이벤트"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center w-full h-full text-gray-400 text-sm">
                                            사진 없음
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>

            {/* 페이지네이션 도트 */}
            <div className="flex gap-2 mt-2">

                {events.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                        className={`w-2 h-2 rounded-full ${
                            idx === selectedIndex ? "bg-orange-500" : "bg-gray-300"
                        }`}
                    ></button>
                ))}

            </div>
        </div>
    );
}
