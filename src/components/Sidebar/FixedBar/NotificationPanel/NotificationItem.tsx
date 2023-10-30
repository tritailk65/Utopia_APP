import { useState, useEffect } from 'react';
import { getUserAvatar } from '../../../../services/user-service';
import { Navigate, useNavigate } from 'react-router-dom';

type NotificationItemProps = {
    user: {
        id: number;
        userName: string;
        avatar: string;
        follower: string;
    };
    context: string;
};

function NotificationItem({ user, context }: NotificationItemProps) {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<string | undefined>();

    useEffect(() => {
        const callAPI = async () => {
            const res = await getUserAvatar(user.id);
            setAvatar(res);
        };

        callAPI();
    }, []);

    return (
        <li className="text-base flex  mb-4 ml-4" onClick={() => navigate('/')}>
            <div className="flex-1 w-[13%]">
                <img
                    src={avatar}
                    alt="avatar"
                    className="circle w-12 h-12 cursor-pointer"
                    onClick={() => navigate('/profile')}
                />
            </div>
            <div className="flex-5 w-[87%] text-left pl-4 cursor-pointer">
                <h3 className="font-semibold ">{user.userName}</h3>
                <p>{context}</p>
            </div>
        </li>
    );
}

export default NotificationItem;
