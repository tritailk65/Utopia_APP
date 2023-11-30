import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import logo from '../../../assets/image/logo/mini-logo.png';
import { Link } from 'react-router-dom';
import SearchPanel from './SearchPanel/SearchPanel';
import NotificationPanel from './NotificationPanel/NotificationPanel';
import FollowRequestPanel from './FollowRequestPanel/FollowRequestPanel';
import { LuBellRing } from 'react-icons/lu';
import { AiOutlineUser } from 'react-icons/ai';
import useFollowModal from '../../../hooks/useFollowModal';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import useCreatePostModal from '../../../hooks/useCreatePostModal';
import { UserInfo } from '../../../types/user-type';
import useRedirect from '../../../hooks/useRedirect';

export interface FixedBarProps {
    show: boolean;
    panel: number;
    onClose: (index: number) => void;
}

function FixedBar(props: FixedBarProps) {
    const { show, panel, onClose } = props;
    const user: UserInfo = useGetUserInfo();
    const { openFollowModal } = useFollowModal();
    const { openCreatePostModal } = useCreatePostModal();
    const { onRedirect } = useRedirect();

    return (
        <div className={`w-full min-h-screen bg-transparent ${show ? 'fixed' : 'hidden'} z-20 flex`}>
            <div className={`w-[550px] min-h-screen bg-white  flex shadow-2xl `}>
                <div className="w-[20%] border-r-4 border-gray-200 pt-8">
                    <div className="flex justify-center mb-4">
                        <div onClick={() => onRedirect('/')} className="cursor-pointer">
                            <img src={logo} alt="img" className="w-14 h-14" />
                        </div>
                    </div>
                    <ul>
                        {/* Home */}
                        <div onClick={() => onRedirect('/')} className="cursor-pointer">
                            <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <BiHomeAlt className="mr-3" />
                            </li>
                        </div>

                        {/* Search */}
                        <div onClick={() => onClose(1)} className="cursor-pointer">
                            <li
                                className={`justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition ${
                                    panel === 1 ? 'bg-gray-200' : 'bg-transparent'
                                }`}
                            >
                                <BiSearchAlt className="mr-3" />
                            </li>
                        </div>

                        {/* Following */}
                        <div onClick={() => openFollowModal(user.id)} className="cursor-pointer">
                            <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <AiOutlineHeart className="mr-3" />
                            </li>
                        </div>

                        {/* Notification */}
                        <div onClick={() => onClose(2)} className="cursor-pointer">
                            <li
                                className={`justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition ${
                                    panel === 2 ? 'bg-gray-200' : 'bg-transparent'
                                }`}
                            >
                                <LuBellRing className="mr-3" />
                            </li>
                        </div>

                        {/* Create */}
                        <div onClick={() => openCreatePostModal(user.id)} className="cursor-pointer">
                            <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition">
                                <AiOutlinePlusSquare className="mr-3" />
                            </li>
                        </div>

                        {/* Profile */}
                        <div onClick={() => onRedirect(`/profile/${user.userName}`)} className="cursor-pointer">
                            <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-200 transition">
                                <AiOutlineUser className="mr-2 " />
                            </li>
                        </div>
                    </ul>
                </div>
                <div className="w-[80%]  py-8">
                    {panel === 1 && <SearchPanel />}
                    {panel === 2 && <NotificationPanel onClose={onClose} />}
                    {panel === 3 && <FollowRequestPanel onClose={onClose} />}
                </div>
            </div>
            <div className=" h-[100vh] flex-1" onClick={() => onClose(100)}></div>
        </div>
    );
}

export default FixedBar;
