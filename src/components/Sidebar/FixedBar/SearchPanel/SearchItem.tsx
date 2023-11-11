import React, { useEffect, useState } from 'react';
import { getAvatar } from '../../../../services/user-service';
import { UserPostForViewer } from '../../../../types/post-type';
import { backend_utils as backend } from '../../../../utils/api-utils';

type SearchItemProps = {
    user: UserPostForViewer;
};

function SearchItem({ user }: SearchItemProps) {
    const handleClick = () => {
        alert(`User ID: ${user.id}, User name: ${user.userName}, Image Source: ${user.avatarPath}`);
    };

    // const [avatar, setAvatar] = useState<string>();

    // useEffect(() => {
    //     const fetchAvatar = async () => {
    //         const response = await getAvatar(user.id);
    //         if (response) {
    //             setAvatar(response);
    //         }
    //     };

    //     if (user.id) {
    //         fetchAvatar();
    //     }
    // }, [user.id]);

    return (
        <div className="cursor-pointer hover:bg-gray-200 px-2 h-16 flex items-center mb-3" onClick={handleClick}>
            <div className="mr-2">
                <img src={backend.imagePath + user.avatarPath} alt="avt" className="w-14 h-14 rounded-full" />
            </div>

            <div className="">
                <h1 className="font-semibold text-lg">{user.userName}</h1>
                <div className="text-gray-500 text-base">
                    {/* <span className="mr-1">{user.id}</span>
                    <span className="mr-1">-</span> */}
                    <span className="">408k followers</span>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
