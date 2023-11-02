import logo1 from '../../../assets/image/logo/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import FollowModal from '../../Modal/FollowModal/FollowModal';
import { useEffect, useState } from 'react';
import CreatePostModal from '../../Modal/CreatePostModal/CreatePostModal';
import { LuBellRing } from 'react-icons/lu';
import { BsPersonCircle } from 'react-icons/bs';
import { UserInfo } from '../../../types/user-type';
import useCreatePostModal from '../../../hooks/useCreatePostModal';
import useFollowModal from '../../../hooks/useFollowModal';

export interface ActionBarProps {
    onOpen: (index: number) => void;
}

function ActionBar(props: ActionBarProps) {
    const navigate = useNavigate();
    const { onOpen } = props;
    const [navigateProfile, setNavigateProfile] = useState('');
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const { openCreatePostModal } = useCreatePostModal();
    const { openFollowModal } = useFollowModal();
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('userData') || '');
        // if (user) {
        //     setUserInfo(user);
        //     setNavigateProfile('/profile/' + user.id);
        // }
    }, []);

    return (
        <>
            <div className="mr-2 min-h-screen shrink-0 z-10 shadow-xl max-w-[270px]">
                <div className="sticky top-0 left-0">
                    <img src={logo1} alt="img" />
                    <ul>
                        <Link to={'/'} className="">
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <BiHomeAlt className="mr-3" />
                                <span className="">Home</span>
                            </li>
                        </Link>
                        <div onClick={() => onOpen(1)} className="cursor-pointer">
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <BiSearchAlt className="mr-3" />
                                <span className="">Search</span>
                            </li>
                        </div>
                        <div className="cursor-pointer" onClick={() => openFollowModal(1)}>
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <AiOutlineHeart className="mr-3" />
                                <span className="">Following</span>
                            </li>
                        </div>
                        <div onClick={() => onOpen(2)} className="cursor-pointer">
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <LuBellRing className="mr-3" />
                                <span className="">Notification</span>
                            </li>
                        </div>
                        <div className="cursor-pointer" onClick={() => openCreatePostModal(1)}>
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <AiOutlinePlusSquare className="mr-3" />
                                <span className="">Create</span>
                            </li>
                        </div>
                        <div className="cursor-pointer" onClick={() => navigate(navigateProfile)}>
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <BsPersonCircle className="mr-3" />
                                <span className="">Profile</span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ActionBar;
