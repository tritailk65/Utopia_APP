import ModalContainer from '../ModalContainer/ModalContainer';
import avt from '../../../assets/image/avt2.png';
import { useState, useEffect } from 'react';
import CommentItem from './CommentItem/CommentItem';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsChatSquareDots, BsSend } from 'react-icons/bs';
import { BiBookmark } from 'react-icons/bi';
import { Response } from '../../../types/api-type';
import { getListCommentByPostId } from '../../../services/comment-service';
import CommentSkeleton from '../../Skeleton/CommentSkeleton';
import useCommentModal from '../../../hooks/useCommentModal';
import { Comment, CreateComment } from '../../../types/comment-type';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import { UserInfo } from '../../../types/user-type';
import usePostingComment from '../../../hooks/usePostingComment';
import { createNewComment, createReplyComment } from '../../../services/comment-service';
function PostCommentModal() {
    const [screenHeight, setScreenHeight] = useState(window.screen.height);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Response<Comment[]>>();
    const [input, setInput] = useState<string>('');
    const user: UserInfo = useGetUserInfo();
    const { commentModalState, closeCommentModal } = useCommentModal();
    const { commentState, onFocusComment, onClearState } = usePostingComment();

    useEffect(() => {
        if (commentState.type === 'reply') {
            const replacedString = input.replace(/@[^ ]+\s+/, '');
            setInput('@' + commentState.data.comment + ' ' + replacedString);
        }
    }, [commentState]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res: Response<Comment[]> = await getListCommentByPostId(commentModalState.postId);
            if (res.Status === 200) {
                setData(res);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (commentModalState.show === true && commentModalState.postId > 0) {
            fetchData();
            onFocusComment(commentModalState.postId, '');
        }
    }, [commentModalState.show]);

    useEffect(() => {
        const updateScreenHeight = () => {
            setScreenHeight(window.screen.height * 0.8);
        };
        window.addEventListener('resize', updateScreenHeight);
        return () => {
            window.removeEventListener('resize', updateScreenHeight);
        };
    }, []);

    const handlePostComment = async () => {
        console.log(commentState);

        try {
            if (commentState.type === 'comment') {
                const tmp: CreateComment = {
                    userId: user.id,
                    postId: commentState.data.postId,
                    comment: input,
                    parentId: -1,
                };
                const res: Response<CreateComment> = await createNewComment(tmp);
                if (res.Status === 200) {
                    fetchData();
                    setInput('');
                    onClearState();
                }
            } else if (commentState.type === 'reply') {
                const tmp: CreateComment = {
                    userId: user.id,
                    postId: commentState.data.postId,
                    comment: input,
                    parentId: commentState.data.parentId,
                };
                const res: Response<CreateComment> = await createReplyComment(tmp);
                if (res.Status === 200) {
                    fetchData();
                    setInput('');
                    onClearState();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onClose = () => {
        closeCommentModal();
        setTimeout(() => {
            setInput('');
            onClearState();
        }, 1000);
    };

    return (
        <ModalContainer show={commentModalState.show} onClose={onClose} width="extra-larges">
            <div className={`min-h-[${screenHeight}px] flex flex-col w-full my-[-8px]`}>
                <div className="xl:h-[60vh]  h-[90vh] flex ">
                    <div className=" h-full flex flex-col items-center justify-center border-r-2 border-gray-200 ">
                        <img src={avt} alt="selected img" className="h-full" />
                    </div>
                    <div className="w-[460px] h-full  pt-4 flex flex-col">
                        <div className="overflow-y-auto text-justify border-b-2 border-gray-200  pl-2 h-[88%]">
                            {!loading && data?.Data && (
                                <>
                                    {data.Data.map((val: Comment, index) => {
                                        return <CommentItem data={val} />;
                                    })}
                                </>
                            )}
                            {loading && (
                                <>
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                </>
                            )}
                        </div>
                        <div className="h-[18%]  w-full pt-2">
                            <div className="flex justify-between text-2xl px-2 h-[35%]">
                                <div className="flex">
                                    <AiOutlineHeart className="cursor-pointer mr-4" />
                                    <BsChatSquareDots
                                        className="cursor-pointer mr-4"
                                        onClick={() =>
                                            onFocusComment(commentModalState.postId, 'You are replying this post ...')
                                        }
                                    />
                                    <BsSend className="cursor-pointer mr-4" />
                                </div>
                                <BiBookmark className="cursor-pointer" />
                            </div>
                            <div className="px-2  border-b-2 border-gray-200  h-[35%]">
                                <p className="text-sm font-semibold">1.408 likes</p>
                                <p className="text-xs opacity-80">3 hours ago</p>
                            </div>
                            <div className="px-2 flex items-center h-[30%]">
                                <textarea
                                    className="h-[70%] border-none w-[90%] mr-2 outline-none"
                                    placeholder={
                                        commentState.data.comment
                                            ? `You are replying @${commentState.data.comment}`
                                            : 'Add a comment...'
                                    }
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                {input.length > 0 && (
                                    <span
                                        onClick={handlePostComment}
                                        className="text-base text-blue-500 w-[10%] cursor-pointer font-semibold transition hover:text-blue-700"
                                    >
                                        Post
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
}

export default PostCommentModal;
