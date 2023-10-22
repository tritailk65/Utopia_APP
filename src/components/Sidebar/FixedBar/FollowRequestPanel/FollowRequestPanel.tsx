import React from 'react';

export interface FollowRequestPanelProps {
    onClose: (index: number) => void;
}

function FollowRequestPanel(props: FollowRequestPanelProps) {
    const { onClose } = props;

    return (
        <div>
            <button onClick={() => onClose(2)}>Quay lại notification panel</button>
            <h1 className="ml-2 text-3xl font-semibold mb-7 px-3">Follow Request</h1>
        </div>
    );
}

export default FollowRequestPanel;
