'use client';

import {useEffect, useState} from "react";
import {getChatList} from "@/service/ChatService";
import Link from "next/link";
import TopBar from "@/components/TopBar";


export default function ChatList() {

    const [roomList, setRoomList] = useState([])

    useEffect(() => {
        async function fetchData() {
            const result = await getChatList();

            setRoomList(result.roomIds);

            console.log("result =",result);
            console.log("roomList = " ,result?.roomIds);


        }
        fetchData()
    }, []);

    return (

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-230 bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">
                    <h3>section 1</h3>
                </div>

                <div className="flex flex-col gap-2 bg-white justify-start items-center w-2000 h-full">

                    <div className="w-full">
                        <TopBar/>
                    </div>

                    <div className="w-full h-full flex flex-col">

                        <div className="flex items-center justify-center w-full h-20 text-3xl text-black p-2">
                            현재 활성화된 채팅 리스트
                        </div>

                        <div className="w-full h-full flex flex-col items-center justify-start bg-white text-black gap-2">

                            {roomList.map((room,id) => {
                                const userId = room.replace("room","");
                                return (
                                    <div
                                        key={id}
                                        className="flex justify-start items-center w-full h-20 border-2 border-orange-400 p-4  rounded-xl text-2xl ">

                                        <Link
                                            className="w-full h-full"
                                            href={`/chat/admin?id=${userId}`}>
                                            <div>
                                                {room}
                                            </div>
                                        </Link>
                                    </div>
                                    )
                            })}
                        </div>
                    </div>


                </div>

                <div className="bg-white w-full h-full">
                    <h3>section 1</h3>
                </div>
            </div>
        </div>
    )
}