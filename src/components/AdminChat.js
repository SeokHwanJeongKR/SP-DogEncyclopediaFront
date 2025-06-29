'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { adminChat, sendMessage } from "@/service/ChatService";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export default function AdminChat() {
    const clientRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const [roomId, setRoomId] = useState(null);

    const searchParams = useSearchParams();
    const receiverNum = searchParams.get('id') || 1;

    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await adminChat(receiverNum);
                setMessages(data);
                setRoomId(data[0].roomId);
            } catch (e) {
                console.log("채팅 open 실패", e);
            }
        }
        fetchData();
    }, [receiverNum]);

    useEffect(() => {
        if (!roomId) return;
        const socket = new SockJS('http://localhost:8080/chat');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {

                console.log("STOMP 연결 성공, 구독 주소 = ", roomId);

                client.subscribe(`/topic/${roomId}`, (message) => {
                    const msg = JSON.parse(message.body);
                    console.log("실시간 수신", msg);
                    setMessages(prev => [...prev, msg]);
                });

            },
            onStompError: (err) => console.error("STOMP 에러", err),
        });
        client.activate();
        clientRef.current = client;
        return () => client.deactivate();
    }, [roomId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { receiverNum: Number(receiverNum), message };

            await sendMessage(data);
            setMessage("");
        } catch (e) {
            console.log("메세지 전송 실패", e);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView(
            {behavior:"smooth"}
        );
    })

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


                        <div className="w-full h-full flex flex-col items-center justify-start  text-black gap-2 ">
                            <form onSubmit={handleSubmit} className="w-full h-full">

                                <div className="flex justify-center items-center w-full h-20 ">
                                    관리자 챗 = {roomId}
                                </div>
                                <div className=" w- border border-orange-200 h-200 overflow-y-auto p-2  ">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`mb-1 flex ${msg.senderNum === 1 ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`px-3 py-2 rounded max-w-xs ${msg.senderNum === 1 ? 'bg-orange-200' : 'bg-gray-100'}`}>
                                                <b>{msg.senderNum === 1 ? "나" : `${receiverNum}번 고객`}</b>: {msg.message}
                                            </div>
                                            <div ref={messagesEndRef}/>
                                        </div>
                                    ))}

                                </div>
                                <div className="flex justify-center items-center gap-2 w-full p-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="메세지를 입력 하세요"
                                        className="flex justify-center items-center  bg-white border-2 focus:outline-orange-400  border-orange-300 hover:border-orange-400 w-full rounded h-full text-black p-2"
                                    />
                                    <button type="submit"
                                            className="bg-orange-300 w-25 rounded hover:bg-orange-400 h-full p-2">
                                        보내기
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>


                </div>

                <div className="bg-white w-full h-full">
                    <h3>section 1</h3>
                </div>
            </div>
        </div>
    );
}