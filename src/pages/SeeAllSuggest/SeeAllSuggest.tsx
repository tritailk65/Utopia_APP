import SuggestAllSkeleton from '../../components/Skeleton/SuggestAllSkeleton';
import { useEffect, useState } from 'react';
import { UserInfo } from '../../types/user-type';
import { Response } from '../../types/api-type';
import { getListSuggested } from '../../services/user-service';
import SuggestFollowItem from '../../components/Modal/SuggestFollowModal/SuggestFollowItem';

function SeeAllSuggest() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Response<UserInfo[]>>();

    useEffect(() => {
        setIsLoading(true);
        getListSuggested().then((res) => {
            if (res != undefined) {
                setData(res);
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <div className="abc text-2xl  w-[650px] mt-16 pl-5">
            <div>
                <h3 className="font-medium pb-10 ">Suggested</h3>
            </div>
            {!isLoading && data?.Data && (
                <>
                    {data.Data.map((_, index) => {
                        return <SuggestFollowItem key={index} user={_} />;
                    })}
                </>
            )}
            {isLoading && (
                <>
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                    <SuggestAllSkeleton />
                </>
            )}
        </div>
    );
}

export default SeeAllSuggest;
