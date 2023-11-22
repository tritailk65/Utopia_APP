import { useState } from 'react';
import avatar from '../../../assets/image/avt2.png';
// import { FaHeart } from 'react-icons/fa6';
import { IoChatbubble } from 'react-icons/io5';
import { type } from 'os';
import { PostForViewer } from '../../../types/post-type';
import { backend_utils as backend } from '../../../utils/api-utils';
import useCommentModal from '../../../hooks/useCommentModal';

export type ProfilePostItemProps = {
    item: PostForViewer;
};

const ProfilePostItem = (props: ProfilePostItemProps) => {
    const [isHover, setIsHover] = useState(false);
    const { openCommentModal } = useCommentModal();

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div
            className="relative inline-block transition-all"
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
        >
            <img
                src={backend.imagePath + props.item.images[0].name}
                className="top-0 object-cover h-[300px] w-[300px] cursor-pointer"
                alt="img"
            />
            {isHover && (
                <div
                    className="absolute flex top-0 left-0 w-full h-full bg-slate-800/50 items-center justify-center text-lg text-white cursor-pointer"
                    onClick={() => openCommentModal(props.item)}
                >
                    <div className="flex">
                        {/* <FaHeart className="mt-1 mr-1" /> */}
                        <span>{props.item.likeCount}</span>
                    </div>
                    <div className="flex">
                        <IoChatbubble className="mt-1 ml-3 mr-1" />
                        <span>{props.item.commentCount}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePostItem;
