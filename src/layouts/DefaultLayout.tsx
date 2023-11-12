import React from 'react';
import { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import ActionBar from '../components/Sidebar/ActionBar/ActionBar';
import FriendBar from '../components/Sidebar/FriendBar/FriendBar';
import FixedBar from '../components/Sidebar/FixedBar/FixedBar';
import FollowModal from '../components/Modal/FollowModal/FollowModal';
import CreatePostModal from '../components/Modal/CreatePostModal/CreatePostModal';

type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    const [panel, setPanel] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onOpen = (index: number) => {
        setShow(true);
        setPanel(index);
    };

    const onClose = (index: number) => {
        console.log(panel + ' ' + index);

        if (panel === index || index === 100) {
            setShow(false);
            setPanel(0);
        } else {
            setPanel(index);
        }
    };

    return (
        <>
            <div className="flex min-h-screen ">
                <ActionBar onOpen={onOpen} />
                <FixedBar show={show} onClose={onClose} panel={panel} />
                <div className="mx-auto flex min-h-screen pt-6">
                    <div className="max-w-[630px] ">{children}</div>
                    <FriendBar />
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
