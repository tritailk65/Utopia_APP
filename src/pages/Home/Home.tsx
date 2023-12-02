import './Home.css';
import HomePost from '../../components/Post/HomePost/HomePost';
import { useState, useEffect } from 'react';
import { PostForViewer } from '../../types/post-type';
import { Response } from '../../types/api-type';
import { getListPostForViewer } from '../../services/post-service';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import PostSkeleton from '../../components/Skeleton/PostSkeleton';
import useToken from '../../hooks/useToken';

function Home() {
    const [data, setData] = useState<Response<PostForViewer[]>>();
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const user = useGetUserInfo();
    const token = useToken();

    useEffect(() => {
        try {
            const callApi = async () => {
                const res: Response<PostForViewer[]> = await getListPostForViewer(user.id, page);
                setData(res);
            };

            callApi();
        } catch (e) {
            console.log(e);
        }
    }, []);

    const fetchMoreData = () => {
        try {
            setTimeout(async () => {
                const newPage = page + 1;
                const res: Response<PostForViewer[]> = await getListPostForViewer(user.id, newPage);
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
            <div className="abc text-2xl  w-[630px] mt-8">
                <div className="w-[468px] mx-auto">
                    <InfiniteScroll
                        dataLength={data?.Data ? data.Data.length : 10}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<PostSkeleton />}
                    >
                        {data?.Data != undefined &&
                            data.Data.length > 0 &&
                            data.Data.map((val, index) => {
                                return <HomePost data={val} key={index} />;
                            })}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}

export default Home;
