import Skeleton from 'react-loading-skeleton';

const ProfilePostSkeleton = () => {
    return (
        <div className="w-auto mt-1">
            <div className="grid grid-cols-3 gap-2">
                <Skeleton className="top-0 object-cover h-[300px] w-full" />
                <Skeleton className="top-0 object-cover h-[300px] w-full" />
                <Skeleton className="top-0 object-cover h-[300px] w-full" />
            </div>
        </div>
    );
};

export default ProfilePostSkeleton;
