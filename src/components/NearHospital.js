'use client'

import Script from "next/script";
import { useEffect, useState } from "react";

export default function NearHospital() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) return;

        if (!window.kakao || !window.kakao.maps) {
            console.log("window.kakao.maps 로드 안됨");
            return;
        }

        // setTimeout으로 살짝 딜레이 → DOM 준비
        window.kakao.maps.load(() => {
            setTimeout(() => {
                const container = document.getElementById("map");
                if (!container) return;

                const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
                const map = new window.kakao.maps.Map(container, {
                    center,
                    level: 5,
                });

                console.log("지도 생성 성공");
            }, 100); // 0.1초 딜레이
        });
    }, [loaded]);

    return (
        <>
            <Script
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=58bc6414252549274c76e1de1a4140c5&autoload=false`}
                strategy="afterInteractive"
                onLoad={() => {
                    console.log("카카오 스크립트 로드 완료");
                    setLoaded(true);
                }}
            />
            <div
                id="map"
                style={{
                    width: "800px",
                    height: "600px",
                    border: "2px solid orange",
                }}
            />
        </>
    );
}
