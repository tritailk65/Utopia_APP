import React from 'react';
import arrow from '../../../../assets/image/Arrow_left.png';
import avt from '../../../../assets/image/avt2.png';
import FollowRequestItem from './FollowRequestItem';

export interface FollowRequestPanelProps {
    onClose: (index: number) => void;
}

function FollowRequestPanel(props: FollowRequestPanelProps) {
    const { onClose } = props;

    return (
        <div>
            {/* Header section */}
            <div className="flex flex-wrap text-center">
                <button className="flex space-x-2 w-1/4 mt-2">
                    <img src={arrow} alt="icon2" className="w-6 h-6 ml-4" onClick={() => onClose(2)} />
                </button>
                <h1 className="ml-2 text-2xl font-semibold mb-7 max-w-xl">Follow Request</h1>
            </div>

            {/* Item section */}
            <div className="overflow-auto max-h-screen">
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
                <FollowRequestItem />
            </div>

            {/* Dialog confirm */}

            {/* <ConfirmDialog
                show={dialog}
                confirmText="Unfollower"
                cancelText="Cancel"
                title="abc"
                onCancel={onClose}
                onClose={onClose}
                onConfirm={onConfirm}
            >
                <div className="flex flex-col justify-center">
                    <img src={avt} alt="avatar" className="circle w-44 h-44" />

                    <p>If you change your mind, you'll have to request to follow @sooyaa again</p>
                </div>
            </ConfirmDialog> */}
        </div>
    );
}

export default FollowRequestPanel;
