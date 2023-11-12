import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatSquareDots, BsSend } from 'react-icons/bs';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useState } from 'react';
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
    const user = useGetUserInfo();
    const { openCommentModal } = useCommentModal();

    const onLikePost = async () => {
        const res: Response<SavePostLike> = await postLikeService(user.id, post.id);
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
            <div className="w-full mb-12">
                <div className="pl-3 text-lg flex items-center">
                    <img
                        src={backend.imagePath + post.user.avatarPath}
                        alt="avatar"
                        className="w-14 h-14 circle mr-1"
                    />
                    <span className="px-2 font-semibold tracking-wide cursor-pointer">{post.user.userName}</span>
                    <span className="">-</span>
                    <span className="px-2">{'2d'}</span>
                </div>
                <div className="w-[468px] mt-5 bg-slate-900 min-h-[468px]">
                    {data.images.length > 0 && (
                        <Slider {...settings}>
                            {data.images.map((image) => (
                                <img
                                    src={backend.imagePath + image.name}
                                    alt={`avatar${image.id}`}
                                    className="mx-auto h-full w-full"
                                />
                            ))}
                        </Slider>
                    )}
                </div>

                <div className="flex my-4 items-center justify-between">
                    <div className="flex items-center">
                        {post.isLiked ? (
                            <AiFillHeart
                                className="mr-6 text-3xl cursor-pointer text-red-600 transition"
                                onClick={() => onLikePost()}
                            />
                        ) : (
                            <AiOutlineHeart
                                className="mr-6 text-3xl cursor-pointer hover:text-gray-500 transition"
                                onClick={() => onLikePost()}
                            />
                        )}
                        <BsChatSquareDots
                            className="mr-6 text-3xl cursor-pointer hover:text-gray-500"
                            onClick={() => openCommentModal(data)}
                        />
                        <BsSend className="mr-6 text-3xl cursor-pointer hover:text-gray-500" />
                    </div>
                    <div>
                        {post.isSaved ? (
                            <BsFillBookmarkFill
                                className="text-3xl cursor-pointer text-black"
                                onClick={() => onFavirotePost()}
                            />
                        ) : (
                            <BiBookmark
                                className="text-3xl cursor-pointer hover:text-gray-500"
                                onClick={() => onFavirotePost()}
                            />
                        )}
                    </div>
                </div>
                {post.isHideLike === 0 && <p className="font-semibold text-lg text-left">{post.likeCount} likes</p>}
                <div className="flex items-center mt-1">
                    <span className="font-semibold text-lg mr-3">{post.user.userName}</span>
                    <span className="text-xl">{post.title}</span>
                </div>
                <p
                    className="text-gray-500 text-left text-xl mt-2 hover:cursor-pointer hover:text-black"
                    onClick={() => openCommentModal(data)}
                >
                    View all {post.commentCount} comments
                </p>
                <p className="text-gray-500 text-left text-xl mt-2 hover:cursor-pointer hover:text-black">
                    Add a comment ...
                </p>
            </div>
        </>
    );
}

export default HomePost;
