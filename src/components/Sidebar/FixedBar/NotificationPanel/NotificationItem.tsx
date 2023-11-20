import { Link, Navigate, useNavigate } from 'react-router-dom';
import { backend_utils as backend } from '../../../../utils/api-utils';
import { NotificationItemType } from '../../../../types/notification-type';
import useCommentModal from '../../../../hooks/useCommentModal';

type NotificationItemProps = {
    title: string;
    noti: NotificationItemType[] | null;
};

const NotificationItem = ({ title, noti }: NotificationItemProps) => {
    const { openCommentModal } = useCommentModal();

    return (
        <>
            <li className="flex justify-between text-sm font-semibold tracking-wide py-1 mb-4">
                <span className="opacity-80 text-base px-2">{title}</span>
            </li>

            {noti?.map((_) => (
                <li
                    className="text-base flex pt-2 pb-2 mb-2 pl-4 cursor-pointer hover:bg-slate-300/30"
                    onClick={() => {}}
                >
                    <div className="flex-1 w-1/3">
                        <Link to={`/profile/` + _.userSource.userName}>
                            <img
                                src={backend.imagePath + _.userSource.avatarPath}
                                alt="avatar"
                                className="circle w-12 h-12 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div className="flex-5 w-5/6 text-left pl-4 mr-4">
                        <h3 className="font-semibold ">{_.userSource.userName}</h3>
                        <p>{_.context}</p>
                    </div>
                </li>
            ))}
        </>
    );
};

export default NotificationItem;
