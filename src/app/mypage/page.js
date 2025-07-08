'use client'

import {useEffect, useState} from "react";
import { getTop2Post} from "@/service/PostService";
import TopBar from "@/components/TopBar";
import Board from "@/components/BoardMain";
import ViewDetail from "@/components/ViewDetail";
import PediaDetail from "@/components/PediaDetail";
import MyPage from "@/components/MyPage";


export default function AddPost() {



    return (

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-full bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">

                </div>


                <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">


                    <div className="w-full">
                        <TopBar/>
                    </div>

                    <div className="h-5">

                    </div>

                    <hr className="w-full h-px bg-orange-300 border-0 my-2"/>

                    <div className="w-full h-auto">
                         <MyPage/>
                    </div>
                </div>

                {/* 우측 여백 공간 */}
                <div className="bg-gray-50 w-full h-full">

                </div>


            </div>

        </div>

    )
}