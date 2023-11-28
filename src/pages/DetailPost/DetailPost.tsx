import React, { useEffect } from 'react';
import HomePost from '../../components/Post/HomePost/HomePost';
import useDetailPost from '../../hooks/useDetailPost';
import { useParams } from 'react-router-dom';
import PostSkeleton from '../../components/Skeleton/PostSkeleton';

function DetailPost() {
    const { id } = useParams();
    const { postState, fetchData } = useDetailPost();

    console.log(postState);

    useEffect(() => {
        const callData = () => {
            if (id != undefined) {
                fetchData(parseInt(id!, 10));
            }
        };

        callData();
    }, [id]);

    return (
        <div className="abc text-2xl  w-[630px] mt-8">
            <div className="w-[468px] mx-auto">
                {postState.isLoading && <PostSkeleton />}
                {postState.isSuccess && postState.data != null && <HomePost data={postState.data!} />}
                {postState.isSuccess === false && <h1>Post Not found</h1>}
            </div>
        </div>
    );
}

export default DetailPost;
