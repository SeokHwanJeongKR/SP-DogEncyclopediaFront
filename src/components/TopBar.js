import Link from 'next/link';
import LoginAndLogout from "@/components/LoginAndLogout";
import {useEffect, useState} from "react";
import {getLogo} from "@/service/LogoService";

export default function TopBar() {

    const [adminDropDownOpen, setAdminDropDownOpen] = useState(false);
    const [comunityDropDownOpen, setComunityDropDownOpen] = useState(false);
    const [logo,setLogo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await getLogo()
            const url = result.logo.url;
            setLogo(url);
            console.log("top bar logo" + url);
        }
        fetchData();
    })

    return (

        <div className="flex justify-center items-center bg-orange-200 text-black w-full h-15">

            <div className="flex justify-center items-center h-full w-2/10">
               <div className="w-35 h-15 overflow-hidden hover:font-semibold ">
                   <Link href="/main">
                       {logo ? (
                           <img src={logo} alt="logo" className="h-full w-full" />
                       ) : (
                           <div className="flex justify-center items-center w-full h-full">
                               로고 없음
                           </div>
                       )}
                   </Link>
               </div>
            </div>

            <div className="flex w-5/10 gap-8 justify-center items-center">

                <div className="hover:font-semibold">
                    <Link href="/main">
                        <p>홈</p>
                    </Link>
                </div>


                <div className="hover:font-semibold">
                    <Link href="/pedia/all?page=1">
                        <p>강아지백과</p>
                    </Link>
                </div>


                <div
                    className="relative w-30 h-full"
                    onMouseEnter={() => setComunityDropDownOpen(true)}
                    onMouseLeave={() => setComunityDropDownOpen(false)}
                >
                    <div className="flex justify-center items-center w-30 h-15 gap-2 hover:font-semibold">
                        <Link href="/board/all?page=1">
                            <p>커뮤니티</p>
                        </Link>
                    </div>
                    <div
                        className={`absolute top-full mt-1 bg-white shadow-md w-full transition-all duration-300 overflow-hidden ${
                            comunityDropDownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <ul className="flex flex-col justify-center items-center w-full">

                            <li className="flex justify-center items-center px-4 py-2 w-full hover:bg-orange-100 cursor-pointer hover:font-semibold">
                                <Link href="/board/create">
                                    게시글 작성
                                </Link>
                            </li>


                        </ul>
                    </div>
                </div>

                <div className="hover:font-semibold">
                    <p>백신 계산기</p>
                </div>

                <div className="hover:font-semibold">
                    <p>동물 병원</p>
                </div>

                <div
                    className="relative w-35 h-full"
                    onMouseEnter={() => setAdminDropDownOpen(true)}
                    onMouseLeave={() => setAdminDropDownOpen(false)}
                >
                    <div className="flex justify-center items-center w-35 h-15 gap-2">

                        <p>관리자</p>
                    </div>
                    <div
                        className={`absolute top-full mt-1 bg-white shadow-md w-full transition-all duration-300 overflow-hidden ${
                            adminDropDownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <ul className="flex flex-col justify-center items-center w-full">
                            <li className=" flex justify-center items-center px-4 py-2 w-full hover:bg-orange-100 cursor-pointer hover:font-semibold">
                                <Link href="/event/create">
                                    이벤트 등록
                                </Link>
                            </li>

                            <li className="flex justify-center items-center px-4 py-2 w-full hover:bg-orange-100 cursor-pointer hover:font-semibold">
                                <Link href="/logo/create">
                                    로고 등록
                                </Link>
                            </li>
                            <li className="flex justify-center items-center px-4 py-2 w-full hover:bg-orange-100 cursor-pointer hover:font-semibold">
                                <Link href="/chat/admin/list">
                                    문의 내역
                                </Link>
                            </li>

                            <li className="flex justify-center items-center px-4 py-2 w-full hover:bg-orange-100 cursor-pointer hover:font-semibold">
                                <Link href="/pedia/create">
                                    피디아 등록
                                </Link>
                            </li>

                            <li className="flex justify-center items-center px-4 py-2 w-full hover:bg-orange-100 cursor-pointer hover:font-semibold">
                                <Link href="/pedia/editRequests?page=1">
                                    수정 요청 조회
                                </Link>
                            </li>


                        </ul>
                    </div>

                </div>

            </div>


            <div className="flex justify-end p-2 items-center h-full w-3/10">

                <LoginAndLogout/>

            </div>

        </div>


    )
}