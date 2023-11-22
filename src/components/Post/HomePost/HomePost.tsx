import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatSquareDots, BsSend } from 'react-icons/bs';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import useCommentModal from '../../../hooks/useCommentModal';
import { Response } from '../../../types/api-type';
import { SavePostLike } from '../../../types/post-like-type';
import { postLikeService } from '../../../services/post-like-service';
import { SavePostFavorite } from '../../../types/post-favorite-type';
import { postFavoriteService } from '../../../services/post-favorite-service';
import { PostForViewer } from '../../../types/post-type';
import { backend_utils as backend } from '../../../utils/api-utils';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserInfo } from '../../../types/user-type';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import useOnScreen from '../../../hooks/useOnScreen';

interface HomePostProps {
    data: PostForViewer;
}

const settings: Settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots',
};

function HomePost(props: HomePostProps) {
    const { data } = props;
    const [post, setPost] = useState<PostForViewer>(data);
    const [played, setPlayed] = useState(false);
    const user: UserInfo = useGetUserInfo();
    const { openCommentModal } = useCommentModal();
    const videoRef = useRef<HTMLDivElement>(null);

    const isVisible = useOnScreen(videoRef);

    useEffect(() => {
        setPlayed(isVisible);
    }, [isVisible]);

    const onLikePost = async () => {
        const res: Response<SavePostLike> = await postLikeService(post.id);
        if (res.Status === 200) {
            if (res.Data.action === 'unliked') {
                setPost((prevPost) => ({
                    ...prevPost,
                    isLiked: false,
                    likeCount: prevPost.likeCount - 1,
                }));
            } else {
                setPost((prevPost) => ({
                    ...prevPost,
                    isLiked: true,
                    likeCount: prevPost.likeCount + 1,
                }));
            }
        }
    };

    const onFavirotePost = async () => {
        const res: Response<SavePostFavorite> = await postFavoriteService(user.id, post.id);
        if (res.Status === 200) {
            if (res.Data.action === 'unsaved') {
                setPost((prevPost) => ({
                    ...prevPost,
                    isSaved: false,
                    shareCount: prevPost.shareCount - 1,
                }));
            } else {
                setPost((prevPost) => ({
                    ...prevPost,
                    isSaved: true,
                    shareCount: prevPost.shareCount + 1,
                }));
            }
        }
    };

    return (
        <>
            <div className="w-full mb-8">
                <div className="pl-1 text-base flex items-center">
                    <Link to={'/profile/' + data.user.userName}>
                        <img
                            src={backend.imagePath + data.user.avatarPath}
                            alt="avatar"
                            className="w-10 h-10 circle mr-1"
                        />
                    </Link>

                    <Link to={'/profile/' + data.user.userName}>
                        <span className="px-2 font-semibold tracking-wide cursor-pointer">{data.user.userName}</span>
                    </Link>

                    <span className="">-</span>
                    <span className="px-2">
                        {props.data.time / 24 < 1 ? props.data.time + 'h' : (props.data.time % 24) + 'd'}
                    </span>
                </div>
                <div className="w-[468px] mt-5 bg-slate-600/60 min-h-[468px] ">
                    {data.images.length > 0 && (
                        <Slider {...settings}>
                            {data.images.map((image) =>
                                image.type == 'video/mp4' ? (
                                    <div ref={videoRef} className="object-center h-full w-full">
                                        <ReactPlayer
                                            url={backend.imagePath + image.name}
                                            playsinline={true}
                                            playing={played}
                                            width="100%"
                                            height="100%"
                                            controls
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={backend.imagePath + image.name}
                                        alt={`avatar${image.id}`}
                                        className="mx-auto h-full w-full"
                                    />
                                ),
                            )}
                        </Slider>
                    )}
                </div>

                <div className="flex my-4 items-center justify-between">
                    <div className="flex items-center">
                        {post.isLiked ? (
                            <AiFillHeart
                                className="mr-6 text-2xl cursor-pointer text-red-600 transition"
                                onClick={() => onLikePost()}
                            />
                        ) : (
                            <AiOutlineHeart
                                className="mr-6 text-2xl cursor-pointer hover:text-gray-500 transition"
                                onClick={() => onLikePost()}
                            />
                        )}
                        <BsChatSquareDots
                            className="mr-6 text-2xl cursor-pointer hover:text-gray-500"
                            onClick={() => openCommentModal(data)}
                        />
                        <BsSend className="mr-6 text-2xl cursor-pointer hover:text-gray-500" />
                    </div>
                    <div>
                        {post.isSaved ? (
                            <BsFillBookmarkFill
                                className="text-2xl cursor-pointer text-black"
                                onClick={() => onFavirotePost()}
                            />
                        ) : (
                            <BiBookmark
                                className="text-2xl cursor-pointer hover:text-gray-500"
                                onClick={() => onFavirotePost()}
                            />
                        )}
                    </div>
                </div>
                {post.isHideLike === 0 && <p className="font-semibold text-lg text-left">{post.likeCount} likes</p>}
                <div className="flex items-center mt-1">
                    <span className="font-semibold text-base mr-3">{post.user.userName}</span>
                    <span className="text-xl">{post.title}</span>
                </div>
                <p
                    className="text-gray-500 text-left text-lg mt-2 hover:cursor-pointer hover:text-black"
                    onClick={() => openCommentModal(data)}
                >
                    View all {post.commentCount} comments
                </p>
                <input
                    className="w-full text-gray-500 outline-none text-left text-lg mt-2 "
                    placeholder="Add a comment ..."
                />

                <div className="w-full h-[1px] bg-slate-600/40 mt-3"></div>
            </div>
        </>
    );
}

export default HomePost;
