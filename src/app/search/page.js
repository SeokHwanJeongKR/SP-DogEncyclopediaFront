'use client'

import { useSearchParams } from "next/navigation";
import SearchedResult from "@/components/SearchedResult";
import TopBar from "@/components/TopBar";
import EventMain from "@/components/EventMain";
import SearchBar from "@/components/SearchBar";
import PediaMain from "@/components/PediaMain";
import BoardMain from "@/components/BoardMain";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword");

    return (
        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-full bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">

                </div>


                <div className="flex flex-col bg-white justify-start items-center w-1600 h-full">


                    <div className="w-full">
                        <TopBar/>
                    </div>


                    {/*구분선 검색*/}
                    <hr className="w-full h-px bg-orange-300 border-0"/>

                    <div className="w-full h-full">
                        <SearchBar/>
                    </div>

                    <div className="w-full h-full">
                        <SearchedResult keyword={keyword} />
                    </div>
                </div>

                {/* 우측 여백 공간 */}
                <div className="bg-gray-50 w-full h-full">

                </div>


            </div>

        </div>

    )
}