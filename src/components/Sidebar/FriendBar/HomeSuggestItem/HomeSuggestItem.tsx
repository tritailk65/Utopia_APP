import { useState } from 'react';
import { UserInfo } from '../../../../types/user-type';
import { backend_utils } from '../../../../utils/api-utils';
import AlertDialog from '../../../Dialog/AlertDialog/AlertDialog';
import { cancelRequestFollow, sendRequestFollow } from '../../../../services/request-follow-services';
import { Link } from 'react-router-dom';

export type HomeSuggestItemProps = {
    user: UserInfo;
};

const HomeSuggestItem = (props: HomeSuggestItemProps) => {
    const [messageFollow, setMessageAlert] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isSendSuccess, setIsSendSuccess] = useState<boolean>();

    const handleSendFollowRequest = (req: UserInfo) => {
        try {
            sendRequestFollow(req.id).then((res) => {
                if (res != undefined) {
                    setMessageAlert('Gửi lời mời follow đến ' + req.userName + ' thành công !');
                    setShowAlert(true);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelFollowRequest = (cancel: UserInfo) => {
        try {
            cancelRequestFollow(cancel.id).then((res) => {
                if (res != undefined) {
                    setIsSendSuccess(false);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setIsSendSuccess(true);
    };

    return (
        <>
            <li className="text-base flex  mb-4 ">
                <div className="flex-1 w-1/6 ">
                    <Link to={'profile/' + props.user.userName}>
                        <img
                            src={backend_utils.imagePath + props.user.avatarPath}
                            alt="avatar"
                            className="circle w-12 h-12 cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex-4 w-4/6 text-left pl-4 ">
                    <Link to={'profile/' + props.user.userName}>
                        <h3 className="font-semibold cursor-pointer">{props.user.userName}</h3>
                    </Link>
                    <p>Suggested for you</p>
                </div>
                {!isSendSuccess && (
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm" onClick={() => handleSendFollowRequest(props.user)}>
                            Follow
                        </span>
                    </div>
                )}
                {isSendSuccess && (
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-black-600 font-semibold opacity-70 hover:opacity-40">
                        <span className="text-sm" onClick={() => handleCancelFollowRequest(props.user)}>
                            Following
                        </span>
                    </div>
                )}
            </li>
            <AlertDialog
                title="Thông báo"
                message={messageFollow}
                show={showAlert}
                result={true}
                onClose={() => handleCloseAlert()}
            />
        </>
    );
};

export default HomeSuggestItem;
