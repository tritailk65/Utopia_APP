import logo1 from '../../../assets/image/logo/logo1.png';
import { Link } from 'react-router-dom';
import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import FollowModal from '../../Modal/FollowModal/FollowModal';
import { useState } from 'react';
import CreatePostModal from '../../Modal/CreatePostModal/CreatePostModal';

export interface ActionBarProps {
    onOpen: (index: number) => void;
}

function ActionBar(props: ActionBarProps) {
    const { onOpen } = props;
    const [modal, setModal] = useState<boolean>(false);
    const [create, setCreate] = useState<boolean>(false);
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
                        <div className="cursor-pointer" onClick={() => setModal(true)}>
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <AiOutlineHeart className="mr-3" />
                                <span className="">Following</span>
                            </li>
                        </div>
                        <div onClick={() => onOpen(2)} className="cursor-pointer">
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <IoIosNotificationsOutline className="mr-3" />
                                <span className="">Notification</span>
                            </li>
                        </div>
                        <div className="cursor-pointer" onClick={() => setCreate(true)}>
                            <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <AiOutlinePlusSquare className="mr-3" />
                                <span className="">Create</span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <FollowModal show={modal} onClose={() => setModal(false)} />
            <CreatePostModal show={create} onClose={() => setCreate(false)} />
        </>
    );
}

export default ActionBar;
