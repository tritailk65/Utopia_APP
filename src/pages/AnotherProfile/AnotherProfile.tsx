import React, { useState } from 'react';
import hinhdaidien from '../../assets/image/hinhdaidien.png';
import success from '../../assets/image/success.png';
import { Link } from 'react-router-dom';

function AnotherProfile() {
    // Sử dụng useState để quản lý trạng thái của dropdown menu
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        // Khi nút "..." được nhấn, đảm bảo toggle trạng thái của dropdown menu
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="min-h-full w-full">
            <div className="profile text-2xl w-[1000px] mx-auto mt-8 bg-white p-4 rounded-lg ">
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 mt-5">
                        <img src={hinhdaidien} alt="Profile" className="w-34 h-34 rounded-full" />
                    </div>
                    <div>
                        <div className="flex  mb-[25px]">
                            <h1 className="text-3xl font-semibold ml-10 min-w-[200px] max-w-[200px]">Duc</h1>
                            <div className="ml-[200px]">
                                <button className="bg-blue-800  px-4 py-2 rounded-lg">
                                    <Link to="">Follow</Link>
                                </button>
                            </div>
                            <div className="relative inline-block text-left ml-4">
                                <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={handleDropdownClick}>
                                    {isDropdownOpen ? 'X' : '...'}
                                </button>
                                {isDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <a
                                                href="google.com"
                                                className="block px-4 py-2 text-gray-700"
                                                role="menuitem"
                                            >
                                                Option 1
                                            </a>
                                            <a
                                                href="google.com"
                                                className="block px-4 py-2 text-gray-700"
                                                role="menuitem"
                                            >
                                                Option 2
                                            </a>
                                            <a
                                                href="google.com"
                                                className="block px-4 py-2 text-gray-700"
                                                role="menuitem"
                                            >
                                                Option 3
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ml-10">
                            <ul className="flex space-x-12">
                                <li>
                                    <span className="font-semibold">9,990</span>
                                    <span className="text-gray-600 ml-1">posts</span>
                                </li>
                                <li>
                                    <span className="font-semibold">1,100</span>
                                    <span className="text-gray-600 ml-1">followers</span>
                                </li>
                                <li>
                                    <span className="font-semibold">1,150</span>
                                    <span className="text-gray-600 ml-1">following</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 ml-10 ">
                            <h1 className="text-3xl font-semibold mb-4">Hello,.......</h1>
                            <a href="google.com" className="text-blue-500">
                                abcedc.com.vn
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="border-t-[3px] border-gray-300 mt-5 mb-4"></div>
                    <div className="min-h-full w-full">
                        <div className="profile text-2xl w-[1000px] mx-auto mt-8 bg-white p-4 ">
                            <div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <img src={success} className="w-full" alt="img" />
                                    </div>
                                    <div>
                                        <img src={success} className="w-full" alt="img" />
                                    </div>
                                    <div>
                                        <img src={success} className="w-full" alt="img" />
                                    </div>
                                    <div>
                                        <img src={success} className="w-full" alt="img" />
                                    </div>
                                    <div>
                                        <img src={success} className="w-full" alt="img" />
                                    </div>
                                    <div>
                                        <img src={success} className="w-full" alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnotherProfile;
