import { useEffect, useState } from 'react';
import useFollowModal from '../../../hooks/useFollowModal';
import useGetUserInfo from '../../../hooks/useGetUserInfo';
import { UserInfo } from '../../../types/user-type';
import ModalContainer from '../ModalContainer/ModalContainer';
import FollowItem from './FollowItem/FollowItem';
import { getAllFollowing } from '../../../services/follow-service';
import { FollowingReponse } from '../../../types/following-type';
import useDebounce from '../../../hooks/useDebounce';

const FollowModal = () => {
    const { followModalState, closeFollowModal } = useFollowModal();
    const [input, setInput] = useState<string>('');
    const [listUserFollow, setListUserFollow] = useState<FollowingReponse[]>();
    const delayDebounce = useDebounce(input, 1000);

    useEffect(() => {
        try {
            getAllFollowing().then((res) => {
                if (res != undefined) {
                    const filteredResults = res.Data.filter((_: FollowingReponse) => {
                        return _.user.userName.toLowerCase().includes(input.toLowerCase());
                    });
                    setListUserFollow(filteredResults);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, [delayDebounce]);

    const handleChange = (value: string) => {
        setInput(value);
    };

    return (
        <>
            <ModalContainer show={followModalState.show} onClose={() => closeFollowModal()} width="medium" full>
                <div className=" min-h-[400px] flex flex-col w-full">
                    <div className="border-b-4 border-gray-300 h-12 flex items-center justify-center w-full">
                        <h1 className="font-semibold text-lg">Following</h1>
                    </div>
                    <div className="border-2 border-transparent rounded-lg mx-7  mt-4 mb-6 bg-gray-200 group">
                        <input
                            className="w-full bg-transparent px-4 py-1 text-lg outline-none"
                            placeholder="Search ..."
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div className="max-h-[456px] overflow-y-scroll mx-5">
                        {listUserFollow?.map((_, index) => (
                            <FollowItem key={index} followingItem={_} />
                        ))}
                    </div>
                </div>
            </ModalContainer>
        </>
    );
};

export default FollowModal;
