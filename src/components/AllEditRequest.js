
import {useEffect, useState} from "react";
import {getAllEditRequests} from "@/service/PediaService";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";

export default function AllEditRequest() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get("page") || 1;
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllEditRequests(page);
                console.log("result = " , result);

                if (result) {
                    setResult(result);
                }

                if(result === null) {
                    console.log("모든 백과 수정 요청 조회 실패");
                }
        } catch (e) {
            console.error("모든 백과 수정 요청 조회 실패",e);}
        }
        fetchData();
    }, [page]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1; //
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(selectedPage));
        router.push(`/pedia/editRequests?${params.toString()}`);
    };

    return (

        <div className="flex flex-col w-full h-full gap-3 bg-white justify-start items-center text-black">

            {result?.requests?.content?.length > 0 ? (
                result.requests.content.map((item, index) => {

                    return (

                        <div key={index} className="border-2 w-full h-full rounded-lg p-4">
                            <Link href={`/pedia/editRequests/update?requestId=${item.id}`} key={index}>
                                <p>EditRequest Id : {item.id}</p>
                                <p>Pedia ID: {item.pediaId}</p>
                                <p>대상 항목: {item.target}</p>
                                <p>기존 정보: {item.originalInfo}</p>
                                <p>새 정보: {item.newInfo}</p>
                                <p>요청 일시: {item.createdAt.split("T")[0]}</p>
                            </Link>
                        </div>

                    )
                })
            ) : (
                <p>
                    존재하는 수정 요청이 없습니다.
                </p>
            )}

        </div>


    )
}