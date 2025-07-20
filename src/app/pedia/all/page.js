
import {Suspense} from "react";
import PediaAll from "@/components/PediaAll";

export default function PeidaPage() {
    return (
        <Suspense fallback={<p>검색 중입니다...</p>}>
            <PediaAll/>
        </Suspense>
    )
}