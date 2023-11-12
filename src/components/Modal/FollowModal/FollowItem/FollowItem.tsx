import avt from '../../../../assets/image/avt2.png';
import { Unfollowing } from '../../../../services/following-service';
import { getAvatarUser, getNameUser } from '../../../../services/user-service';
import { FollowingPostForViewer, UserPostForViewer } from '../../../../types/post-type';
import ConfirmDialog from '../../../Dialog/ConfirmDialog/ConfirmDialog';
import { useEffect, useState } from 'react';

type SearchItemProps = {
    user: UserPostForViewer;
    setShouldReloadFollowing: React.Dispatch<React.SetStateAction<boolean>>;
};

function FollowItem({ user, setShouldReloadFollowing }: SearchItemProps) {
    const [dialog, setDialog] = useState<boolean>(false);
    //const [deleteItem, setDeleteItem] = useState<number[]>([]);

    const onConfirm = async () => {
        try{
            const response = await Unfollowing(user.id);
            if (response) {
                // Nếu unfollow thành công, gọi hàm setShouldReloadFollowing để đặt shouldReloadFollowing thành true
                setShouldReloadFollowing(true);
            }
            setDialog(false);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const onClose = () => {
        setDialog(false);
    };

    const handleClick = () => {
        alert(`User ID: ${user.id}, User name: ${user.userName}, Image Source: ${user.avatarPath}`);
    };

    const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await getAvatarUser(user.id);
                const blob = new Blob([response], { type: 'image/png' }); 
                blobToBase64(blob, (base64Data) => {
                    setAvatarBase64(base64Data);
                });
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        };

        

        if (user.id) {
            fetchAvatar();
  
        }
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
        <>
            <div className="text-base flex mb-5 mr-4" onClick={handleClick}>
                <div className="flex-1 w-1/6 ">
                    <img src={`data:image/png;base64,${avatarBase64}`} alt="avatar" className="circle w-14 h-14 " />
                </div>
                <div className="flex-4 w-4/6 text-left pl-4">
                    <h3 className="font-semibold cursor-pointer text-lg">{user.userName}</h3>
                    <p className="text-gray-500">24.8M Followers</p>
                </div>
                <div className="flex-1 w-1/6 flex flex-row-reverse items-center cursor-pointer font-semibold ">
                    <button
                        onClick={() => setDialog(true)}
                        className=" bg-gray-300 px-5 border-2 border-transparent rounded-2xl text-sm text-gray-600 hover:opacity-90 hover:text-black py-2"
                    >
                        Following
                    </button>
                </div>
            </div>
            <ConfirmDialog
                show={dialog}
                confirmText="Unfollower"
                cancelText="Cancel"
                title="abc"
                onCancel={onClose}
                onClose={onClose}
                onConfirm={onConfirm}
            >
                <div className="flex flex-col items-center justify-center">
                    <img src={`data:image/png;base64,${avatarBase64}`} alt="avatar" className="circle w-44 h-44 mb-4" />

                    <p>If you change your mind, you'll have to request to follow{' '}
                    <span className="font-bold">{user.userName}</span> again</p>
                </div>
            </ConfirmDialog>
        </>
    );
}

export default FollowItem;
