'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {adminChat, openChat, sendMessage} from "@/service/ChatService";
import { useSearchParams } from "next/navigation";

export default function MemberChat() {
    const clientRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [roomId, setRoomId] = useState(null);

    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await openChat();
                setMessages(data);
                setRoomId(data[0].roomId);
            } catch (e) {
                console.log("채팅 open 실패", e);
            }
        }
        fetchData();
    },[]);

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
            const data = { message };

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
        <form onSubmit={handleSubmit} className="gap-2">
            <div className="text-black">
                여기는 소비자 {roomId}
            </div>
            <div className=" h-100 overflow-y-auto mb-2 p-2 bg-white text-black">

                {messages.map((msg, idx) => (

                    <div key={idx} className={`mb-1 flex ${msg.senderNum === 1 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-3 py-2 rounded max-w-xs ${msg.senderNum === 1 ? 'bg-orange-200' : 'bg-gray-100'}`}>
                            <b>{msg.senderNum === 1 ? "관리자" : `나`}</b>: {msg.message}
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
                    className="flex justify-center items-center focus:outline-orange-400 bg-white border-2 border-orange-300 hover:border-orange-400 w-full rounded h-full text-black p-2"
                />
                <button type="submit"
                        className="bg-orange-300 w-25 rounded hover:bg-orange-400 h-full p-2">
                    보내기
                </button>
            </div>

        </form>
    );
}