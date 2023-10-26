// import avt from '../../../../assets/image/avt2.png';

// function SearchItem() {
//     return (
//         <div className="cursor-pointer hover:bg-gray-200 px-2 h-16 flex items-center mb-3">
//             <div className="mr-2">
//                 <img src={avt} alt="avt" className="w-14 h-14 circle" />
//             </div>
// <div className="">
//     <h1 className="font-semibold text-lg">sooyaa__</h1>
//     <div className="text-gray-500 text-base">
//         <span className="mr-1">Jisoo Blackpink</span>
//         <span className="mr-1">-</span>
//         <span className="">408k followers</span>
//     </div>
// </div>
//         </div>
//     );
// }

// export default SearchItem;

import React, { useEffect, useState } from 'react';

type SearchItemProps = {
    user: {
        id: number;
        userName: string;
        avatarPath: string;
        follower: string;
    };
};

function SearchItem({ user }: SearchItemProps) {
    const handleClick = () => {
        alert(`User ID: ${user.id}, User name: ${user.userName}, Image Source: ${user.avatarPath}`);
    };

    const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the image blob data from the server
        fetch(`http://localhost:8080/api/User/Avatar/${user.id}`)
            .then((response) => response.blob())
            .then((blob) => {
                blobToBase64(blob, (base64Data) => {
                    setAvatarBase64(base64Data);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user.id]);

    function blobToBase64(blob: Blob, callback: (base64Data: string) => void) {
        const reader = new FileReader();
        reader.onload = function () {
            const dataUrl = reader.result as string;
            const base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    }

    return (
        <div className="cursor-pointer hover:bg-gray-200 px-2 h-16 flex items-center mb-3" onClick={handleClick}>
            {avatarBase64 && (
                <div className="mr-2">
                    <img src={`data:image/png;base64,${avatarBase64}`} alt="avt" className="w-14 h-14 rounded-full" />
                </div>
            )}
            <div className="">
                <h1 className="font-semibold text-lg">{user.userName}</h1>
                <div className="text-gray-500 text-base">
                    <span className="mr-1">{user.follower}</span>
                    <span className="mr-1">-</span>
                    <span className="">408k followers</span>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
