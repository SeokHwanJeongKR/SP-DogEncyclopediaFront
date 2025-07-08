'use client'


import {useEffect, useState} from "react";
import {createComment, deleteComment, getCommentList, updateComment} from "@/service/CommentService";
import {useParams} from "next/navigation";

export default function Comment({loginedUser}) {
    const postId = useParams().id;
    const [childComment, setChildComment] = useState("");
    const [comment, setComment] = useState("");
    const [editTargetId, setEditTargetId] = useState(null);
    const [editComment, setEditComment] = useState("");
    const maxLength = 200;
    const [parentCommentId, setParentCommentId] = useState(null);
    const [childCommentOpenId, setChildCommentOpenId] = useState(null);
    const [isOpenEdit, setisOpenEdit] = useState(false);

    const [comments, setComments] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {

                const result = await getCommentList(postId);

                setComments(result.comments);
                console.log("comments = ", result.comments);

            } catch (error) {
                console.log("댓글 조회 실패", error);
            }
        }
        fetchData()
    },[postId]);



    const handleCreateChildComment = (parentId) => async (e) => {

        e.preventDefault();

        const data = {
            comment: childComment,
            postId,
            parentCommentId: parentId
        };

        const result = await createComment(data);


        console.log("reuslt = ",result);

        setComment("");
        setParentCommentId(null);
        setChildCommentOpenId(null);

        try {
            const updated = await getCommentList(postId);
            setComments(updated.comments);
        } catch (error) {
            console.log("댓글 다시 조회 실패",error);
        }

    }

    const handleCreateComment = async (e) => {

        e.preventDefault();

        const data = {comment, postId, parentCommentId};

        const result = await createComment(data);

        console.log("reuslt = ",result);

        setComment("");

        try {
            const updated = await getCommentList(postId);
            setComments(updated.comments);
        } catch (error) {
            console.log("댓글 다시 조회 실패",error);
        }


    }

    const handleDeleteComment = (commentId) => async (e) => {

        try {
            const result = await deleteComment(commentId);
            console.log("reuslt = ",result);

            if (result) {
                const updated = await getCommentList(postId);
                setComments(updated.comments);

            }

        } catch (error) {
            console.log("댓글 삭제 실패",error);
        }


    }

    const handleEditCommentSet = (commentId,commentInfo) => async (e) => {

        setisOpenEdit(true);
        setEditTargetId(commentId);
        setEditComment(commentInfo)


    }

    const handleEditComment = (commentId) => async (e) => {

        const data = {comment : editComment}

        try  {
            const result = await updateComment(commentId ,data);
            console.log("reuslt = ",result);


            setisOpenEdit(false);

            const updated = await getCommentList(postId);
            setComments(updated.comments);
        } catch (error) {
            console.log("댓글 수정 실패",error);
        }

    }


    return (
        <div className="w-full h-full flex flex-col items-start justify-center gap-2 text-black">

            <div  className="flex items-start justify-start w-full h-full ">
                댓글 리스트
            </div>

            {/* 댓글 형태 */}
            {comments.length > 0 ? (
                comments.map((item) => {
                    return (
                        <div key={item.id}
                            className="w-full h-full flex flex-col items-start justify-start gap-2">
                            <div className="flex justify-start items-start w-full h-auto gap-3">


                                <div className="w-10 h-10 flex items-start justify-center">
                                    <div className="w-10 h-10 flex justify-center items-center bg-red-200 rounded-full ">
                                        <img
                                            src={item.userImageUrl}
                                            alt={item.userImageUrl}
                                            className="rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-start items-center w-full h-full text-sm gap-2">
                                    <div className="flex flex-col justify-start items-center w-full h-full">

                                        <div className="flex w-full h-6 justify-between justify-center font-semibold">
                                            <div className="flex items-center justify-start w-full h-full">
                                                {item.userNickName}
                                            </div>
                                            <div className="flex items-center justify-end w-full h-full text-gray-400 text-xs font-normal">
                                                {(loginedUser) && (
                                                    <div
                                                    onClick={ () => {
                                                    if (childCommentOpenId === item.id) {
                                                        setChildCommentOpenId(null)
                                                    } else {
                                                        setChildCommentOpenId(item.id)
                                                    }
                                                    }}
                                                    className="flex items-center justify-start w-7 cursor-pointer">
                                                        댓글
                                                    </div>
                                                )}
                                                {(loginedUser.id === item.userId) && (
                                                    <>
                                                        <div  className="flex items-center justify-start w-7 cursor-pointer"
                                                              onClick={handleEditCommentSet(item.id,item.comment)}
                                                        >
                                                        수정
                                                        </div>
                                                        <div  className="flex items-center justify-start w-7 cursor-pointer"
                                                                onClick={handleDeleteComment(item.id)}>
                                                        삭제
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </div>

                                        <br/>
                                        <div className="flex w-full h-full justify-start justify-center">
                                            {(isOpenEdit && editTargetId === item.id) ? (
                                                <div className="flex flex-col justify-center rounded-2xl items-center border-2  border-orange-200 w-full h-full relative mb-4">

                                                    <textarea
                                                        value={editComment}
                                                        onChange={(e) => setEditComment(e.target.value)}
                                                        className="flex text-black w-full h-40 rounded-xl p-2
                                                        focus:outline-none focus:border-orange-400 resize-none"
                                                        placeholder="댓글을 입력 해주세요"
                                                        maxLength={maxLength}
                                                    />

                                                    <div className="w-full h-full flex items-center justify-end p-2">
                                                        <div className="flex justify-center items-center w-18 h-6 text-gray-400">
                                                            {editComment.length} / {maxLength}
                                                        </div>
                                                        <button onClick={(e) => handleEditComment(item.id)(e)}
                                                                className="flex justify-center items-center w-20 h-6 bg-orange-400 text-black rounded-xl cursor-pointer"

                                                        >
                                                           수정 완료
                                                        </button>
                                                    </div>
                                                </div>


                                            ) : (
                                                <div className="flex w-full h-full justify-start justify-center">
                                                    {item.comment}
                                                </div>
                                            )}

                                        </div>
                                        <div className="flex w-full h-6 justify-end justify-center text-gray-500">
                                            {item.createdAt.split("T")[0]}
                                        </div>

                                        {/*대댓글 작성 부분*/}
                                        {childCommentOpenId === item.id && (
                                            <div className="w-full h-full">

                                                <div className="flex flex-col justify-center rounded-2xl items-center border-2  border-orange-200 w-full h-full relative mb-4">

                                        <textarea
                                            value={childComment}
                                            onChange={(e) => setChildComment(e.target.value)}
                                            className="flex text-black w-full h-40 rounded-xl p-2
                                            focus:outline-none focus:border-orange-400 resize-none"
                                            placeholder="댓글을 입력 해주세요"
                                            maxLength={maxLength}
                                        />

                                                    <div className="w-full h-full flex items-center justify-end p-2">
                                                        <div className="flex justify-center items-center w-18 h-6 text-gray-400">
                                                            {childComment.length} / {maxLength}
                                                        </div>
                                                        <button onClick={(e) => handleCreateChildComment(item.id)(e)}
                                                                className="flex justify-center items-center w-20 h-6 bg-orange-400 text-black rounded-xl cursor-pointer"

                                                        >
                                                            수정 완료
                                                        </button>


                                                    </div>
                                                </div>
                                            </div>

                                        )}


                                    </div>

                                </div>

                            </div>

                            <hr className="w-full h-px bg-orange-300 border-0 my-2"/>


                            {/* 대 댓글 */}

                            {(item.childrenComments || []).length > 0 && (
                                (item.childrenComments || []).map((child) => {
                                    return (
                                        <div key={child.id}
                                             className="w-full h-full flex flex-col items-start justify-start gap-2">
                                            <div className="flex justify-start items-start w-full h-auto gap-3">

                                                <div className="w-12 h-12 flex items-center justify-center">
                                                    <div className="w-12 h-12 flex justify-center items-center rounded-full ">
                                                        ㄴ
                                                    </div>
                                                </div>
                                                <div className="w-10 h-10 flex items-start justify-center">
                                                    <div className="w-10 h-10 flex justify-center items-center bg-red-200 rounded-full ">
                                                        <img
                                                            src={child.userImageUrl}
                                                            alt={child.userImageUrl}
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="flex justify-start items-center w-full h-full text-sm gap-2">
                                                    <div className="flex flex-col justify-start items-center w-full h-full">

                                                        <div className="flex w-full h-6 justify-between justify-center font-semibold">
                                                            <div className="flex items-center justify-start w-full h-full">
                                                                {child.userNickName}
                                                            </div>
                                                            <div className="flex items-center justify-end w-full h-full text-gray-400 text-xs font-normal">
                                                                {(loginedUser.id === child.userId) && (
                                                                    <>
                                                                        <div  className="flex items-center justify-start w-7 cursor-pointer"
                                                                              onClick={handleEditCommentSet(child.id,child.comment)}
                                                                        >
                                                                            수정
                                                                        </div>
                                                                        <div  className="flex items-center justify-start w-7 cursor-pointer"
                                                                              onClick={handleDeleteComment(child.id)}>
                                                                            삭제
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <br/>
                                                        <div className="flex w-full h-full justify-start justify-center">
                                                            {(isOpenEdit && editTargetId === child.id) ? (
                                                                <div className="flex flex-col justify-center rounded-2xl items-center border-2  border-orange-200 w-full h-full relative mb-4">

                                                                <textarea
                                                                    value={editComment}
                                                                    onChange={(e) => setEditComment(e.target.value)}
                                                                    className="flex text-black w-full h-40 rounded-xl p-2
                                                                    focus:outline-none focus:border-orange-400 resize-none"
                                                                    placeholder="댓글을 입력 해주세요"
                                                                    maxLength={maxLength}
                                                                />

                                                                    <div className="w-full h-full flex items-center justify-end p-2">
                                                                        <div className="flex justify-center items-center w-18 h-6 text-gray-400">
                                                                            {editComment.length} / {maxLength}
                                                                        </div>
                                                                        <button onClick={(e) => handleEditComment(child.id)(e)}
                                                                                className="flex justify-center items-center w-20 h-6 bg-orange-400 text-black rounded-xl cursor-pointer"

                                                                        >
                                                                            수정 완료
                                                                        </button>
                                                                    </div>
                                                                </div>


                                                            ) : (
                                                                <div className="flex w-full h-full justify-start justify-center">
                                                                    {child.comment}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex w-full h-6 justify-end justify-center text-gray-500">
                                                            {child.createdAt.split("T")[0]}
                                                        </div>



                                                    </div>

                                                </div>

                                            </div>

                                            <hr className="w-full h-px bg-orange-300 border-0 my-2"/>
                                        </div>
                                    )
                                }))
                             }



                        </div>

                    )
                })

            ) : (
                <div className="flex flex-col justify-start items-center w-full h-full gap-2">
                    <p>
                        댓글이 없습니다
                    </p>
                    <br/>
                    <hr className="w-full h-px bg-orange-300 border-0 my-2"/>
                </div>


            )}


            {/*댓글 작성 부분*/}
            {loginedUser ? (
                <form onSubmit={handleCreateComment} className="w-full h-full">
                    <div className="flex flex-col justify-center rounded-2xl items-center border-2  border-orange-200 w-full h-full relative mb-4">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="flex text-black w-full h-40 rounded-xl p-2
                focus:outline-none focus:border-orange-400 resize-none"
                        placeholder="댓글을 입력 해주세요"
                        maxLength={maxLength}
                    />
                        <div className="w-full h-full flex items-center justify-end p-2">
                            <div className="flex justify-center items-center w-18 h-6 text-gray-400">
                                {comment.length} / {maxLength}
                            </div>
                            <button type = "submit"
                                    className="flex justify-center items-center w-20 h-6 bg-orange-400 text-black rounded-xl cursor-pointer"
                            >
                                댓글 작성
                            </button>

                        </div>
                    </div>
                </form>

            ) : (
                <div className="flex flex-col justify-center rounded-2xl items-center border-2  border-orange-200 w-full h-full relative mb-4">
                    <div className="flex text-black w-full h-40 rounded-xl p-2
                focus:outline-none focus:border-orange-400 resize-none">
                        <p>로그인 해야 댓글 작성 가능합니다.</p>
                    </div>
                    <div className="w-full h-full flex items-center justify-end p-2">
                        <div className="flex justify-center items-center w-18 h-6 text-gray-400">
                            {comment.length} / {maxLength}
                        </div>
                        <button type = "submit"
                                className="flex justify-center items-center w-20 h-6 bg-orange-400 text-black rounded-xl cursor-pointer"
                        >
                            댓글 작성
                        </button>

                    </div>
                </div>
            ) }

        </div>
    )
}