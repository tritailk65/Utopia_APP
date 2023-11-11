import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PostSkeleton() {
    return (
        <div className="w-full mb-12">
            <div className="flex items-center">
                <div className="pl-3 text-lg w-14 h-11">
                    <Skeleton className="h-full " circle />
                </div>
                <div className="w-36 mt-3 ml-2">
                    <Skeleton className="" />
                </div>
            </div>

            <div className="w-[468px] mt-3 ">
                <Skeleton className="mx-auto h-[500px] w-full" />
            </div>
        </div>
    );
}

export default PostSkeleton;
