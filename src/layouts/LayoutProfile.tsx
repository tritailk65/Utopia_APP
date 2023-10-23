import React from 'react';
import { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import ActionBar from '../components/Sidebar/ActionBar/ActionBar';
import FixedBar from '../components/Sidebar/FixedBar/FixedBar';
import FollowModal from '../components/Modal/FollowModal/FollowModal';

type LayoutProfileProps = {
    children: ReactNode;
};

const LayoutProfile: React.FC<LayoutProfileProps> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    const [follow, setFollow] = useState<boolean>(false);
    const [panel, setPanel] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onOpen = (index: number) => {
        setShow(true);
        setPanel(index);
    };

    const onClose = (index: number) => {
        if (panel === index) {
            setShow(false);
            setPanel(0);
        } else if (index === 4) {
            setShow(false);
            setPanel(0);
            setFollow(true);
        } else {
            console.log('condition 3');
            setPanel(index);
        }
    };
    return (
        <>
            <div className="flex min-h-screen ">
                <ActionBar onOpen={onOpen} />
                <FixedBar show={show} onClose={onClose} panel={panel} />
                <div className="mx-auto flex min-h-screen pt-6 pr-[300px]">
                    <div className="max-w-[630px] ">{children}</div>
                </div>
            </div>
            <FollowModal show={follow} onClose={() => setFollow(false)} />
        </>
    );
};

export default LayoutProfile;
