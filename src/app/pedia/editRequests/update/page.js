import EditPost from "@/components/EditPost";
import {Suspense} from "react";

export default function Page() {
    return (
        <Suspense fallback={<p>검색 중입니다...</p>}>
            <EditPost />;
        </Suspense>
    )
}