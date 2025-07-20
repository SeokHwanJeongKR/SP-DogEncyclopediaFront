'use client'


import TopBar from "@/components/TopBar";
import BoardMain from "@/components/BoardMain";
import PediaMain from "@/components/PediaMain";
import EventMain from "@/components/EventMain";
import SearchBar from "@/components/SearchBar";
import ChatLauncher from "@/components/ChatLaunche";
import {useEffect, useState} from "react";
import {getMemberInfo} from "@/service/loginService";



export default function Main() {

    const [loginedUser, setLoginedUser] = useState("");

    useEffect(() => {
        async function loadMember() {
            try {
                const user = await getMemberInfo();
                setLoginedUser(user);
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                console.log("유저 정보 조회에 실패 했습니다.",error);
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

                    <div className="w-full h-full overflow-hidden">
                        <EventMain/>
                    </div>

                    {/*구분선 검색*/}
                    <hr className="w-full h-px bg-orange-300 border-0"/>

                    <div className="w-full h-full">
                        <SearchBar/>
                    </div>

                    {/*구분선 피디아*/}
                    <hr className="w-full h-px bg-orange-300 border-0"/>

                    <div className="w-full p-2">
                        <PediaMain/>
                    </div>

                    {/*구분선 게시판*/}
                    <hr className="w-full h-px bg-orange-300 border-0"/>

                    <div className="w-full p-2">
                        <BoardMain/>
                    </div>

                    <div className="h-10">

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