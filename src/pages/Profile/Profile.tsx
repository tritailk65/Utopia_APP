import React, { useState, useEffect, useLayoutEffect } from 'react';
import iconcamera from '../../assets/image/iconcamera.png';
import bookmark from '../../assets/image/icon/Bookmark.png';
import { Link, useParams } from 'react-router-dom';
import { backend_utils as backend } from '../../utils/api-utils';
import Saved from '../../components/Profile/ProfilePostSaved';
import { UserInfo } from '../../types/user-type';
import { AiOutlinePicture } from 'react-icons/ai';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { Response } from '../../types/api-type';
import { getUserByName } from '../../services/user-service';
import { PostForViewer } from '../../types/post-type';
import { getListPostProfile } from '../../services/post-service';
import { error } from 'console';
import ProfilePosts from '../../components/Profile/ProfilePosts';
import emptyPost from '../../assets/image/empty.png';
import useCreatePostModal from '../../hooks/useCreatePostModal';

function Profile() {
    const user: UserInfo = useGetUserInfo();
    const params = useParams<{ username: string }>();
    const { username } = params;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notMyProfile, setNotMyProfile] = useState<boolean>(false);
    const [dataAnyProfile, setDataAnyProfile] = useState<Response<UserInfo>>();
    const [dataPostProfile, setDataPostProfile] = useState<Response<PostForViewer[]>>();
    const [dataPostAnyProfile, setDataPostAnyProfile] = useState<Response<PostForViewer[]>>();
    const [activeTab, setActiveTab] = useState('POSTS'); // kiem tra trang thai dang click
    const [checkSave, setCheckSave] = useState(false); // kiem tra co save k
    const [checkPost, setCheckPost] = useState<boolean>(false); // kiem tra co post k
    const [checkAnyPost, setCheckAnyPost] = useState<boolean>(false);
    const { openCreatePostModal } = useCreatePostModal();

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        try {
            if (username != user.userName && username != undefined) {
                getUserByName(username).then((res) => {
                    if (res != undefined) {
                        setDataAnyProfile(res);
                    }
                });
                getListPostProfile(username, 1).then((res) => {
                    setDataPostAnyProfile(res);
                });
                setNotMyProfile(true);
            } else if (username == user.userName) {
                getListPostProfile(user.userName, 1).then((res) => {
                    setDataPostProfile(res);
                });
                setNotMyProfile(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [username]);

    return (
        <div className="w-[130%] mx-auto ml-10">
            <div className="profile text-xl w-[100%] mx-auto mt-4 bg-white p-4 rounded-lg ">
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 mt-5">
                        {!notMyProfile && (
                            <img
                                src={backend.imagePath + user?.avatarPath}
                                alt="profile img"
                                className="rounded-full h-[150px] w-[150px] mb-5"
                            />
                        )}
                        {notMyProfile && dataAnyProfile?.Data && (
                            <img
                                src={backend.imagePath + dataAnyProfile.Data.avatarPath}
                                alt="profile img"
                                className="rounded-full h-[150px] w-[150px] mb-5"
                            />
                        )}
                    </div>
                    <div>
                        <div className="flex  mb-[25px]">
                            {!notMyProfile && (
                                <h1 className="text-2xl font-semibold ml-10 min-w-[200px] max-w-[200px]">
                                    {user.userName}
                                </h1>
                            )}
                            {notMyProfile && dataAnyProfile?.Data && (
                                <h1 className="text-2xl font-semibold ml-10 min-w-[200px] max-w-[200px]">
                                    {dataAnyProfile.Data.userName}
                                </h1>
                            )}
                            <div className="ml-[180px]">
                                {!notMyProfile && (
                                    <button className=" bg-[#001F3E] w-[115px] font-semibold transition border-2 border-transparent rounded-xl text-sm text-[#ffffff] hover:bg-[#ffffff] hover:border-[#001F3E] hover:text-[#001F3E] px-4 py-1.5 mr-3">
                                        <Link to="/profile/edit">Edit profile</Link>
                                    </button>
                                )}
                                {notMyProfile && (
                                    <button
                                        onClick={() => {}}
                                        className=" bg-[#001F3E] transition border-2 border-transparent rounded-xl text-sm text-[#ffffff] hover:bg-[#ffffff] hover:border-[#001F3E] hover:text-[#001F3E] px-4 py-1.5 mr-3"
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>
                            <div className="relative inline-block text-left ml-4">
                                <button
                                    onClick={handleDropdownClick}
                                    className=" bg-[#8E8E8E]/30 transition border-2 border-transparent rounded-xl text-sm text-[#000000]  px-4 py-1.5 mr-3"
                                >
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
                            {!notMyProfile && (
                                <>
                                    <h1 className="text-2xl font-semibold mb-4">{user.bio}</h1>
                                    <div className="text-blue-500">{user.website}</div>
                                </>
                            )}
                            {notMyProfile && dataAnyProfile?.Data && (
                                <>
                                    <h1 className="text-2xl font-semibold mb-4">{dataAnyProfile.Data.bio}</h1>
                                    <div className="text-blue-500">{dataAnyProfile.Data.website}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {!notMyProfile && (
                    <div>
                        <div className="border-t-[3px] border-gray-300 rounded-xl mt-5 mb-4"></div>
                        <div className="flex space-x-6 justify-center">
                            <div
                                className={`flex cursor-pointer items-center p-2 rounded-2xl ${
                                    activeTab === 'POSTS' ? 'bg-gray-400/30 text-black font-semibold' : ''
                                }`}
                                onClick={() => handleTabClick('POSTS')}
                            >
                                <div className={`w-8 h-8 ${activeTab === 'POSTS' ? 'bg-gray-400/0' : ''}`}>
                                    <AiOutlinePicture className="w-6 h-6 ml-1 mt-1" />
                                </div>
                                <h1 className="text-lg">POSTS</h1>
                            </div>
                            {user && (
                                <div
                                    className={`flex cursor-pointer items-center p-2 rounded-2xl ${
                                        activeTab === 'SAVED' ? 'bg-gray-400/30 text-black font-semibold' : ''
                                    }`}
                                    onClick={() => handleTabClick('SAVED')}
                                >
                                    <div
                                        className={`w-6 h-6 mr-1 rounded-full ${
                                            activeTab === 'SAVED' ? 'bg-gray-400/0' : ''
                                        }`}
                                    >
                                        <img src={bookmark} alt=""></img>
                                    </div>
                                    <h1 className="text-lg">SAVED</h1>
                                </div>
                            )}
                        </div>
                        {activeTab === 'POSTS' && dataPostProfile?.Data != undefined ? (
                            dataPostProfile?.Data.length > 0 ? (
                                <ProfilePosts user={user} />
                            ) : (
                                <div className="mt-[50px] flex flex-col items-center justify-center space-y-10">
                                    <img src={iconcamera} className="w-[100px] h-[100px]" alt="Camera Icon" />
                                    <h1 className="text-2xl font-bold">Share Photos</h1>
                                    <p className="text-center text-lg">
                                        When you share photos, they will appear on your profile
                                    </p>

                                    <span
                                        className="text-xl font-semibold cursor-pointer text-blue-500"
                                        onClick={() => openCreatePostModal(user.id)}
                                    >
                                        Share your first photos
                                    </span>
                                </div>
                            )
                        ) : checkSave ? (
                            <Saved />
                        ) : (
                            <div className="mt-[50px] flex flex-col items-center justify-center space-y-10">
                                <img src={iconcamera} className="w-[100px] h-[100px]" alt="Camera Icon" />
                                <h1 className="text-2xl font-bold">Save</h1>
                                <p className="text-center text-lg w-[480px] text-[19px]">
                                    Save photos and videos that you want to see again. No one is notified, and only you
                                    can see what you've saved.
                                </p>
                            </div>
                        )}
                    </div>
                )}
                {notMyProfile && (
                    <div>
                        <div className="border-t-[3px] border-gray-300 rounded-xl mt-5 mb-4"></div>
                        <div className="flex space-x-6 justify-center">
                            <div
                                className={`flex cursor-pointer items-center p-2 rounded-2xl ${
                                    activeTab === 'POSTS' ? 'bg-gray-400/30 text-black font-semibold' : ''
                                }`}
                                onClick={() => handleTabClick('POSTS')}
                            >
                                <div className={`w-8 h-8 ${activeTab === 'POSTS' ? 'bg-gray-400/0' : ''}`}>
                                    <AiOutlinePicture className="w-6 h-6 ml-1 mt-1" />
                                </div>
                                <h1 className="text-lg">POSTS</h1>
                            </div>
                        </div>
                        {dataAnyProfile?.Data != undefined &&
                        dataPostAnyProfile?.Data != undefined &&
                        dataPostAnyProfile.Data.length > 0 ? (
                            <ProfilePosts user={dataAnyProfile.Data} />
                        ) : (
                            <div className="mt-[50px] flex flex-col items-center justify-center space-y-10">
                                <h1 className="text-2xl font-bold">Empty...</h1>
                                <p className="text-center text-lg">This account has never posted anything</p>
                                <Link to={'/'}>
                                    <span className="text-xl font-semibold cursor-pointer text-blue-500">
                                        Go to home
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
