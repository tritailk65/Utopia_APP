import { FollowingReponse } from '../../../../types/following-type';
import ConfirmDialog from '../../../Dialog/ConfirmDialog/ConfirmDialog';
import { useState } from 'react';
import { backend_utils as backend } from '../../../../utils/api-utils';
import { PostUnFollow } from '../../../../services/follow-service';
import { UserInfo } from '../../../../types/user-type';
import useGetUserInfo from '../../../../hooks/useGetUserInfo';

export type FollowItemProps = {
    followingItem: FollowingReponse;
};

const FollowItem = (props: FollowItemProps) => {
    const [dialog, setDialog] = useState<boolean>(false);
    const user: UserInfo = useGetUserInfo();
    //const [deleteItem, setDeleteItem] = useState<number[]>([]);

    const onConfirm = () => {
        setDialog(false);
    };

    const onClose = () => {
        setDialog(false);
    };

    const handleUnFollow = (id: number) => {
        PostUnFollow(user.id, id);
        setDialog(false);
    };

    return (
        <>
            <div className="text-base flex mb-5 mr-4">
                <div className="flex-1 w-1/6 ">
                    <img
                        src={backend.imagePath + props.followingItem.user.avatarPath}
                        alt="avatar"
                        className="circle w-14 h-14"
                    />
                </div>
                <div className="flex-4 w-4/6 text-left pl-4">
                    <h3 className="font-semibold cursor-pointer text-lg">{props.followingItem.user.userName}</h3>
                    <p className="text-gray-500">24.8M Followers</p>
                </div>
                <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                    <button
                        onClick={() => setDialog(true)}
                        className=" bg-gray-300 px-5 border-2 border-transparent rounded-2xl text-sm text-gray-600 hover:opacity-90 hover:text-black py-2"
                    >
                        Following
                    </button>
                </div>
            </div>
            <ConfirmDialog
                show={dialog}
                confirmText="Unfollower"
                cancelText="Cancel"
                title=""
                onCancel={onClose}
                onClose={onClose}
                onConfirm={() => handleUnFollow(props.followingItem.user.id)}
            >
                <div className="flex flex-col justify-center">
                    <img
                        src={backend.imagePath + props.followingItem.user.avatarPath}
                        alt="avatar"
                        className="circle w-44 h-44"
                    />

                    <p>
                        If you change your mind, you'll have to request to follow {props.followingItem.user.userName}{' '}
                        again
                    </p>
                </div>
            </ConfirmDialog>
        </>
    );
};

export default FollowItem;
