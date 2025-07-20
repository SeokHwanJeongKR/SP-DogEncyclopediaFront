
import {Suspense} from "react";
import BoardAll from "@/components/BoardAll";

export default function BoardPage() {
    return (
        <Suspense fallback={<p>검색 중입니다...</p>}>
            <BoardAll/>
        </Suspense>
    )
}