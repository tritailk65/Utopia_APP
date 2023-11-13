import { Link } from 'react-router-dom';
import { UserInfo } from '../../../types/user-type';
import { backend_utils } from '../../../utils/api-utils';
import { useState } from 'react';
import AlertDialog from '../../Dialog/AlertDialog/AlertDialog';
import { cancelRequestFollow, sendRequestFollow } from '../../../services/request-follow-services';

export interface SuggesFollowItemProps {
    user: UserInfo;
}

const SuggestFollowItem = (props: SuggesFollowItemProps) => {
    const [isSendFollow, setIsSendFollow] = useState<boolean>(false);
    const [messageFollow, setMessageFollow] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleSendFollow = (req: UserInfo) => {
        try {
            sendRequestFollow(req.id).then((res) => {
                if (res.Status == 200) {
                    setMessageFollow('Gửi lời mời follow thành công');
                    setShowAlert(true);
                }
            });
            setMessageFollow('Gửi lời mời follow thành công');
            setShowAlert(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setIsSendFollow(true);
    };

    const handleCancelSendFollow = (user: UserInfo) => {
        try {
            cancelRequestFollow(user.id).then((res) => {
                if (res.Status == 200) {
                    setIsSendFollow(false);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ul className=" w-full px-2">
                <li className="text-base flex  mb-4 pl-24">
                    <div className="flex-1 w-1/2">
                        <Link to={'/profile/' + props.user.avatarPath}>
                            <img
                                src={backend_utils.imagePath + props.user.avatarPath}
                                alt="avatar"
                                className="circle w-14 h-14"
                            />
                        </Link>
                    </div>
                    <div className="flex-4 w-4/6 text-left ">
                        <Link to={'/profile/' + props.user.userName}>
                            <h3 className="font-semibold cursor-pointer">{props.user.userName}</h3>
                        </Link>
                        <p>{props.user.fullName}</p>
                    </div>
                    {!isSendFollow && (
                        <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                            <button
                                onClick={() => handleSendFollow(props.user)}
                                className=" bg-[#001F3E] px-5 border-2 border-[#001F3E] rounded-lg text-sm text-white hover:bg-white hover:text-black py-2"
                            >
                                Follow
                            </button>
                        </div>
                    )}
                    {isSendFollow && (
                        <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                            <button
                                onClick={() => handleCancelSendFollow(props.user)}
                                className="  bg-[#8E8E8E]/30 transition border-2 border-transparent cursor-pointer rounded-xl text-sm text-black hover:bg-[#464646]/30 px-4 py-1.5"
                            >
                                Following
                            </button>
                        </div>
                    )}
                </li>
            </ul>
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

export default SuggestFollowItem;
