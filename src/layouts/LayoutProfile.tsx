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
            <div className="ml-[400px] flex pt-6">
            <div className="max-w-[630px] ">{children}</div>
            </div>
        </div>
    );
};

export default LayoutProfile;
