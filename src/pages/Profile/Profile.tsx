import React, { useState, useEffect } from 'react';
import hinhdaidien from '../../assets/image/hinhdaidien.png';
import iconhinh from '../../assets/image/iconhinh.png';
import iconsave from '../../assets/image/iconsave.png';
import iconcamera from '../../assets/image/iconcamera.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface UserData {
        id: BigInteger,
        userName: string,
        phone: string,
        email: string,
        fullName: string,
        gender: string,
        bio: string,
        website: string,
        avatarPath: string
}

function Profile() {

    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        // Truy cập Local Storage để lấy thông tin người dùng
        const userFromLocalStorage = localStorage.getItem('userData');
        if (userFromLocalStorage) {
            const userData = JSON.parse(userFromLocalStorage);
            setUserData(userData);
            fetchAvatar();
        }
        const storedAvatarUrl = localStorage.getItem('avatarUrl');
        if (storedAvatarUrl) {
            setAvatarUrl(storedAvatarUrl);
        }
    }, []);

    // Sử dụng useState để quản lý trạng thái của dropdown menu
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleDropdownClick = () => {
        // Khi nút "..." được nhấn, đảm bảo toggle trạng thái của dropdown menu
        setIsDropdownOpen(!isDropdownOpen);
    };

      const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
      const fetchAvatar = () => {
        // Gọi API để lấy ảnh đại diện dựa trên ID của người dùng chuyển sang arraybuffer để tao blog
        axios.get(`http://localhost:8080/api/User/Avatar/${userData?.id}`, { responseType: 'arraybuffer' })
          .then((response) => {
            // Chuyển đổi dữ liệu nhận được thành một Blob
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
      
            // Tạo một URL cho Blob
            const imageUrl = URL.createObjectURL(blob);
            localStorage.setItem('avatarUrl', imageUrl);
            // Cập nhật trạng thái ảnh đại diện
            setAvatarUrl(imageUrl);
          })
          .catch((error) => {
            console.error('Error fetching avatar', error);
          });
      };

    return (
        <div className="min-h-full w-full">
            <div className="profile text-2xl w-[1000px] mx-auto mt-8 bg-white p-4 rounded-lg ">
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 mt-5">
                        <img src={avatarUrl || hinhdaidien} alt="profile img" className="rounded-full h-[200px] w-[200px] mb-5" />
                    </div>
                    <div>
                        <div className="flex  mb-[25px]">
                            {userData &&(
                                <h1 className="text-3xl font-semibold ml-10 min-w-[200px] max-w-[200px]">{userData.fullName}</h1>
                            )}
                            <div className="ml-[200px]">
                                <button className="bg-gray-300  px-4 py-2 rounded-lg">
                                    <Link to="/profile/edit">Edit Profile</Link>
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
                                            <div className="block px-4 py-2 text-gray-700" role="menuitem">
                                                Option 1
                                            </div>
                                            <div className="block px-4 py-2 text-gray-700" role="menuitem">
                                                Option 2
                                            </div>
                                            <div className="block px-4 py-2 text-gray-700" role="menuitem">
                                                Option 3
                                            </div>
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
                            {userData && (
                            <><h1 className="text-3xl font-semibold mb-4">{userData.bio}</h1><div className="text-blue-500">{userData.website}</div></>
                            )
                            }
                        </div>
                    </div>
                </div>

                <div>
                    <div className="border-t-[3px] border-gray-300 mt-5 mb-4"></div>
                    <div className="flex space-x-6 justify-center">
                        <div className="flex">
                            <img src={iconhinh} className="" alt="img" />
                            <h1>POSTS</h1>
                        </div>
                        <div className="flex">
                            <img src={iconsave} className="" alt="img" />
                            <h1>SAVED</h1>
                        </div>
                    </div>
                </div>

                <div className="mt-[100px] flex flex-col items-center justify-center space-y-10">
                    <img src={iconcamera} className="w-[100px] h-[100px]" alt="Camera Icon" />
                    <h1 className="text-3xl font-bold">Share Photos</h1>
                    <p className="text-center">When you share photos, they will appear on your profile</p>
                    <Link to={'/'}>
                        <span className="text-xl font-semibold cursor-pointer text-blue-500">
                            Share your first photos
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
