import olivia from '../../../../assets/image/olivia.png';
import bob from '../../../../assets/image/bob.png';
import ping from '../../../../assets/image/ping.png';
import arrow from '../../../../assets/image/Arrow_right.png';
import { useState, useEffect } from 'react';
import { NotificationEarlier, NotificationThisMonth, NotificationThisWeek } from '../../../../types/notification-type';
import { Response } from '../../../../types/api-type';
import {
    getListNotiEarlier,
    getListNotiThisMonth,
    getListNotiThisWeek,
} from '../../../../services/notification-service';
import { getUserAvatar } from '../../../../services/user-service';
import NotificationItem from './NotificationItem';

export interface NotificationPanelProps {
    onClose: (index: number) => void;
}

function NotificationPanel(props: NotificationPanelProps) {
    const { onClose } = props;

    const [notiThisWeek, setNotiThisWeek] = useState<Response<NotificationThisWeek[]>>();
    const [notiThisMonth, setNotiThisMonth] = useState<Response<NotificationThisMonth[]>>();
    const [notiEarlier, setnotiEarlier] = useState<Response<NotificationEarlier[]>>();

    const [urlBlod, setUrlBlod] = useState<string>();

    useEffect(() => {
        const callAPI = async () => {
            //ID User hiện tại sẽ được lấy trong local storage
            const resThisWeek: Response<NotificationThisWeek[]> = await getListNotiThisWeek(1);
            const resThisMonth: Response<NotificationThisWeek[]> = await getListNotiThisMonth(1);
            const resEalier: Response<NotificationThisWeek[]> = await getListNotiEarlier(1);

            setNotiThisWeek(resThisWeek);
            setNotiThisMonth(resThisMonth);
            setnotiEarlier(resEalier);
        };

        callAPI();
    }, []);

    return (
        <div>
            {/* Follow request section */}
            <h1 className="ml-2 text-2xl font-semibold mb-7">Notifications</h1>
            <ul className=" w-[100%] max-h-screen overflow-auto ">
                <li className="text-base flex  mb-4 " onClick={() => onClose(3)}>
                    <div className="flex-1 w-1/6 relative ml-3">
                        <img src={bob} alt="avatar" className="rounded-full w-8 h-8 absolute top-1 left-1" />
                        <img src={olivia} alt="avatar" className="rounded-full w-8 h-8 absolute bottom-1 right-1" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Follow request</h3>
                        <span className="opacity-50 text-base">postmalone + 99 others</span>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100 pr-4 ">
                        <button className="flex items-center space-x-2">
                            <img src={ping} alt="icon1" className="w-2 h-2 ml-1" />
                            <img src={arrow} alt="icon2" className="w-6 h-6 ml-2" />
                        </button>
                    </div>
                </li>

                <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>

                {/* Notification this week section */}

                <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base px-2">This week</span>
                </li>

                {notiThisWeek?.Data.map((noti) => (
                    <NotificationItem user={noti.userSource} context={noti.context} />
                ))}

                <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>

                {/* Notification this month section */}

                <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base px-2">This month</span>
                </li>

                {notiThisMonth?.Data.map((noti, index) => (
                    <NotificationItem key={index} user={noti.userSource} context={noti.context} />
                ))}

                <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>

                {/* Notification earlier section */}

                <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base px-2">Earlier</span>
                </li>

                {notiEarlier?.Data.map((noti, index) => (
                    <NotificationItem key={index} user={noti.userSource} context={noti.context} />
                ))}
            </ul>
        </div>
    );
}

export default NotificationPanel;
