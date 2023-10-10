import React from 'react'
import { ReactNode } from 'react';
import { useEffect } from 'react';
type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default DefaultLayout