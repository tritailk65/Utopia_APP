import React from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';
import ActionBar from '../components/Sidebar/ActionBar/ActionBar';

type LayoutProfile = {
    children: ReactNode;
};

const LayoutProfile: React.FC<LayoutProfile> = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex min-h-screen ">
            <ActionBar />
            <div className="mx-auto flex min-h-screen pt-6 pr-[300px]">
            <div className="max-w-[630px] ">{children}</div>
            </div>
        </div>
    );
};

export default LayoutProfile;
