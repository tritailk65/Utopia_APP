import React, { useEffect, useState } from 'react';
import oggy from '../../../assets/image/oggy.png';
import none_avatar from '../../../assets/image/none_avatar.jpg';
import bob from '../../../assets/image/bob.png';
import jack from '../../../assets/image/jack.png';
import dee from '../../../assets/image/dee.png';
import StickyWrapper from '../../Wrapper/StickyWrapper/StickyWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfo } from '../../../types/user-type';
import ConfirmDialog from '../../Dialog/ConfirmDialog/ConfirmDialog';
import { getAvatar } from '../../../services/user-service';

function FriendBar() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [titleComfirmModel, setTitleComfirmModel] = useState('');
    const [showConfirmModel, setShowCofirmModel] = useState(false);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('userData') || '');
        // if (user) {
        //     setUserInfo(user);
        //     getAvatar(user.id).then((res) => {
        //         if (res) {
        //             setAvatar(res);
        //         }
        //     });
        // }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };

    const logoutConfirm = () => {
        setTitleComfirmModel('Bạn có chắc muốn đăng xuất ?');
        setShowCofirmModel(true);
    };

    return (
        <StickyWrapper top={14} right={0} paddingLeft={16}>
            <ul className=" w-[319px] px-2">
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        {avatar ? (
                            <img src={avatar} alt="avatar" className="circle w-12 h-12" />
                        ) : (
                            <img src={none_avatar} alt="avatar" className="circle w-12 h-12" />
                        )}
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">{userInfo?.userName}</h3>
                        <p>{userInfo?.fullName}</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span onClick={logoutConfirm} className="text-sm">
                            Switch
                        </span>
                    </div>
                </li>

                <li className="flex justify-between text-sm tracking-wide py-1 mb-4">
                    <span className="opacity-80 text-base">Suggested for you</span>
                    <Link to="/SuggestFollowAll">
                        <span className="font-semibold cursor-pointer hover:text-[#787878]">See all</span>
                    </Link>
                </li>

                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={oggy} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Oggy</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={jack} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Jack</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={bob} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">Bob</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
                <li className="text-base flex  mb-4 ">
                    <div className="flex-1 w-1/6 ">
                        <img src={dee} alt="avatar" className="circle w-12 h-12" />
                    </div>
                    <div className="flex-4 w-4/6 text-left pl-4">
                        <h3 className="font-semibold cursor-pointer">DeeDee</h3>
                        <p>Suggested for you</p>
                    </div>
                    <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer text-blue-600 font-semibold opacity-70 hover:opacity-100">
                        <span className="text-sm">Follow</span>
                    </div>
                </li>
            </ul>

            <ConfirmDialog
                title={titleComfirmModel}
                confirmText="OK"
                cancelText="Cancle"
                onClose={() => {}}
                onCancel={() => setShowCofirmModel(false)}
                onConfirm={() => handleLogout()}
                show={showConfirmModel}
            />
        </StickyWrapper>
    );
}

export default FriendBar;
