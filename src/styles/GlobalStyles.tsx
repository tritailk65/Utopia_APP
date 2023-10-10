import React, { ReactNode, Fragment } from 'react';
import './GlobalStyles.css';

type GlobalStylesProps = {
    children: ReactNode;
};
const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};
export default GlobalStyles;
