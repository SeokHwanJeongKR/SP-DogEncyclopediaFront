'use client'

import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getMemberInfo} from "@/service/loginService";
import ChatLauncher from "@/components/ChatLaunche";

export default function Calculator() {
        
    const [birthday, setBirthday] = useState("");

    function addDay(birthday, days) {
        const date = new Date(birthday);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    const [loginedUser, setLoginedUser] = useState("");

    useEffect(() => {
        async function loadMember() {
            try {
                const user = await getMemberInfo();
                setLoginedUser(user);
                console.log(user);
            } catch (error) {
                console.log("유저 정보 조회에 실패 했습니다.",error);
            }
        }

        loadMember();
    }, []);

    return(

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-auto bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">
                </div>

                <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">

                    <div className="w-full">
                        <TopBar loginedUser =  {loginedUser}/>
                    </div>

                    <div  className=" flex justify-start items-center w-full h-20 text-2xl text-orange-400">
                        강아지 백신 계산기
                    </div>

                    <div className="w-full h-full flex flex-col text-black gap-5">
                        <div className="text-xl text-black flex justify-start items-center p-2">
                            강아지 생일
                        </div>
                        <DatePicker
                            selected={birthday}
                            onChange={(date) => setBirthday(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="연도-월-일"
                            className="pointer-events-auto z-0 w-full h-15 p-2 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none"
                            calendarClassName="shadow-lg"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={50}
                            maxDate={new Date()}
                            popperPlacement="bottom"

                        />
                        <hr className="border-t border-orange-300" />
                        <div className="w-full h-15 text-orange-400 text-2xl flex justify-start items-center">
                            예방 접종 계산 결과
                        </div>

                        <div>
                            <table className="w-full table-fixed text-xl text-center border border-gray-500">
                                <thead className="bg-orange-200">

                                    <tr>
                                        <th className="border px-4 py-2">종류</th>
                                        <th className="border px-4 py-2">일정</th>
                                    </tr>

                                </thead>
                                <tbody>
                                <tr>
                                    <th className="border px-4 py-2 font-normal">기생충 구충</th>
                                    <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*2) : "생일을 입력 해주세요"}</th>
                                </tr>
                                    <tr>
                                        <th className="border px-4 py-2 font-normal">종합백신 1차 (DHPP) + 코로나 장염 1차 + 기생충 구충</th>
                                        <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*6) : "/"}</th>
                                    </tr>
                                    <tr>
                                        <th className="border px-4 py-2 font-normal">종합백신 2차 (DHPP) 코로나 장염 2차 + 심장사상충 </th>
                                        <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*8) : " / "}</th>
                                    </tr>
                                    <tr>
                                        <th className="border px-4 py-2 font-normal">종합백신 3차 (DHPP) + 켄넬코프 1차 + 기생충 구충</th>
                                        <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*10) : " / "}</th>
                                    </tr>
                                    <tr>
                                        <th className="border px-4 py-2 font-normal">종합백신 4차 (DHPP) + 켄넬코프 2차</th>
                                        <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*12) : " / "}</th>
                                    </tr>
                                    <tr>
                                        <th className="border px-4 py-2 font-normal">종합백신 5차 (DHPP) + 인플루엔자 1차 + 기생충 구충</th>
                                        <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*14) : " / "}</th>
                                    </tr>
                                    <tr>
                                        <th className="border px-4 py-2 font-normal">광견병 + 인플루엔자 2차</th>
                                        <th className="border px-4 py-2 font-normal">{birthday ? addDay(birthday,7*16) : " / "}</th>
                                    </tr>

                                </tbody>
                            </table>
                            <div className="flex w-full h-10 justify-end items-center p-2 text-gray-400 text-sm">
                                * 이 정보는 Youtube "설채현의 놀로와" 님의 영상을 기반으로 만들었습니다.
                            </div>
                        </div>

                        <div className="w-full h-full flex flex-col justify-start items-center gap-2">

                            <div className="flex justify-start items-center text-2xl text-orange-400 w-full h-full">
                                종합 백신이란?
                            </div>
                            <div className="border-2 p-4 border-orange-200 w-full h-full rounded-2xl">
                                D: Distemper (홍역)
                                <br/>
                                H: Hepatitis (전염성 간염)
                                <br/>
                                P: Parvovirus (파보 바이러스성 장염)
                                <br/>
                                P: Parainfluenza (파라인플루엔자)
                                <br/>
                                L: Leptospirosis (렙토스피라병, 선택적으로 추가)
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col justify-start items-center gap-2">

                            <div className="flex justify-start items-center text-2xl text-orange-400 w-full h-full">
                                백신 종류 별 비용
                            </div>
                            <div className="border-2 p-4 text-xl border-orange-200 w-full h-full rounded-2xl">
                                <span className="font-semibold">종합 백신 </span>: 25,000원
                                <br/>
                                <span className="font-semibold">코로나 장염 백신 </span>: 15,000원
                                <br/>
                                <span className="font-semibold">켄넬 코프 백신 </span>: 15,000원
                                <br/>
                                <span className="font-semibold">신종 플루 백신 </span>: 30,000원
                                <br/>
                                <span className="font-semibold">광견병 백신 </span>: 20,000원
                                <br/>
                                <span className="font-semibold">심장사상충 백신 </span>: 30,000원
                                <br/>
                                <span className="font-semibold">기생충 백신 </span>: 12,000원
                            </div>
                            <div className="flex w-full h-10 justify-end items-center p-2 text-gray-400 text-sm">
                                * 이 금액은 병원에 따라 상이 할 수 있습니다.
                            </div>

                        </div>

                    </div>

                    <div>
                        {loginedUser && loginedUser.role !== "ADMIN" && <ChatLauncher />}
                    </div>

                </div>

                <div className="bg-white w-full h-full">
                </div>
            </div>
        </div>

    )
}