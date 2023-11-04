import avt from '../../../../assets/image/avt2.png';

interface CommentItemProps {
    commentId: number;
    username: string;
    comment: string;
    likes: number;
    replies: number;
    img: string;
}

function CommentItem() {
    return (
        <div className="flex mb-6">
            <div className="w-[12%]">
                <img src={avt} alt="avt" className="circle w-11 h-11" />
            </div>
            <div className="text-sm w-[88%] pr-2">
                <div>
                    <span className="font-semibold mr-3">sooyaaa__</span>
                    <span>
                        Jisoo unnie we sooyaas are very excited for your new movieeee Jisoo unnie we sooyaas are very
                        excited for your new movieeee
                    </span>
                </div>
                <div className="mt-2">
                    <span className="text-xs mr-2 cursor-pointer font-semibold opacity-70">27.802</span>
                    <span className="text-xs mr-4 cursor-pointer font-semibold opacity-70 transition hover:opacity-100">
                        Likes
                    </span>
                    <span className="text-xs  cursor-pointer font-semibold opacity-70 transition hover:opacity-100">
                        Reply
                    </span>
                </div>
                <div className="flex items-center mt-2">
                    <div className="w-10 border-t border-black h-[50%] opacity-70 mr-3"></div>
                    <span className="transition opacity-70 hover:opacity-100 cursor-pointer text-sm">
                        View replies (4)
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
