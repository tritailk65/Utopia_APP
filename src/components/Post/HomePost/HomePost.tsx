import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatSquareDots, BsSend } from 'react-icons/bs';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import PostCommentModal from '../../Modal/PostCommentModal/PostCommentModal';

interface HomePostProps {
    avatar: string;
    username: string;
    since: string;
    img: string;
    likes: string;
    title: string;
    comments: string;
}

function HomePost(props: HomePostProps) {
    const { avatar, username, since, img, likes, title, comments } = props;
    const [modal, setModal] = useState<boolean>(false);
    const [like, setLike] = useState<boolean>(false);
    const [save, setSave] = useState<boolean>(false);
    const likeDebounce = useDebounce(like, 1000);
    const saveDebounce = useDebounce(like, 1000);

    useEffect(() => {
        // console.log(likeDebounce);
    }, [likeDebounce]);

    useEffect(() => {
        //console.log(saveDebounce);
    }, [saveDebounce]);

    return (
        <>
            <div className="w-full mb-12">
                <div className="pl-3 text-lg flex items-center">
                    <img src={avatar} alt="avatar" className="w-14 h-14 circle mr-1" />
                    <span className="px-2 font-semibold tracking-wide cursor-pointer">{username}</span>
                    <span className="">-</span>
                    <span className="px-2">{since}</span>
                </div>
                <div className="w-[468px] mt-5 bg-black">
                    <img src={img} alt="avatar2" className="mx-auto h-full w-full" />
                </div>
                <div className="flex my-4 items-center justify-between">
                    <div className="flex items-center">
                        {like ? (
                            <AiFillHeart
                                className="mr-6 text-3xl cursor-pointer text-red-600 transition"
                                onClick={() => setLike(false)}
                            />
                        ) : (
                            <AiOutlineHeart
                                className="mr-6 text-3xl cursor-pointer hover:text-gray-500 transition"
                                onClick={() => setLike(true)}
                            />
                        )}
                        <BsChatSquareDots
                            className="mr-6 text-3xl cursor-pointer hover:text-gray-500"
                            onClick={() => setModal(true)}
                        />
                        <BsSend
                            className="mr-6 text-3xl cursor-pointer hover:text-gray-500"
                            onClick={() => setSave(true)}
                        />
                    </div>
                    <div>
                        {save ? (
                            <BsFillBookmarkFill
                                className="text-3xl cursor-pointer text-black"
                                onClick={() => setSave(false)}
                            />
                        ) : (
                            <BiBookmark
                                className="text-3xl cursor-pointer hover:text-gray-500"
                                onClick={() => setSave(true)}
                            />
                        )}
                    </div>
                </div>
                <p className="font-semibold text-lg text-left">{likes} likes</p>
                <div className="flex items-center mt-1">
                    <span className="font-semibold text-lg mr-3">{username}</span>
                    <span className="text-xl">{title}</span>
                </div>
                <p className="text-gray-500 text-left text-xl mt-2 hover:cursor-pointer hover:text-black">
                    View all {comments} comments
                </p>
                <p className="text-gray-500 text-left text-xl mt-2 hover:cursor-pointer hover:text-black">
                    Add a comment ...
                </p>
            </div>
            <PostCommentModal idPost={1} show={modal} onClose={() => setModal(false)} />
        </>
    );
}

export default HomePost;
