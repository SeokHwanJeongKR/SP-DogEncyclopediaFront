'use client'

import {useEffect, useState} from "react";
import { getTop2Post} from "@/service/PostService";
import TopBar from "@/components/TopBar";
import Board from "@/components/BoardMain";
import ViewDetail from "@/components/ViewDetail";
import SearchBar from "@/components/SearchBar";
import {getMemberInfo} from "@/service/loginService";
import ChatLauncher from "@/components/ChatLaunche";
import Comment from "@/components/Comment";




export default function GetPost() {

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


                <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">


                    <div className="w-full">
                        <TopBar loginedUser =  {loginedUser}/>
                    </div>

                    <div className="w-full h-full">
                        <SearchBar/>
                    </div>

                    <hr className="w-full h-px bg-orange-300 border-0 my-2"/>

                    <div className="w-full h-auto">
                        <ViewDetail loginedUser={loginedUser}/>
                    </div>

                    <hr className="w-full h-px bg-orange-300 border-0 my-2"/>

                    <div className=" w-full h-auto ">
                        <Comment loginedUser={loginedUser}/>
                    </div>
                </div>

                {/* 우측 여백 공간 */}
                <div className="bg-gray-50 w-full h-full">
                </div>

                <div>
                    {loginedUser && loginedUser.role !== "ADMIN" && <ChatLauncher />}
                </div>

            </div>

        </div>

    )
}