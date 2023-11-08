import React, { useEffect, useState } from 'react';
import arrow from '../../../../assets/image/Arrow_left.png';
import avt from '../../../../assets/image/avt2.png';
import FollowRequestItem from './FollowRequestItem';
import { UserInfo } from '../../../../types/user-type';
import useGetUserInfo from '../../../../hooks/useGetUserInfo';
import { getRequestFollow } from '../../../../services/request-follow-services';
import { RequestFollowReponse } from '../../../../types/request-follow-type';

export interface FollowRequestPanelProps {
    onClose: (index: number) => void;
}

const FollowRequestPanel = (props: FollowRequestPanelProps) => {
    const { onClose } = props;

    const user: UserInfo = useGetUserInfo();
    const [listUserRequest, setListUserRequest] = useState<RequestFollowReponse[]>();

    useEffect(() => {
        if (user != null) {
            getRequestFollow(user.id).then((res) => {
                if ((res.Status = 200)) {
                    setListUserRequest(res.Data);
                }
            });
        }
    }, []);

    return (
        <div>
            {/* Header section */}
            <div className="flex flex-wrap text-center">
                <button className="flex space-x-2 w-1/4 mt-2">
                    <img src={arrow} alt="icon2" className="w-6 h-6 ml-4" onClick={() => onClose(2)} />
                </button>
                <h1 className="ml-2 text-2xl font-semibold mb-7 max-w-xl">Follow Request</h1>
            </div>
            {/* Item section */}
            <div className="overflow-auto max-h-screen">
                {listUserRequest?.map((user, index) => (
                    <FollowRequestItem item={user} key={index} />
                ))}
            </div>
        </div>
    );
};

export default FollowRequestPanel;
