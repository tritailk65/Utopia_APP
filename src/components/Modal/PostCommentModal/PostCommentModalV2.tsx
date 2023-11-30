import ModalContainer from '../ModalContainer/ModalContainer';
import { useState, useEffect, Fragment } from 'react';
import CommentItem from './CommentItem/CommentItem';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatSquareDots, BsSend, BsFillBookmarkFill } from 'react-icons/bs';
import { BiBookmark } from 'react-icons/bi';
import { Response } from '../../../types/api-type';
import { getListCommentByPostId } from '../../../services/comment-service';
import CommentSkeleton from '../../Skeleton/CommentSkeleton';
import { Comment, CreateComment } from '../../../types/comment-type';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import { UserInfo } from '../../../types/user-type';
import usePostingComment from '../../../hooks/usePostingComment';
import { createNewComment, createReplyComment } from '../../../services/comment-service';
import { toast } from 'react-toastify';
import { backend_utils as backend } from '../../../utils/api-utils';
import 'react-toastify/dist/ReactToastify.css';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Menu, Transition } from '@headlessui/react';
import useEditPostModal from '../../../hooks/useEditPostModal';
import { PostEdit, PostForViewer } from '../../../types/post-type';
import EditPostModal from '../EditPostModal/EditPostModal';
import { deletePostService } from '../../../services/post-service';
const settings: Settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots',
};

interface PostCommentModalProps {
    show: boolean;
    post: PostForViewer;
    onCloseModal: () => void;
    onLike: () => void;
    onSave: () => void;
}

