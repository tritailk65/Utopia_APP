import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/logo/mini-logo.png';
import { useState } from 'react';
import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import SearchItem from './SearchItem/SearchItem';
import useDebounce from '../../../hooks/useDebounce';

export interface SearchBarProps {
    show: boolean;
    onClose: () => void;
}

function SearchBar(props: SearchBarProps) {
    const { show, onClose } = props;
    const [input, setInput] = useState<string>('');
    const debounce = useDebounce(input, 500);

    useEffect(() => {
        console.log('debounce : ' + debounce);
    }, [debounce]);

    return (
        <div className={`w-[486px] min-h-screen bg-white ${show ? 'fixed' : 'hidden'} z-50 flex shadow-2xl`}>
            <div className="w-[20%] border-r-4 border-gray-200 pt-8">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="img" className="w-14 h-14" />
                </div>
                <ul>
                    <Link to={'/'} className="">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-100 transition">
                            <BiHomeAlt className="mr-3" />
                        </li>
                    </Link>
                    <div onClick={onClose} className="cursor-pointer">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-100 transition">
                            <BiSearchAlt className="mr-3" />
                        </li>
                    </div>
                    <Link to={'/'} className="">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-100 transition">
                            <AiOutlineHeart className="mr-3" />
                        </li>
                    </Link>
                    <Link to={'/'} className="">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-100 transition">
                            <IoIosNotificationsOutline className="mr-3" />
                        </li>
                    </Link>
                    <Link to={'/'} className="">
                        <li className="justify-center pl-1 h-[63px] text-2xl flex items-center mb-1 hover:bg-slate-100 transition">
                            <AiOutlinePlusSquare className="mr-3" />
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="w-[80%]  py-8">
                <h1 className="ml-2 text-3xl font-semibold mb-7 px-3">Search</h1>
                <div className="border-2 border-transparent rounded-lg mx-3 mb-7 bg-gray-200 group">
                    <input
                        className="bg-transparent w-full px-3 py-2 text-xl"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div>
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
