import Skeleton from 'react-loading-skeleton';

function SuggestAllSkeleton() {
    return (
        <>
            <ul className=" w-full px-2">
                <li className="text-base flex  mb-4 pl-24">
                    <div className="flex-1 w-1/2">
                        <Skeleton className=" w-14 h-14" circle />
                    </div>
                    <div className="flex-4 w-4/6 pr-10 ">
                        <Skeleton className="h-14" />
                    </div>
                    <div className="flex-1 w-1/6  ">
                        <Skeleton className="h-14" />
                    </div>
                </li>
            </ul>
        </>
    );
}

export default SuggestAllSkeleton;
