import { useEffect, useState } from 'react';
import { PostForViewer } from '../../types/post-type';
import { Response } from '../../types/api-type';
import { UserInfo } from '../../types/user-type';
import ProfilePostItem from './ProfilePostItem/ProfilePostItem';
import { getListPostFavoriteByUser } from '../../services/post-favorite-service';

export type ProfilePostFavoriteProps = {
    user: UserInfo;
};

const ProfilePostFavorite = (props: ProfilePostFavoriteProps) => {
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<Response<PostForViewer[]>>();

    useEffect(() => {
        try {
            const callApi = async () => {
                const res: Response<PostForViewer[]> = await getListPostFavoriteByUser(props.user.id);
                setData(res);
            };
            callApi();
        } catch (e) {
            console.log(e);
        }
    }, [props.user]);

    return (
        <>
            <div className="profile text-2xl w-auto mx-auto mt-2 bg-white p-4 ">
                <div>
                    <div className="grid grid-cols-3 gap-2">
                        {data?.Data != undefined &&
                            data.Data.length > 0 &&
                            data.Data.map((val, index) => {
                                return <ProfilePostItem item={val} key={index} />;
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePostFavorite;
