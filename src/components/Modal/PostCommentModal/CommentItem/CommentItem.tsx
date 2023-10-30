import avt from '../../../../assets/image/avt2.png';

function CommentItem() {
    return (
        <div className="flex mb-6">
            <div className="w-[12%]">
                <img src={avt} alt="avt" className="circle w-11 h-11" />
            </div>
            <div className="text-sm w-[88%] pr-2">
                <span className="font-semibold mr-3">sooyaaa__</span>
                <span>
                    Jisoo unnie we sooyaas are very excited for your new movieeee Jisoo unnie we sooyaas are very
                    excited for your new movieeee Jisoo unnie we sooyaas are very excited for your new movieeee Jisoo
                    unnie we sooyaas are very excited for your new movieeee Jisoo unnie we sooyaas are very excited for
                    your new movieeee
                </span>
            </div>
        </div>
    );
}

export default CommentItem;
