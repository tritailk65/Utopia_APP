import { useEffect, useState } from 'react';
import { RequestFollowReponse } from '../../../../types/request-follow-type';
import { backend_utils as backend } from '../../../../utils/api-utils';
import { UserInfo } from '../../../../types/user-type';
import useGetUserInfo from '../../../../hooks/useGetUserInfo';
import { acceptRequestFollow, deleteRequestFollow } from '../../../../services/request-follow-services';
import AlertDialog from '../../../Dialog/AlertDialog/AlertDialog';

export type FollowRequestItemProps = {
    item: RequestFollowReponse;
};

const FollowRequestItem = (props: FollowRequestItemProps) => {
    const user: UserInfo = useGetUserInfo();
    const [isConfirmSuccess, setIsConfirmSuccess] = useState(false);
    const [isConfirmRequest, setIsConfirmRequest] = useState(true);
    const [isCancelSuccess, setIsCancelSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = (id: number) => {
        deleteRequestFollow(user.id, id);
        setIsCancelSuccess(true);
        setIsConfirmRequest(false);
    };

    const handleConfirm = (id: number) => {
        acceptRequestFollow(user.id, id).then((res) => {
            if (res.Status == 200) {
                setMessageAlert('Chấp nhận follow thành công !');
                setShowAlert(true);
            }
        });
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setIsConfirmSuccess(true);
        setIsConfirmRequest(false);
    };

    return (
        <>
            <div className="text-base flex  w-[100%] mt-4">
                <div className="flex-1 w-[6%] ml-2">
                    <img
                        src={backend.imagePath + props.item.userSrc.avatarPath}
                        alt="avatar"
                        className="circle w-14 h-14"
                    />
                </div>
                {isConfirmRequest && (
                    <>
                        <div className="flex-4 w-[38%] text-left">
                            <h3 className="font-semibold text-[18px]">{props.item.userSrc.userName}</h3>
                            <p className="text-gray-500 text-sm">24.8M Followers</p>
                        </div>
                        <div className="flex-1 w-[47%] flex flex-row items-center cursor-pointer font-semibold ">
                            <button
                                onClick={() => handleConfirm(props.item.userSrc.id)}
                                className=" bg-[#001F3E] transition border-2 border-transparent rounded-xl text-sm text-[#ffffff] hover:bg-[#ffffff] hover:border-[#001F3E] hover:text-[#001F3E] px-4 py-1.5 mr-3"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => handleDelete(props.item.userSrc.id)}
                                className=" bg-[#8E8E8E]/30 transition border-2 border-transparent cursor-pointer rounded-xl text-sm text-black hover:bg-[#464646]/30 px-4 py-1.5 mr-3"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
                {isConfirmSuccess && (
                    <>
                        <div className="flex-4 w-[55%] text-left">
                            <h3 className="font-semibold text-[18px]">{props.item.userSrc.userName}</h3>
                            <p className="text-gray-500 text-sm">24.8M Followers</p>
                        </div>
                        <div className="flex-1 w-[47%] flex flex-row items-center cursor-pointer font-semibold ">
                            <button
                                onClick={() => handleConfirm(props.item.userSrc.id)}
                                className=" bg-[#8E8E8E]/30 transition border-2 border-transparent cursor-pointer rounded-xl text-sm text-black hover:bg-[#464646]/30 px-4 py-1.5 mr-5"
                            >
                                Following
                            </button>
                        </div>
                    </>
                )}
                {isCancelSuccess && (
                    <>
                        <div className="flex-4 w-[59%] text-left">
                            <h3 className="font-semibold text-[18px]">{props.item.userSrc.userName}</h3>
                            <p className="text-gray-500 text-sm">24.8M Followers</p>
                        </div>
                        <div className="flex-1 w-[47%] flex flex-row items-center cursor-pointer font-semibold "></div>
                    </>
                )}
            </div>
            <AlertDialog
                title="Thông báo"
                message={messageAlert}
                show={showAlert}
                result={true}
                onClose={() => handleCloseAlert()}
            />
        </>
    );
};

export default FollowRequestItem;
