import React from 'react';
import { ReplyComment } from '../../../../types/comment-type';
import { backend_utils as backend } from '../../../../utils/api-utils';

interface ReplyItemProps {
    data: ReplyComment;
}

function ReplyItem(props: ReplyItemProps) {
    const { data } = props;
    return (
        <div className="flex mb-6">
            <div className="w-[12%]">
                <img src={backend.imagePath + data.user.avatarPath} alt="avt" className="circle w-9 h-9" />
            </div>
            <div className="text-sm w-[88%] pr-2">
                <div>
                    <span className="font-semibold mr-3">{data.user.userName}</span>
                    <span>{data.comment}</span>
                </div>
                <div className="">
                    <span className="text-xs mr-2 cursor-pointer font-semibold opacity-70">27.802</span>
                    <span className="text-xs mr-4 cursor-pointer font-semibold opacity-70 transition hover:opacity-100">
                        Likes
                    </span>
                    <span className="text-xs  cursor-pointer font-semibold opacity-70 transition hover:opacity-100">
                        Reply
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ReplyItem;
