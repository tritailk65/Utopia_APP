import React from 'react';

export interface NotificationPanelProps {
    onClose: (index: number) => void;
}

function NotificationPanel(props: NotificationPanelProps) {
    const { onClose } = props;
    return (
        <div>
            <button onClick={() => onClose(3)}>Chuyển sang follow request panel</button>
            <h1 className="ml-2 text-3xl font-semibold mb-7 px-3">Notifications</h1>
        </div>
    );
}

export default NotificationPanel;
