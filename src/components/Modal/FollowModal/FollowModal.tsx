import useFollowModal from '../../../hooks/useFollowModal';
import ModalContainer from '../ModalContainer/ModalContainer';
import FollowItem from './FollowItem/FollowItem';

function FollowModal() {
    const { followModalState, closeFollowModal } = useFollowModal();
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
                        />
                    </div>
                    <div className="max-h-[456px] overflow-y-scroll mx-5">
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                        <FollowItem />
                    </div>
                </div>
            </ModalContainer>
        </>
    );
}

export default FollowModal;
