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

interface PostCommentModalProps {
    idPost: number;
    show: boolean;
    onClose: () => void;
}

function PostCommentModal(props: PostCommentModalProps) {
    const { idPost, show, onClose } = props;
    const [screenHeight, setScreenHeight] = useState(window.screen.height);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Response<Comment[]>>();
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        if (show === true) {
            setLoading(true);
            const fetchData = async () => {
                const res: Response<Comment[]> = await getListCommentByPostId(idPost);
                if (res.Status === 200) {
                    setData(res);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            };
            fetchData();
        }
    }, [show]);

    useEffect(() => {
        const updateScreenHeight = () => {
            setScreenHeight(window.screen.height * 0.8);
        };
        window.addEventListener('resize', updateScreenHeight);
        return () => {
            window.removeEventListener('resize', updateScreenHeight);
        };
    }, []);
    console.log(loading);

    return (
        <ModalContainer show={show} onClose={onClose} width="extra-larges">
            <div className={`min-h-[${screenHeight}px] flex flex-col w-full my-[-8px]`}>
                <div className="xl:h-[60vh]  h-[90vh] flex ">
                    <div className=" h-full flex flex-col items-center justify-center border-r-2 border-gray-200 ">
                        <img src={avt} alt="selected img" className="h-full" />
                    </div>
                    <div className="w-[460px] h-full  pt-4 flex flex-col">
                        <div className="overflow-y-auto text-justify border-b-2 border-gray-200  pl-2 h-[88%]">
                            {!loading && (
                                <>
                                    <CommentItem />
                                    <CommentItem />
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
                                    <BsChatSquareDots className="cursor-pointer mr-4" />
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
                                    placeholder="Add a comment..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                {input.length > 0 && (
                                    <span className="text-base text-blue-500 w-[10%] cursor-pointer font-semibold transition hover:text-blue-700">
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
