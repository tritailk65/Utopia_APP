import React from 'react'
import { ReactNode } from 'react';
import { useEffect } from 'react';
type ContentOnlyLayoutProps = {
    children: ReactNode;
};

const ContentOnlyLayout: React.FC<ContentOnlyLayoutProps> = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default ContentOnlyLayout