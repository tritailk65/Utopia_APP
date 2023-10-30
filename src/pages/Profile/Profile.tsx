import React, { useState, useEffect } from 'react';
import hinhdaidien from '../../assets/image/hinhdaidien.png';
import iconhinh from '../../assets/image/iconhinh.png';
import iconsave from '../../assets/image/iconsave.png';
import iconcamera from '../../assets/image/iconcamera.png';
import { Link, useParams } from 'react-router-dom';
import {getUserDataById, getAvatar} from '../../services/user-service';
import Posts from './Posts';
import Saved from './Saved';

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
        const [checkUser, setIsCheckUser] = useState(false);
        const [userData, setUserData] = useState<UserData | null>(null);
        const [userDateFromAPI, setUserDateFromAPI] = useState<UserData | null>(null);
        const [idUserData, setIdUserData] = useState(0);
        const { id } = useParams();
        const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
 
        //lay user tu db
        useEffect(() => {
            getUserDataById(id)
                .then((userDateFromAPI) => {
                        localStorage.setItem('userDataFromAPI', JSON.stringify(userDateFromAPI));
                        setUserDateFromAPI(userDateFromAPI);
                });
        }, [id]);
        // lay user tu local
        useEffect(() => {
            fetchAvatar(id);
            const idCheck= Number(userDateFromAPI?.id);
            
            // Truy cập Local Storage để lấy thông tin người dùng
            const userFromLocalStorage = localStorage.getItem('userData');
            
            if (userFromLocalStorage) {
                const userData = JSON.parse(userFromLocalStorage);
                setUserData(userData);
                setIdUserData(userData.id);
            }
            
        
            // Kiểm tra điều kiện sau khi cập nhật dữ liệu
            if (idCheck === idUserData) {
                setIsCheckUser(true);
            } else {
                setIsCheckUser(false);
            }


             // Lấy avatar URL từ Local Storage và cập nhật state (nếu tồn tại)
             const storedAvatarUrl = localStorage.getItem('avatarUrl');
             if (storedAvatarUrl) {
                 setAvatarUrl(storedAvatarUrl);
             }
        }, [userDateFromAPI, idUserData]);
    
    

    // Sử dụng useState để quản lý trạng thái của dropdown menu
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleDropdownClick = () => {
        // Khi nút "..." được nhấn, đảm bảo toggle trạng thái của dropdown menu
        setIsDropdownOpen(!isDropdownOpen);
    };

  
      const fetchAvatar = (id: string | undefined) => {
        // Gọi API để lấy ảnh đại diện dựa trên ID của người dùng chuyển sang arraybuffer để tao blog
        getAvatar(id)
          .then((avatarUrl) => {
            if (avatarUrl !== undefined) 
            {
            localStorage.setItem('avatarUrl', avatarUrl);
            setAvatarUrl(avatarUrl);
            }     
          })
      };

      const [activeTab, setActiveTab] = useState('POSTS'); // kiem tra trang thai dang click
      const [checkSave,setSave]= useState(false); // kiem tra co save k
      const [checkPost,setPost]= useState(false); // kiem tra co post k
      const s=0; // save
      const p=0; // post
      const handleTabClick = (tabName: React.SetStateAction<string>) => {
          s>0 ? setSave(true) : setSave(false);
          p>0 ? setPost(true) : setPost(false); 
          setActiveTab(tabName);
      };

    return (
        <div className="min-h-full w-full">
            <div className="profile text-2xl w-[1000px] mx-auto mt-8 bg-white p-4 rounded-lg ">
                <div className="flex items-center space-x-6">
                    {avatarUrl ? (
                    <div className="flex-shrink-0 mt-5">
                    <img src={avatarUrl} alt="profile img" className="rounded-full h-[200px] w-[200px] mb-5" />
                    </div>
                    ):(
                    <div className="flex-shrink-0 mt-5">
                    <img src={hinhdaidien} alt="profile img" className="rounded-full h-[200px] w-[200px] mb-5" />
                    </div>
                    )
                    }
                    <div>
                        <div className="flex  mb-[25px]">
                            {userDateFromAPI &&(
                                <h1 className="text-3xl font-semibold ml-10 min-w-[200px] max-w-[200px]">{userDateFromAPI.fullName}</h1>
                            )}
                            <div className="ml-[200px]">
                               {checkUser?(
                                    <button className="bg-gray-300  px-4 py-2 rounded-lg">
                                    <Link to="/profile/edit">Edit Profile</Link>
                                    </button>
                               ): (
                                <button className="bg-blue-800  px-4 py-2 rounded-lg">
                                    <Link to="">Follow</Link>
                                </button>
                               )
                               }
                               
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
                            {userDateFromAPI && (
                            <><h1 className="text-3xl font-semibold mb-4">{userDateFromAPI.bio}</h1><div className="text-blue-500">{userDateFromAPI.website}</div></>
                            )
                            }
                        </div>
                    </div>
                </div>

                <div>
                    <div className="border-t-[3px] border-gray-300 mt-5 mb-4"></div>
                    <div className="flex space-x-6 justify-center">
                    <div
                        className={`flex cursor-pointer items-center p-2 ${
                            activeTab === 'POSTS' ? 'bg-gray-400 text-white font-semibold' : ''
                        }`}
                        onClick={() => handleTabClick('POSTS')}
                        >
                        <div className={`w-8 h-8 ${activeTab === 'POSTS' ? 'bg-gray-400' : ''}`}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <rect x="4" y="4" width="8" height="8" rx="2" ry="2" />
                            <rect x="12" y="4" width="8" height="8" rx="2" ry="2" />
                            <rect x="4" y="12" width="8" height="8" rx="2" ry="2" />
                            <rect x="12" y="12" width="8" height="8" rx="2" ry="2" />
                            </svg>
                        </div>
                        <h1>POSTS</h1>
                    </div>

                    <div
                        className={`flex cursor-pointer items-center p-2 ${
                            activeTab === 'SAVED' ? 'bg-gray-400 text-white font-semibold' : ''
                        }`}
                        onClick={() => handleTabClick('SAVED')}
                    >
                        <div className={`w-8 h-8 rounded-full ${activeTab === 'SAVED' ? 'bg-gray-400' : ''}`}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <polygon points="6 4 19 4 21 12 12 20 3 12 6 4" />
                            </svg>
                        </div>
                        <h1>SAVED</h1>
                    </div>
                </div>
                    {activeTab === 'POSTS' ? (
                        checkPost ? (
                        <Posts />
                        ) : (
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
                        )
                    ) : (
                        checkSave ? (
                        <Saved />
                        ) : (
                        <div className="mt-[100px] flex flex-col items-center justify-center space-y-10">
                            <img src={iconcamera} className="w-[100px] h-[100px]" alt="Camera Icon" />
                            <h1 className="text-3xl font-bold">Save</h1>
                            <p className="text-center w-[480px] text-[19px]">
                                Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.
                            </p>
                        </div>
                        )
                    )}             
                </div>

                

            </div>
        </div>
    );
}

export default Profile;
