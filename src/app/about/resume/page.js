'use client'


import TopBar from "@/components/TopBar";
import ChatLauncher from "@/components/ChatLaunche";
import {useEffect, useState} from "react";
import {getMemberInfo} from "@/service/loginService";
import Resume from "@/components/Resume";



export default function ResumePage() {

    const [loginedUser, setLoginedUser] = useState("");

    useEffect(() => {
        async function loadMember() {
            try {
                const user = await getMemberInfo();
                setLoginedUser(user);
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                    console.log("유저 정보 조회에 실패 했습니다.", error);
                }
            }
        }

        loadMember();
    }, []);


    return (

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-full bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">

                </div>


                <div className="flex flex-col bg-white justify-start gap-1 items-center w-1600 h-full">


                    <div className="w-full z-10">
                        <TopBar loginedUser =  {loginedUser} />
                    </div>

                    <div className="w-full p-2">
                        <Resume/>
                    </div>


                </div>

                {/* 우측 여백 공간 */}
                <div className="bg-gray-50 w-full h-full">

                </div>


            </div>
            <div>
                {loginedUser && loginedUser.role !== "ADMIN" && <ChatLauncher />}
            </div>


        </div>

    )
}