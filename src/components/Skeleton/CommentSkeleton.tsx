import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CommentSkeleton() {
    return (
        <div className="flex mb-6">
            <div className="w-[12%] mr-2">
                <Skeleton className="w-11 h-11" circle />
            </div>
            <div className="text-sm w-[88%] pr-2">
                <Skeleton className="font-semibold mr-3 mb-1" width={'140px'} />
                <Skeleton width={'100%'} height={'50px'} />
            </div>
        </div>
    );
}

export default CommentSkeleton;
