import React from 'react';

interface Image64Props {
    byte: string;
    alt: string;
    className: string;
}

function Image64(props: Image64Props) {
    const { byte, alt, className } = props;
    return <img src={`data:image/jpeg;base64,${byte}`} alt={alt} className={className} />;
}

export default Image64;
