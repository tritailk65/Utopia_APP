import olivia from '../../../../assets/image/olivia.png';
import bob from '../../../../assets/image/bob.png';
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

export interface NotificationPanelProps {
    onClose: (index: number) => void;
}

function NotificationPanel(props: NotificationPanelProps) {
    const { onClose } = props;
    const [user, setUser] = useState<UserInfo>();
    const [notiThisWeek, setNotiThisWeek] = useState<Response<NotificationItemType[]> | null>();
    const [notiThisMonth, setNotiThisMonth] = useState<Response<NotificationItemType[]> | null>();
    const [notiEarlier, setnotiEarlier] = useState<Response<NotificationItemType[]> | null>();

    useEffect(() => {
        if (localStorage['userData']) {
            setUser(JSON.parse(localStorage['userData']));
        }
    }, []);

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
    }, [user]);

    return (
        <div>
            {/* Follow request section */}
            <h1 className="ml-2 text-2xl font-semibold mb-7">Notifications</h1>
            <ul className=" w-[100%] max-h-screen overflow-auto ">
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 relative ml-3">
                        <img src={bob} alt="avatar" className="rounded-full w-8 h-8 absolute top-1 left-1" />
                        <img src={olivia} alt="avatar" className="rounded-full w-8 h-8 absolute bottom-1 right-1" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold">Follow request</h3>
                        <span className="opacity-50 text-base">postmalone + 99 others</span>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100 pr-4 ">
                        <button className="flex items-center space-x-2" onClick={() => onClose(3)}>
                            <img src={ping} alt="icon1" className="w-2 h-2 ml-1" />
                            <img src={arrow} alt="icon2" className="w-6 h-6 ml-2" />
                        </button>
                    </div>
                </li>

                {/* Notification this week section */}
                {notiThisWeek ? <NotificationItem title="This week" noti={notiThisWeek.Data} /> : <></>}

                {/* Notification this month section */}
                {notiThisMonth ? <NotificationItem title="This month" noti={notiThisMonth.Data} /> : <></>}

                {/* Notification earlier section */}
                {notiEarlier ? <NotificationItem title="Earlier" noti={notiEarlier.Data} /> : <></>}
            </ul>
        </div>
    );
}

export default NotificationPanel;
