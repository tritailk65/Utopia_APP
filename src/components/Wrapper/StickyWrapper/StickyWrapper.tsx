import React from 'react';
import { ReactNode } from 'react';

type StickyWrapperProps = {
    children: ReactNode;
    left?: number | undefined;
    right?: number | undefined;
    top?: number | undefined;
    bottom?: number | undefined;
    shadow?: boolean | undefined;
    maxWidth?: number | undefined;
    paddingLeft?: number | undefined;
};

const StickyWrapper: React.FC<StickyWrapperProps> = ({
    children,
    left,
    right,
    top,
    bottom,
    shadow,
    maxWidth,
    paddingLeft,
}) => {
    const getWrapperClass = () => {
        const Wrapper = [`mr-2 min-h-screen shrink-0 z-10`];
        if (shadow) {
            Wrapper.push('shadow-xl');
        }
        if (paddingLeft != null) {
            Wrapper.push(`pl-${paddingLeft}`);
        }
        if (maxWidth != null) {
            Wrapper.push(`max-w-[${maxWidth}px]`);
        } else {
            Wrapper.push(`max-w-[270px]`);
        }
        return Wrapper.join(' ');
    };

    return (
        <div className={getWrapperClass()}>
            <div
                className={`sticky ${top !== undefined && 'absolute top-' + top} ${
                    bottom !== undefined && 'absolute bottom-' + bottom
                } ${left !== undefined && 'absolute left-' + left} ${
                    right !== undefined && 'absolute right-' + right
                } `}
            >
                {children}
            </div>
        </div>
    );
};

export default StickyWrapper;
