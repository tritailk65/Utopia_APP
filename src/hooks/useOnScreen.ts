import { RefObject, useEffect, useState } from 'react';

function useOnScreen(ref: RefObject<Element>) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    useEffect(() => {
        console.log(ref.current);
        if (ref.current) {
            observer.observe(ref.current);
        }
        // // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);

    return isIntersecting;
}

export default useOnScreen;
