import React from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';
import ActionBar from '../components/Sidebar/ActionBar/ActionBar';
import FriendBar from '../components/Sidebar/FriendBar/FriendBar';

type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex min-h-screen ">
            <ActionBar />
            <div className="mx-auto flex min-h-screen pt-6">
                <div className="max-w-[630px] ">{children}</div>
                <FriendBar />
            </div>
        </div>
    );
};

export default DefaultLayout;
