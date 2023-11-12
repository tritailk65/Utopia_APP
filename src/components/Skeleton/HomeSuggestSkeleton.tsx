import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HomeSuggestSkeleton() {
    return (
        <>
            <li className="text-base flex  mb-4 ">
                <div className="flex-1 w-1/6 ">
                    <Skeleton className="circle w-12 h-12" circle />
                </div>

                <div className="flex-4 w-5/6 text-left pl-4">
                    <Skeleton className="w-full h-12" />
                </div>
            </li>
        </>
    );
}

export default HomeSuggestSkeleton;
