'use client'


import TopBar from "@/components/TopBar";
import BoardMain from "@/components/BoardMain";
import PediaMain from "@/components/PediaMain";
import EventMain from "@/components/EventMain";
import SearchBar from "@/components/SearchBar";
import ChatLauncher from "@/components/ChatLaunche";


export default function AddPost() {



    return (

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-full bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">
                    <h3>section 1</h3>
                </div>


                <div className="flex flex-col bg-white justify-start gap-1 items-center w-2000 h-full">


                    <div className="w-full">
                        <TopBar/>
                    </div>

                    <div className="w-full h-full">
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
                <h3>section 3</h3>
                </div>


            </div>
            <ChatLauncher/>

        </div>

    )
}