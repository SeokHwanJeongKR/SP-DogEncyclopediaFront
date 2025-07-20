'use client'

import {useEffect, useState} from "react";
import TopBar from "@/components/TopBar";
import "react-datepicker/dist/react-datepicker.css";
import Script from "next/script";
import ChatLauncher from "@/components/ChatLaunche";
import {getMemberInfo} from "@/service/loginService";


export default function Calculator() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        // 카카오 맵 api가 정상적으로 로드 되었는지 확인하는 조건
        if (!window.kakao || !window.kakao.maps) return

        // 콜백함수 load가 된 후에 아래의 내용을 실행 하라는 것
        window.kakao.maps.load(() => {

            // id가 map이라는 것에 그려질 것이라고 설정
            const container = document.getElementById('map')

            if (!container) return

            // 콘테이너 안의 내용을 지움 왜냐하면 모달을 닫았다가 열면 지도가 깨지거나 겹칠 수 있기에 초기화를 함.
            container.innerHTML = ''

            //  navigator.geolocation.getCurrentPosition를 통해서 현재 위치 가져오기 (브라우저 지원)
            // 자바스크립트의 표준 api, 브라우저에 내장된 web api
            navigator.geolocation.getCurrentPosition(

                //position = 콜백 함수 이름
                (position) => {

                    // 작업이 끝난 후 실행 될 코드
                    const lat = position.coords.latitude
                    const lng = position.coords.longitude
                    createMap(lat, lng)
                },
                () => {
                    console.warn(' 위치 정보 사용 불가, 기본 좌표 사용')
                    createMap(33.450701, 126.570667)
                }
            )


            function createMap(lat, lng) {
                const map = new window.kakao.maps.Map(container, {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 3
                });

                // 장소 검색을 하려면 services.places 추가가 필요하다.
                const ps = new window.kakao.maps.services.Places();

                // 반경 리스트 3km,5km,10km
                const radiusList = [3000, 5000, 10000];

                // 재귀 호출로 한단계식 순차적으로 검색
                function searchByRadius(index = 0) {
                    //반경 리스트보다 index가 높을 경우 검색 실패
                    // 0 , 1 ,2  즉 3km,5km,10km검색
                    if (index >= radiusList.length) {
                        console.warn("검색 결과 없음: 모든 반경 검색 실패");
                        return;
                    }

                    //반경
                    const radius = radiusList[index];
                    console.log("반경 ${radius/1000}km 에서 검색 시도");

                    //동물병원 검색 후
                    ps.keywordSearch("동물병원", (data, status) => {
                        if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                            // 검색 결과 있을 때
                            const bounds = new window.kakao.maps.LatLngBounds();

                            for (let i = 0; i < data.length; i++) {
                                const place = data[i];
                                const position = new window.kakao.maps.LatLng(place.y, place.x);

                                const marker = new window.kakao.maps.Marker({
                                    map: map,
                                    position: position,
                                });

                                const infowindow = new window.kakao.maps.InfoWindow({
                                    content: `
                                    <div style="padding:5px; font-size:12px; color:#000; background-color:#fff;">
                                        <strong style="color:#000;">${place.place_name}</strong><br/>
                                        <span style="color:#000;">${place.address_name}</span><br/>
                                        ${place.phone ? `<span style="color:#000;">전화: ${place.phone}</span><br/>` : ''}
                                        <a href="${place.place_url}" target="_blank" style="color:blue;  text-decoration:underline;">상세보기</a>
                                    </div>
                                  `
                                });

                                window.kakao.maps.event.addListener(marker, 'click', function() {
                                    if (infowindow.getMap()) {
                                        infowindow.close();
                                    } else {
                                        infowindow.open(map, marker);
                                    }
                                });

                                bounds.extend(position);
                            }

                            // 검색된 모든 마커가 보이도록 지도 중심/확대 조정
                            map.setBounds(bounds);

                        } else {
                            // 결과 없으면 반경 넓혀서 재검색
                            searchByRadius(index + 1);
                        }
                    }, {
                        location: new window.kakao.maps.LatLng(lat, lng),
                        radius: radius
                    });
                }

                // 처음 시도
                searchByRadius();
            }
        })
    }, [loaded])
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

    return(

        <div className="flex flex-col w-full h-full min-h-screen bg-white">


            <div className="flex w-full justify-center h-auto bg-white">

                {/* 왼쪽 여백 공간 */}
                <div className="bg-white w-full h-full">

                </div>

                <div className="flex flex-col gap-2 bg-white justify-start items-center w-1600 h-full">

                    <div className="w-full">
                        <TopBar loginedUser={loginedUser}/>
                    </div>

                    <div  className=" flex justify-start items-center w-full h-20 text-2xl text-orange-400">
                        근처 동물 병원 조회
                    </div>

                    <div className="flex flex-col justify-center items-center w-full h-full gap-2">
                        <div className="flex justify-center items-center w-[800px] h-[600px] bg-slate-100">

                            <>
                                <Script
                                    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c03cf5575f9c04bfdc0f4bfe7fbc30db&autoload=false&libraries=services"
                                    strategy="afterInteractive"
                                    onLoad={() => {
                                       setLoaded(true);
                                    }}
                                    className="text-black"
                                />
                                <div id="map" className="w-[800px] h-[600px] bg-slate-100"></div>
                            </>

                        </div>
                        <div className="flex justify-end items-center  w-[800px] h-full text-gray-500 text-xs">
                            <p>
                                위치 정보 제공에 동의 하지 않으면 제대로 된 위치가 제공되지 않습니다.
                            </p>
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