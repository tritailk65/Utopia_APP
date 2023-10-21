import React from 'react';
import { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import ActionBar from '../components/Sidebar/ActionBar/ActionBar';
import FriendBar from '../components/Sidebar/FriendBar/FriendBar';
import SearchBar from '../components/Sidebar/SearchBar/SearchBar';

type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex min-h-screen ">
            <ActionBar onOpen={() => setShow(true)} />
            <SearchBar show={show} onClose={() => setShow(false)} />
            <div className="mx-auto flex min-h-screen pt-6">
                <div className="max-w-[630px] ">{children}</div>
                <FriendBar />
            </div>
        </div>
    );
};

export default DefaultLayout;
