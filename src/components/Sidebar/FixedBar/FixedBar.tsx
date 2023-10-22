import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import logo from '../../../assets/image/logo/mini-logo.png';
import { Link } from 'react-router-dom';
import SearchPanel from './SearchPanel/SearchPanel';
import NotificationPanel from './NotificationPanel/NotificationPanel';
import FollowRequestPanel from './FollowRequestPanel/FollowRequestPanel';

export interface FixedBarProps {
    show: boolean;
    panel: number;
    onClose: (index: number) => void;
}

function FixedBar(props: FixedBarProps) {
    const { show, panel, onClose } = props;

    return (
        <div className={`w-[486px] min-h-screen bg-white ${show ? 'fixed' : 'hidden'} z-50 flex shadow-2xl`}>
            <div className="w-[20%] border-r-4 border-gray-200 pt-8">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="img" className="w-14 h-14" />
                </div>
                <ul>
                    <Link to={'/'} className="">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition">
                            <BiHomeAlt className="mr-3" />
                        </li>
                    </Link>
                    <div onClick={() => onClose(1)} className="cursor-pointer">
                        <li
                            className={`justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition ${
                                panel === 1 ? 'bg-gray-200' : 'bg-transparent'
                            }`}
                        >
                            <BiSearchAlt className="mr-3" />
                        </li>
                    </div>
                    <div onClick={() => onClose(4)} className="cursor-pointer">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition">
                            <AiOutlineHeart className="mr-3" />
                        </li>
                    </div>
                    <div onClick={() => onClose(2)} className="cursor-pointer">
                        <li
                            className={`justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-gray-200 transition ${
                                panel === 2 ? 'bg-gray-200' : 'bg-transparent'
                            }`}
                        >
                            <IoIosNotificationsOutline className="mr-3" />
                        </li>
                    </div>
                    <Link to={'/'} className="">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-200 transition">
                            <AiOutlinePlusSquare className="mr-3" />
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="w-[80%]  py-8">
                {panel === 1 && <SearchPanel />}
                {panel === 2 && <NotificationPanel onClose={onClose} />}
                {panel === 3 && <FollowRequestPanel onClose={onClose} />}
            </div>
        </div>
    );
}

export default FixedBar;
