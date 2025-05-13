'use client'


import LoginAndLogout from '@/components/loginAndLogout'

export default function MainPage() {

    return (

        <div className="flex w-full justify-center min-h-screen bg-white">
            {/* 왼쪽 여백 */}
            <div className="bg-green-50 w-1/20 h-full p-1">

            </div>

            {/* 중앙 게시판 */}
            <div className="bg-white flex justify-center items-start p-2 w-18/20">

                <div className="bg-white w-230 h-full flex-col">

                    <div className="bg-amber-200 w-full h-20">
                        <LoginAndLogout/>
                    </div>
                </div>
            </div>

            {/* 오른쪽 여백 */}
            <div className="bg-green-50 w-1/20 h-full">
                <p>
                </p>
            </div>
        </div>
    )

}