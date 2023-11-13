import { FollowingReponse } from '../../../../types/following-type';
import ConfirmDialog from '../../../Dialog/ConfirmDialog/ConfirmDialog';
import { useState } from 'react';
import { backend_utils as backend } from '../../../../utils/api-utils';
import { PostUnFollow } from '../../../../services/follow-service';
import { UserInfo } from '../../../../types/user-type';
import useGetUserInfo from '../../../../hooks/useGetUserInfo';
import { Link } from 'react-router-dom';

export type FollowItemProps = {
    followingItem: FollowingReponse;
};

const FollowItem = (props: FollowItemProps) => {
    const [dialog, setDialog] = useState<boolean>(false);
    //const [deleteItem, setDeleteItem] = useState<number[]>([]);

    const onConfirm = () => {
        setDialog(false);
    };

    const onClose = () => {
        setDialog(false);
    };

    const handleUnFollow = (id: number) => {
        PostUnFollow(id);
        setDialog(false);
    };

    return (
        <>
            <div className="text-base flex mb-5 mr-4">
                <div className="flex-1 w-1/6 ">
                    <Link to={'/profile/' + props.followingItem.user.userName}>
                        <img
                            src={backend.imagePath + props.followingItem.user.avatarPath}
                            alt="avatar"
                            className="circle w-14 h-14"
                        />
                    </Link>
                </div>
                <div className="flex-4 w-4/6 text-left pl-4">
                    <Link to={'/profile/' + props.followingItem.user.userName}>
                        <h3 className="font-semibold cursor-pointer text-lg">{props.followingItem.user.userName}</h3>
                    </Link>
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
                        className="ml-32 circle w-44 h-44"
                    />

                    <p className="font-medium">
                        If you change your mind, you'll have to request to follow {props.followingItem.user.userName}{' '}
                        again
                    </p>
                </div>
            </ConfirmDialog>
        </>
    );
};

export default FollowItem;
