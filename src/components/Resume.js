import Link from "next/link";

export default function Resume() {
    return (
        <div className="flex flex-col justify-start items-center text-black  w-full h-full gap-4 pb-20">

            <div className="flex justify-start w-full gap-8 p-8">
                {/* 사진 */}
                <div className="flex justify-center items-center bg-orange-400 w-[250px] h-[250px] rounded-full shrink-0 overflow-hidden">
                    <img src="/picture/resume-photo.jpg" alt="resume-photo"/>
                </div>

                {/* 소개 글 */}
                <div className="flex flex-col justify-start items-start w-full p-4">

                    <div className="text-2xl font-semibold ">
                        정석환
                    </div>

                    <div className="flex justify-between items-center w-full py-2">
                        <div>
                            신입 아빠 개발자
                            <br/>
                            <br/>

                            <div className="text-gray-500 text-sm">
                                생년월일 : 1994.12.14
                                <br/>
                                병역 사항 : 육군 병장 만기 제대 (2020.04)
                            </div>
                        </div>

                        <div className="text-sm">
                            Mobile : 010 - 7207 - 3480
                            <br/>
                            E-mail :  jsver12@gmail.com
                            <br/>

                            <div className="flex justify-start items-center w-full gap-2">
                                <div>
                                    Git :
                                </div>
                                <Link href="https://github.com/SeokHwanJeongKR">
                                    <div className="text-blue-500 underline">
                                         github.com/SeokHwanJeongKR
                                    </div>
                                </Link>
                            </div>

                            <div className="flex justify-start items-center w-full gap-2">
                                <div>
                                    velog :
                                </div>
                                <Link href="https://velog.io/@hwan_94/posts">
                                    <div className="text-blue-500 underline">
                                        velog.io/@hwan_94
                                    </div>

                                </Link>
                            </div>


                        </div>
                    </div>

                    <div className="mt-4 text-base leading-relaxed">
                        안녕하세요 , 신입 개발자 정석환 입니다.
                        <br />
                        개발자도 처음이고, 아빠도 처음이지만 이 때 까지 해왔던 여러가지 경험을 바탕으로,
                        <br />
                        거친 파도에도 물러서지 않는 든든한 버팀목 같은 팀원, 개발자가 되겠습니다.
                    </div>

                </div>
            </div>



            <hr className="w-full h-px bg-orange-300 border-0"/>
            {/*기술 스택*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    기술 스택
                </div>
                <div className="px-2">
                    Java , Spring Boot , Spring Security  , MySQL , Maria DB , HTML/CSS , JavaScript , React  , Next.js , Docker ,  AWS , GIT
                </div>
            </div>

            {/*프론트 api*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    프론트 api 경험
                </div>
                <div className="px-2">
                    DnD kit , Kakao Maps Api , StompJs, SocketJs, Embla Carousel, ReactPaginate
                </div>
            </div>

            <hr className="w-full h-px bg-orange-300 border-0"/>

            {/*프로젝트 경험*/}
            <div className="font-semibold text-black w-full text-xl">
                프로젝트 경험
            </div>

            <div className="flex flex-col w-full gap-2">

                <ul className="flex flex-col gap-3 border-1 p-2 rounded-xl border-orange-200">



                    <li className="p-4">

                        <div className="flex flex-col w-full gap-1">

                            <div className="flex justify-start items-center font-semibold text-black w-full h-full text-xl gap-2">
                                <div>
                                    백과사전 사이트 프로젝트
                                </div>
                                <div className="text-gray-400 text-sm ">
                                    (Est Soft 부트캠프 / 2024.12.01~2024.12.31)
                                </div>
                            </div>

                            <div className="px-2">
                                위키피디아 처럼 강아지의 정보만이 들어 있는 백과사전 사이트
                            </div>
                            <br/>

                            <div className="px-2">
                                - form 로그인 기능 구현
                                <br/>
                                - 강아지 백과 기능 구현트
                            </div>


                        </div>
                    </li>

                    <hr className=" w-full h-px bg-orange-300 border-0 "/>


                    <li className="p-4">
                        <div className="flex flex-col w-full gap-1">

                            <div className="flex justify-start items-center font-semibold text-black w-full h-full text-xl gap-2">
                                <div>
                                    협업 툴 사이트 프로젝트
                                </div>
                                <div className="text-gray-400 text-sm ">
                                    (Est Soft 부트캠프 / 2025.01.09~2025.02.11)
                                </div>
                            </div>

                            <div className="px-2">
                                Figma , Jira , Discrod의 기능이 한번에 합쳐진 사이트
                            </div>
                            <br/>

                            <div className="px-2">
                                - 팀원 초대 기능 구현 (구글 SMTP 사용)
                                <br/>
                                - 칸반 보드 기능 구현 (DnD Kit 사용)
                                <br/>
                                - AOP (Aspect-Oriented Programming) 기능 구현
                            </div>


                        </div>
                    </li>

                    <hr className=" w-full h-px bg-orange-300 border-0 "/>

                    <li className="p-4">
                        <div className="flex flex-col w-full gap-1">

                            <div className="flex justify-start items-center font-semibold text-black w-full h-full text-xl gap-2">
                                <div>
                                    중고 판매 사이트 프로젝트
                                </div>
                                <div className="text-gray-400 text-sm ">
                                    (외부 프로젝트 / 2025.03.01~2025.04.30)
                                </div>
                            </div>

                            <div className="px-2">
                                중고 판매, 경매 사이트
                            </div>
                            <br/>

                            <div className="px-2">
                                - 판매 게시판 기능 구현
                                <br/>
                                - 위치 등록 (Kakao Map API 사용)
                                <br/>
                                - AWS S3 이미지 관리
                            </div>


                        </div>
                    </li>

                    <hr className=" w-full h-px bg-orange-300 border-0 "/>

                    <li className="p-4">
                        <div className="flex flex-col w-full gap-1">

                            <div className="flex justify-start items-center font-semibold text-black w-full h-full text-xl gap-2">
                                <div>
                                    멍피디아 재구현 솔로 프로젝트
                                </div>
                                <div className="text-gray-400 text-sm ">
                                    (1인 프로젝트 / 2025.05.10 ~ 2025.07.10)
                                </div>
                            </div>

                            <div className="px-2">
                                기존 강아지 백과 사이트를 리팩토링하며 보완한 개인 프로젝트
                            </div>
                            <br/>

                            <div className="px-2">
                                - 강아지 백과 , 게시판, 대댓글 구현
                                <br/>
                                - OAuth 2.0 구글 로그인 구현
                                <br/>
                                - JWT 토큰 사용
                                <br/>
                                - WebSocket 채팅 기능 구현
                                <br/>
                                - 카카오 지도 api 주변 병원 기능 구현
                                <br/>
                                - 엘라스틱 서치 검색 기능 구현
                            </div>


                        </div>
                    </li>

                </ul>

            </div>

            <hr className="w-full h-px bg-orange-300 border-0"/>

            {/*관련 교육 과정*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    관련 교육 과정
                </div>

                <div className="px-2">
                    <div>
                        이스트소프트 백엔드 개발자 부트캠프

                    </div>
                    <div className="text-gray-400 text-sm ">
                        2024.09 ~ 2025.02 | 수료
                    </div>
                </div>
            </div>

            <hr className="w-full h-px bg-orange-300 border-0"/>

            {/*학력*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    학력
                </div>
                <div className="px-2">
                    <div className="font-midium">
                        백석 예술 대학
                    </div>
                    <div className="text-gray-400 text-sm ">
                        전문대학교(전문 학사) | 실용음악과
                        <br/>
                        2013.03 ~ 2018.02  | 졸업
                    </div>

                </div>
            </div>

            <hr className="w-full h-px bg-orange-300 border-0"/>

            {/*근무 경력*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    근무 경력
                </div>
                <div className="px-2">
                    <div className="font-semibold">
                       코리안 하우스
                    </div>
                    <div className="text-gray-400 text-sm ">
                        인조 대리석 시공 업체
                    </div>
                    <div className="text-sm ">
                        2020.05 ~ 2025.05
                        <br/>
                        <br/>

                        - 자재 입출고 관리 <br/>
                        - 현장 실측 및 도면 제작 <br/>
                        - 공장 제품 제작 및 현장 시공, 시공 인원 관리 및 감독 <br/>
                        <br/>
                        → 아이 임신을 계기로 장기적인 커리어 설계를 고민하게 되었고,  안정성과 성장을 동시에 추구할 수 있는 백엔드 개발자로 전향
                    </div>
                </div>
            </div>

            <hr className="w-full h-px bg-orange-300 border-0"/>

            {/*어학 능력*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    어학 능력
                </div>
                <div className="px-2">
                    <div>
                        - 영어 : 일상 회화 수준 (자격증 없음)
                        <br/>
                        - 일본어 : 비즈니스 회화 가능 (자격증 없음)
                    </div>

                </div>
            </div>

            <hr className="w-full h-px bg-orange-300 border-0"/>

            {/*자기 소개*/}
            <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-black w-full text-xl">
                    자기 소개
                </div>
                <div className="px-2">
                    안녕하세요. 신입 백엔드 개발자 정석환입니다.
                    <br/>
                    <br/>
                    저는 실용음악과를 전공하며 팀원들과의 지속적인 소통과 협업 속에서 연주의 완성도를 높이는 법을 배웠습니다.<br/>
                    또한 국제 결혼을 하고 결혼 생활을 통해 일상 속에서도 소통의 중요성과 배려의 가치를 깊이 체감해왔습니다.
                    <br/>
                    <br/>
                    5년간 인조대리석 업체에서 자재 관리부터 시공까지 전반적인 업무를 경험했으며,<br/>
                    현장 경험 속에서는 다양한 관계자 사이에서 중간 조율 역할을 맡으며 정해진 기간 내 마감을 위해 불철주야 일하며 책임을 다해왔습니다.<br/>
                    이러한 경험을 통해, 혼자 잘하는 것보다 함께 문제를 해결하며 팀 전체가 성장하는 문화와 끈기와 책임감의 중요성을 알게 되었습니다.
                    <br/>
                    <br/>
                    저는 새로운 것을 배우고 시도하는 과정에서 큰 즐거움을 느낍니다.<br/>
                    컴퓨터 조립, 그림, 피아노·드럼·베이스 연주, 어학 등 다양한 취미를 꾸준히 이어오며,<br/>
                    연습과 시행착오, 그리고 성취의 기쁨을 몸으로 익혀왔습니다.
                    <br/>
                    <br/>
                    이러한 배움의 태도는 개발 공부에도 고스란히 이어졌고,<br/>
                    지속적인 성장을 가능하게 만드는 원동력이 되었습니다.
                    <br/>
                    <br/>
                    아이 출산을 계기로 더 안정적이고 성장 가능성 있는 커리어를 고민하게 되었고,<br/>
                    문제를 해결하고 무언가를 만들어내며 끊임없이 배우는 개발자라는 직무에 큰 매력을 느껴 진로를 전환하게 되었습니다.
                    <br/>
                    <br/>
                    앞으로도 끊임없이 소통하고, 끈기와 책임감을 가진 신뢰받는 개발자가 되겠습니다.

                </div>
            </div>

        </div>
    )
}