import ModalContainer from '../ModalContainer/ModalContainer';
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
import { ToastContainer, toast } from 'react-toastify';
import { backend_utils as backend } from '../../../utils/api-utils';
import avt from '../../../assets/image/avt2.png';
import 'react-toastify/dist/ReactToastify.css';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings: Settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots',
};

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
            const res: Response<Comment[]> = await getListCommentByPostId(commentModalState.post!.id);
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
        if (commentModalState.show === true && commentModalState.post!.id > 0) {
            fetchData();
            onFocusComment(commentModalState.post!.id, '');
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
                    onFocusComment(commentModalState.post!.id, '');
                    showToast(true, 'Add comment successfully !');
                } else {
                    setInput('');
                    onFocusComment(commentModalState.post!.id, '');
                    showToast(false, 'Add comment failed !');
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
                    onFocusComment(commentModalState.post!.id, '');
                    showToast(true, 'Reply comment successfully !');
                } else {
                    setInput('');
                    onFocusComment(commentModalState.post!.id, '');
                    showToast(false, 'Reply comment failed !');
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

    const showToast = (result: boolean, message: string) => {
        if (result) {
            toast.success(message, {
                position: 'top-left',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } else {
            toast.error(message, {
                position: 'top-left',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <ModalContainer show={commentModalState.show} onClose={onClose} width="extra-larges">
            <div className={`min-h-[${screenHeight}px] flex flex-col w-full my-[-8px]`}>
                <div className="xl:h-[60vh]  h-[90vh] flex ">
                    <div className=" h-full  border-r-2 border-gray-200 max-w-[723px]">
                        {commentModalState.post != null && commentModalState.post!.images.length > 0 && (
                            <Slider {...settings}>
                                {commentModalState.post!.images.map((val, index) => {
                                    return (
                                        <img
                                            src={backend.imagePath + val.name}
                                            alt="selected img"
                                            className="h-full"
                                            key={index}
                                        />
                                    );
                                })}
                            </Slider>
                            // <img
                            //     src={backend.imagePath + commentModalState.post!.images[0].name}
                            //     alt="img"
                            //     className="h-full"
                            // />
                        )}
                    </div>
                    <div className="w-[460px] h-full  pt-4 flex flex-col">
                        <div className="overflow-y-auto text-justify border-b-2 border-gray-200  pl-2 h-[88%]">
                            {!loading && data?.Data && (
                                <>
                                    {data.Data.map((val: Comment, index) => {
                                        return <CommentItem data={val} toast={showToast} />;
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
                                        onClick={() => onFocusComment(commentModalState.post!.id, 'this post ...')}
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
                                {commentModalState.post != null && commentModalState.post!.commentStat === 0 && (
                                    <>
                                        <textarea
                                            className="h-[70%] border-none w-[90%] mr-2 outline-none"
                                            placeholder={
                                                commentState.data.comment
                                                    ? `You are replying ${commentState.data.comment}`
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
                                    </>
                                )}
                                {commentModalState.post != null && commentModalState.post!.commentStat === 1 && (
                                    <p className="h-[70%] border-none w-[100%] mr-2 ">Commenting has been turned off</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </ModalContainer>
    );
}

export default PostCommentModal;
