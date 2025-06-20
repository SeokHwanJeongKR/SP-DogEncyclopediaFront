import {useState} from "react";
import {useRouter} from "next/navigation";

export  default function SearchBar() {

    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-18">
            <div className="flex border-orange-300 w-120 h-12 border-1 rounded-4xl text-gray-700 justify-center items-center p-2">

                <div className="flex items-center justify-center w-1/4">
                    통합 검색
                </div>

                <div className="h-6 border-l-2 border-orange-200 mx-2"></div>

                <div className="flex items-center justify-center w-3/4">
                    <input
                        className="h-full w-full  focus:outline-none "
                        type="text"
                        name="search"
                        placeholder={"검색어를 입력 해주세요"}
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

            </div>
        </div>
    )
}