import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostForViewer } from '../../types/post-type';
import { Response } from '../../types/api-type';
import { UserInfo } from '../../types/user-type';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { getListPostProfile } from '../../services/post-service';
import ProfilePostItem from './ProfilePostItem/ProfilePostItem';
import ProfilePostSkeleton from '../Skeleton/ProfilePostSkeleton';

export type ProfilePostsProps = {
    user: UserInfo;
};

const ProfilePosts = (props: ProfilePostsProps) => {
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<Response<PostForViewer[]>>();

    useEffect(() => {
        try {
            const callApi = async () => {
                const res: Response<PostForViewer[]> = await getListPostProfile(props.user.userName, page);
                setData(res);
            };
            callApi();
        } catch (e) {
            console.log(e);
        }
    }, [props.user]);

    const fetchMoreData = () => {
        try {
            setTimeout(async () => {
                const newPage = page + 1;
                const res: Response<PostForViewer[]> = await getListPostProfile(props.user.userName, newPage);
                if (res.Status === 200) {
                    if (res.Data.length > 0) {
                        setData((prevData) => ({
                            Status: res.Status,
                            Message: res.Message,
                            Exception: res.Exception,
                            Data: [...(prevData?.Data ?? []), ...res.Data],
                        }));
                        setPage(newPage);
                    } else {
                        setHasMore(false);
                    }
                }
            }, 1500);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="profile text-2xl w-auto mx-auto mt-2 bg-white p-4 ">
                <div>
                    <InfiniteScroll
                        dataLength={data?.Data ? data.Data.length : 10}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<ProfilePostSkeleton />}
                    >
                        <div className="grid grid-cols-3 gap-2">
                            {data?.Data != undefined &&
                                data.Data.length > 0 &&
                                data.Data.map((val, index) => {
                                    return <ProfilePostItem item={val} key={index} />;
                                })}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default ProfilePosts;
