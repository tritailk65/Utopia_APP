import React from 'react';
import logo1 from '../../../assets/image/logo/logo1.png';
import { Link } from 'react-router-dom';
import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import StickyWrapper from '../../Wrapper/StickyWrapper/StickyWrapper';
function ActionBar() {
    return (
        <StickyWrapper top={0} left={0} shadow>
            <img src={logo1} alt="img" />
            <ul>
                <Link to={'/'} className="">
                    <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-slate-100 transition">
                        <BiHomeAlt className="mr-3" />
                        <span className="">Home</span>
                    </li>
                </Link>
                <Link to={'/'} className="">
                    <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-slate-100 transition">
                        <BiSearchAlt className="mr-3" />
                        <span className="">Search</span>
                    </li>
                </Link>
                <Link to={'/'} className="">
                    <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-slate-100 transition">
                        <AiOutlineHeart className="mr-3" />
                        <span className="">Following</span>
                    </li>
                </Link>
                <Link to={'/'} className="">
                    <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-slate-100 transition">
                        <IoIosNotificationsOutline className="mr-3" />
                        <span className="">Notification</span>
                    </li>
                </Link>
                <Link to={'/'} className="">
                    <li className="pl-9 h-[63px] text-xl flex items-center mb-1 hover:bg-slate-100 transition">
                        <AiOutlinePlusSquare className="mr-3" />
                        <span className="">Create</span>
                    </li>
                </Link>
            </ul>
        </StickyWrapper>
    );
}

export default ActionBar;
