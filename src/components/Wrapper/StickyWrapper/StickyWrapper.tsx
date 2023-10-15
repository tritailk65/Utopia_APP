import React from 'react';
import { ReactNode } from 'react';

type StickyWrapperProps = {
    children: ReactNode;
    left?: number | null;
    right?: number | null;
    top?: number | null;
    bottom?: number | null;
    shadow?: boolean | null;
    maxWidth?: number | null;
    paddingLeft?: number | null;
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
    const getStickyClass = () => {
        const classes = ['sticky'];

        if (left !== null) {
            classes.push(`left-${left}`);
        }

        if (right !== null) {
            classes.push(`right-${right}`);
        }

        if (top !== null) {
            classes.push(`top-${top}`);
        }

        if (bottom !== null) {
            classes.push(`bottom-${bottom}`);
        }

        return classes.join(' ');
    };

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
            <div className={getStickyClass()}>{children}</div>
        </div>
    );
};

export default StickyWrapper;
