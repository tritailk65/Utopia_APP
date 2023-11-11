import { useState } from 'react';
import { Comment } from '../../../../types/comment-type';
import { backend_utils as backend } from '../../../../utils/api-utils';
import ReplyItem from './ReplyItem';
import usePostingComment from '../../../../hooks/usePostingComment';
interface CommentItemProps {
    data: Comment;
}

function CommentItem(props: CommentItemProps) {
    const { data } = props;
    const [show, setShow] = useState<boolean>(false);
    const { onFocusReply } = usePostingComment();

    return (
        <div className="flex mb-6">
            <div className="w-[12%]">
                <img src={backend.imagePath + data.user.avatarPath} alt="avt" className="circle w-11 h-11" />
            </div>
            <div className="text-sm w-[88%] pr-2">
                <div>
                    <span className="font-semibold mr-3">{data.user.userName}</span>
                    <span>{data.comment}</span>
                </div>
                <div className="mt-1">
                    <span className="text-xs mr-2 cursor-pointer font-semibold opacity-70">27.802</span>
                    <span className="text-xs mr-4 cursor-pointer font-semibold opacity-70 transition hover:opacity-100">
                        Likes
                    </span>
                    <span
                        className="text-xs  cursor-pointer font-semibold opacity-70 transition hover:opacity-100"
                        onClick={() => onFocusReply(data.postId, data.id, data.user.userName)}
                    >
                        Reply
                    </span>
                </div>
                {data.totals > 0 && (
                    <>
                        <div className="flex items-center mt-2">
                            <div className="w-10 border-t border-black h-[50%] opacity-70 mr-3"></div>
                            {show ? (
                                <span
                                    className="transition opacity-70 hover:opacity-100 cursor-pointer text-sm"
                                    onClick={() => setShow(false)}
                                >
                                    Hide
                                </span>
                            ) : (
                                <span
                                    className="transition opacity-70 hover:opacity-100 cursor-pointer text-sm"
                                    onClick={() => setShow(true)}
                                >
                                    View replies ({data.totals})
                                </span>
                            )}
                        </div>
                        {show && (
                            <div className="mt-4">
                                {data.replies &&
                                    data.replies.map((val, index) => {
                                        return <ReplyItem data={val} />;
                                    })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