function PostCommentModalV2(props: PostCommentModalProps) {
    const [post, setPost] = useState<PostForViewer>(props.post);
    const [screenHeight, setScreenHeight] = useState(window.screen.height);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Response<Comment[]>>();
    const [input, setInput] = useState<string>('');
    const user: UserInfo = useGetUserInfo();
    const { commentState, onFocusComment, onClearState } = usePostingComment();
    const { editPostState, openEditModal } = useEditPostModal();

    useEffect(() => {
        setPost(props.post);
    }, [props.post]);

    useEffect(() => {
        if (commentState.type === 'reply') {
            const replacedString = input.replace(/@[^ ]+\s+/, '');
            setInput('@' + commentState.data.comment + ' ' + replacedString);
        }
    }, [commentState]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res: Response<Comment[]> = await getListCommentByPostId(post.id);
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
        if (props.show === true && post.id > 0) {
            fetchData();
            onFocusComment(post.id, '');
        }
    }, [props.show]);

    useEffect(() => {
        const updateScreenHeight = () => {
            setScreenHeight(window.screen.height * 0.8);
        };
        window.addEventListener('resize', updateScreenHeight);
        return () => {
            window.removeEventListener('resize', updateScreenHeight);
        };
    }, []);

    const handleOpenEditModal = () => {
        const tmp: PostEdit = {
            postId: post.id,
            title: post.title,
            isHideLike: post.isHideLike,
            commentStat: post.commentStat,
            alert: post.alert,
        };
        // closeCommentModal();
        // setTimeout(() => {
        //     openEditModal(tmp);
        // }, 400);
        console.log(tmp);

        openEditModal(tmp);
    };

    const handlePostComment = async () => {
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
                    onFocusComment(post.id, '');
                    showToast(true, 'Add comment successfully !');
                } else {
                    setInput('');
                    onFocusComment(post.id, '');
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
                    onFocusComment(post.id, '');
                    showToast(true, 'Reply comment successfully !');
                } else {
                    setInput('');
                    onFocusComment(post.id, '');
                    showToast(false, 'Reply comment failed !');
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onClose = () => {
        if (editPostState.show === false) {
            props.onCloseModal();
            setTimeout(() => {
                setInput('');
                onClearState();
            }, 1000);
        }
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

    const handleDeletePost = async () => {
        const res: Response<null> = await deletePostService(post.id);
        if (res.Status === 200) {
            showToast(true, 'Delete post successfully');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            showToast(false, 'Someting wrong please try again ');
        }
    };

    return (
        <ModalContainer show={props.show} onClose={onClose} width="extra-larges">
            <div className={`min-h-[${screenHeight}px] flex flex-col w-full my-[-8px]`}>
                <div className="xl:h-[60vh]  h-[90vh] flex ">
                    <div className=" h-full  border-r-2 border-gray-200 max-w-[723px]">
                        {post != null && post.images.length > 0 && (
                            <Slider {...settings}>
                                {post.images.map((val, index) => {
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
                        )}
                    </div>
                    <div className="w-[460px] pl-4 pt-4 flex flex-col m">
                        <div className="pl-1 text-base flex items-center justify-between">
                            <div className="flex items-center">
                                {user != null && (
                                    <>
                                        <Link to={'/profile/' + `user.userName`}>
                                            <img
                                                src={backend.imagePath + post.user.avatarPath}
                                                alt="avatar"
                                                className="w-10 h-10 circle mr-1"
                                            />
                                        </Link>

                                        <Link to={'/profile/' + user.userName}>
                                            <span className="px-2 font-semibold tracking-wide cursor-pointer">
                                                {post.user.userName}
                                            </span>
                                        </Link>
                                    </>
                                )}

                                <span className="">-</span>
                                {post && (
                                    <span className="px-2">
                                        {post.time / 24 < 1 ? post.time + 'h' : (post.time % 24) + 'd'}
                                    </span>
                                )}
                            </div>
                            {post != undefined && post.isOwner === true && (
                                <Menu as="div" className="inline-block pr-2">
                                    <Menu.Button>
                                        <BsThreeDotsVertical className="mb-[-2px] transition cursor-pointer opacity-80 hover:opacity-100 ml-2" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute z-50 full-shadow shadow-md rounded-md mt-2 w-32 right-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => handleOpenEditModal()}
                                                            className={`${
                                                                active ? 'bg-gray-100 ' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => handleDeletePost()}
                                                            className={`${
                                                                active ? 'bg-gray-100 ' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            )}
                        </div>
                        <div className="w-full h-[1px] bg-slate-600/40 mt-2 mb-2"></div>
                        <div className="overflow-y-auto text-justify border-b-2 border-gray-200  pl-2 h-[80%]">
                            {!loading && data?.Data && (
                                <>
                                    {data.Data.map((val: Comment, index) => {
                                        return <CommentItem data={val} toast={showToast} fetchData={fetchData} />;
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
                        <div className="h-auto  w-full pt-2">
                            <div className="flex justify-between text-2xl px-2 h-[35%]">
                                <div className="flex">
                                    {post.isLiked ? (
                                        <AiFillHeart
                                            className="mr-6 text-2xl cursor-pointer text-red-600 transition"
                                            onClick={() => props.onLike()}
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            className="mr-6 text-2xl cursor-pointer hover:text-gray-500 transition"
                                            onClick={() => props.onLike()}
                                        />
                                    )}
                                    <BsChatSquareDots
                                        className="cursor-pointer mr-4"
                                        onClick={() => onFocusComment(post!.id, 'this post ...')}
                                    />
                                    <BsSend className="cursor-pointer mr-4" />
                                </div>
                                {post.isSaved ? (
                                    <BsFillBookmarkFill
                                        className="text-2xl cursor-pointer text-black"
                                        onClick={() => props.onSave()}
                                    />
                                ) : (
                                    <BiBookmark
                                        className="text-2xl cursor-pointer hover:text-gray-500"
                                        onClick={() => props.onSave()}
                                    />
                                )}
                            </div>
                            <div className="px-2  border-b-2 border-gray-200  h-[35%]">
                                {post != undefined && post.isHideLike === 0 && (
                                    <span className="text-sm font-semibold mr-2">{post.likeCount} likes</span>
                                )}
                                <span className="text-base opacity-80 ">{post?.title}</span>
                            </div>
                            <div className="px-2 flex items-center h-[30%] pt-2 ">
                                {post != null && post!.commentStat === 0 && (
                                    <>
                                        <textarea
                                            className="h-[50px] border-none w-full mr-2 outline-none mt-2"
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
                                {post != null && post.commentStat === 1 && (
                                    <p className="h-[70%] border-none w-[100%] mr-2 ">Commenting has been turned off</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
            <EditPostModal />
        </ModalContainer>
    );
}

export default PostCommentModalV2;
