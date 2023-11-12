import ping from '../../../../assets/image/ping.png';
import arrow from '../../../../assets/image/Arrow_right.png';
import { useState, useEffect } from 'react';
import { NotificationItemType } from '../../../../types/notification-type';
import { Response } from '../../../../types/api-type';
import {
    getListNotiEarlier,
    getListNotiThisMonth,
    getListNotiThisWeek,
} from '../../../../services/notification-service';
import NotificationItem from './NotificationItem';
import { UserInfo } from '../../../../types/user-type';
import useGetUserInfo from '../../../../hooks/useGetUserInfo';
import { getRequestFollow } from '../../../../services/request-follow-services';
import { RequestFollowReponse } from '../../../../types/request-follow-type';
import { backend_utils as backend } from '../../../../utils/api-utils';

export interface NotificationPanelProps {
    onClose: (index: number) => void;
}

function NotificationPanel(props: NotificationPanelProps) {
    const { onClose } = props;
    const user: UserInfo = useGetUserInfo();
    const [listUserRequest, setListUserRequest] = useState<RequestFollowReponse[]>();
    const [notiThisWeek, setNotiThisWeek] = useState<Response<NotificationItemType[]> | null>();
    const [notiThisMonth, setNotiThisMonth] = useState<Response<NotificationItemType[]> | null>();
    const [notiEarlier, setnotiEarlier] = useState<Response<NotificationItemType[]> | null>();

    useEffect(() => {
        if (user) {
            const callAPI = async () => {
                const resThisWeek: Response<NotificationItemType[]> = await getListNotiThisWeek(user.id);
                const resThisMonth: Response<NotificationItemType[]> = await getListNotiThisMonth(user.id);
                const resEalier: Response<NotificationItemType[]> = await getListNotiEarlier(user.id);

                if (resThisWeek.Data.length != 0) {
                    setNotiThisWeek(resThisWeek);
                }
                if (resThisMonth.Data.length != 0) {
                    setNotiThisMonth(resThisMonth);
                }
                if (resEalier.Data.length != 0) {
                    setnotiEarlier(resEalier);
                }
            };
            callAPI();
        }
        getRequestFollow().then((res) => {
            if (res.Status == 200) {
                setListUserRequest(res.Data);
            }
        });
    }, []);

    return (
        <div>
            {/* Follow request section */}
            <h1 className="ml-2 text-2xl font-semibold mb-7">Notifications</h1>
            <ul className=" w-[100%] max-h-screen overflow-auto ">
                {listUserRequest?.at(0) != null ? (
                    <>
                        <li className="text-base flex  mb-4 ">
                            {listUserRequest.length >= 2 ? (
                                <>
                                    <div className="flex-1 w-1/6 relative ml-3">
                                        <img
                                            src={backend.imagePath + listUserRequest[0].userSrc.avatarPath}
                                            alt="avatar"
                                            className="rounded-full w-8 h-8 absolute top-1 left-1"
                                        />
                                        <img
                                            src={backend.imagePath + listUserRequest[1].userSrc.avatarPath}
                                            alt="avatar"
                                            className="rounded-full w-8 h-8 absolute bottom-1 right-1"
                                        />
                                    </div>
                                    <div className="flex-4 w-4/6 text-left pl-4">
                                        <h3 className="font-semibold">Follow request</h3>
                                        <span className="opacity-50 text-base">
                                            {listUserRequest[0].userSrc.userName +
                                                ' + ' +
                                                (listUserRequest.length - 1 + ' ')}{' '}
                                            others
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex-1 w-1/6 relative ml-3">
                                        <img
                                            src={backend.imagePath + listUserRequest[0].userSrc.avatarPath}
                                            alt="avatar"
                                            className="rounded-full w-12 h-12 absolute top-1 left-1"
                                        />
                                    </div>
                                    <div className="flex-4 w-4/6 text-left pl-4">
                                        <h3 className="font-semibold">Follow request</h3>
                                        <span className="opacity-50 text-base">
                                            {listUserRequest[0].userSrc.userName}
                                        </span>
                                    </div>
                                </>
                            )}
                            <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100 pr-4 ">
                                <button className="flex items-center space-x-2" onClick={() => onClose(3)}>
                                    <img src={ping} alt="icon1" className="w-2 h-2 ml-1" />
                                    <img src={arrow} alt="icon2" className="w-6 h-6 ml-2" />
                                </button>
                            </div>
                        </li>
                        <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>
                    </>
                ) : (
                    <></>
                )}

                {/* Notification this week section */}
                {notiThisWeek ? <NotificationItem title="This month" noti={notiThisWeek.Data} /> : <></>}

                {/* Notification this month section */}
                {notiThisMonth ? (
                    <>
                        <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>
                        <NotificationItem title="This week" noti={notiThisMonth.Data} />
                    </>
                ) : (
                    <></>
                )}

                {/* Notification earlier section */}
                {notiEarlier ? (
                    <>
                        <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>
                        <NotificationItem title="Earlier" noti={notiEarlier.Data} />
                    </>
                ) : (
                    <></>
                )}
            </ul>
        </div>
    );
}

export default NotificationPanel;
