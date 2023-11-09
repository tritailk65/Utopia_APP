import './Home.css';
import avatar from '../../assets/image/avatar.png';
import avt2 from '../../assets/image/avt2.png';
import HomePost from '../../components/Post/HomePost/HomePost';
import { useState, useEffect } from 'react';
import { PostForViewer } from '../../types/post-type';
import { Response } from '../../types/api-type';
import { getListPostForViewer } from '../../services/post-service';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGetUserInfo from '../../hooks/useGetUserInfo';
function Home() {
    const [data, setData] = useState<Response<PostForViewer[]>>();
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const user = useGetUserInfo();

    useEffect(() => {
        const callApi = async () => {
            const res: Response<PostForViewer[]> = await getListPostForViewer(user.id, page);
            setData(res);
        };

        callApi();
    }, []);

    const fetchMoreData = () => {
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
    };

    return (
        <>
            <div className="abc text-2xl  w-[630px] mt-8">
                <div className="w-[468px] mx-auto">
                    <InfiniteScroll
                        dataLength={data?.Data ? data.Data.length : 10}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {data?.Data != undefined &&
                            data.Data.length > 0 &&
                            data.Data.map((val, index) => {
                                return <HomePost data={val} key={index} />;
                            })}
                    </InfiniteScroll>

                    {/* <HomePost
                        avatar={avt2}
                        username={'sooyaaa__'}
                        since="1d"
                        img={avt2}
                        likes="17.092"
                        title="Beautiful day"
                        comments="1208"
                    /> */}
                </div>
            </div>
        </>
    );
}

export default Home;
