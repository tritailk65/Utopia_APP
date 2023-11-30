import { useState } from 'react';
import avatar from '../../../assets/image/avt2.png';
import { FaHeart } from 'react-icons/fa';
import { IoChatbubble } from 'react-icons/io5';
import { type } from 'os';
import { PostForViewer } from '../../../types/post-type';
import { backend_utils as backend } from '../../../utils/api-utils';
import useCommentModal from '../../../hooks/useCommentModal';
import PostCommentModalV2 from '../../Modal/PostCommentModal/PostCommentModalV2';
import { Response } from '../../../types/api-type';
import { SavePostLike } from '../../../types/post-like-type';
import { postLikeService } from '../../../services/post-like-service';
import { SavePostFavorite } from '../../../types/post-favorite-type';
import { postFavoriteService } from '../../../services/post-favorite-service';
import useGetUserInfo from '../../../hooks/useGetUserInfo';

export type ProfilePostItemProps = {
    item: PostForViewer;
};

const ProfilePostItem = (props: ProfilePostItemProps) => {
    const [data, setData] = useState(props.item);
    const [show, setShow] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const { openCommentModal } = useCommentModal();
    const user = useGetUserInfo();

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const onLikePost = async () => {
        const res: Response<SavePostLike> = await postLikeService(data.id);
        if (res.Status === 200) {
            if (res.Data.action === 'unliked') {
                setData((prevPost) => ({
                    ...prevPost,
                    isLiked: false,
                    likeCount: prevPost.likeCount - 1,
                }));
            } else {
                setData((prevPost) => ({
                    ...prevPost,
                    isLiked: true,
                    likeCount: prevPost.likeCount + 1,
                }));
            }
        }
    };

    const onFavirotePost = async () => {
        const res: Response<SavePostFavorite> = await postFavoriteService(user.id, data.id);
        if (res.Status === 200) {
            if (res.Data.action === 'unsaved') {
                setData((prevPost) => ({
                    ...prevPost,
                    isSaved: false,
                    shareCount: prevPost.shareCount - 1,
                }));
            } else {
                setData((prevPost) => ({
                    ...prevPost,
                    isSaved: true,
                    shareCount: prevPost.shareCount + 1,
                }));
            }
        }
    };

    const smallestIdImage = props.item.images.reduce((minImage, currentImage) => {
        return currentImage.id < minImage.id ? currentImage : minImage;
    }, props.item.images[0]);

    return (
        <>
            <div
                className="relative inline-block transition-all"
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                <img
                    src={backend.imagePath + smallestIdImage.name}
                    className="top-0 object-cover h-[300px] w-[300px] cursor-pointer"
                    alt="img"
                />
                {isHover && (
                    <div
                        className="absolute flex top-0 left-0 w-full h-full bg-slate-800/50 items-center justify-center text-lg text-white cursor-pointer"
                        onClick={() => setShow(true)}
                    >
                        <div className="flex">
                            <FaHeart className="mt-1 mr-1" />
                            <span>{data.likeCount}</span>
                        </div>
                        <div className="flex">
                            <IoChatbubble className="mt-1 ml-3 mr-1" />
                            <span>{data.commentCount}</span>
                        </div>
                    </div>
                )}
            </div>
            <PostCommentModalV2
                show={show}
                post={data}
                onCloseModal={() => setShow(false)}
                onLike={onLikePost}
                onSave={onFavirotePost}
            />
        </>
    );
};

export default ProfilePostItem;
