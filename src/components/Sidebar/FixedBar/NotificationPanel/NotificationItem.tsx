import { Navigate, useNavigate } from 'react-router-dom';
import { backend_utils } from '../../../../utils/api-utils';
import { NotificationItemType } from '../../../../types/notification-type';

type NotificationItemProps = {
    title: string;
    noti: NotificationItemType[] | null;
};

const NotificationItem = ({ title, noti }: NotificationItemProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-[100%] h-1 bg-[#9D9C9C]/20 mb-2 rounded-xl"></div>
            <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                <span className="opacity-80 text-base px-2">{title}</span>
            </li>

            {noti?.map((_) => (
                <li className="text-base flex  mb-4 ml-4" onClick={() => navigate('/')}>
                    <div className="flex-1 w-[13%]">
                        <img
                            src={''}
                            alt="avatar"
                            className="circle w-12 h-12 cursor-pointer"
                            onClick={() => navigate('/profile')}
                        />
                    </div>
                    <div className="flex-5 w-[87%] text-left pl-4 cursor-pointer">
                        <h3 className="font-semibold ">{_.userSource.userName}</h3>
                        <p>{_.userSource.fullName}</p>
                    </div>
                </li>
            ))}
        </>
    );
};

export default NotificationItem;
