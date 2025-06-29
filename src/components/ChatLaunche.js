'use client'

import { useState } from "react";
import MemberChat from "@/components/MemberChat";

export default function ChatLauncher() {
    const [chatOpen, setChatOpen] = useState(false);

    return (
        <>
            {/* 오른쪽 하단 버튼 */}
            <button
                onClick={() => setChatOpen(prev => !prev)}
                className="fixed bottom-5 right-5 bg-orange-400 w-15 h-15 text-2xl rounded-full flex justify-center items-center text-white  hover:bg-orange-500 z-50"
            >
                💬
            </button>

            {/* 채팅창 */}
            {chatOpen && (
                <div className="fixed bottom-16 right-5 w-80 h-[500px] bg-white shadow-lg rounded p-2 z-50 border border-orange-300">
                    <MemberChat />
                </div>
            )}
        </>
    )
}