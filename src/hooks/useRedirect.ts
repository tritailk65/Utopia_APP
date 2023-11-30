import { useLocation, useNavigate } from 'react-router-dom';

const useRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const onRedirect = (path: string) => {
        if (location.pathname === path) {
            window.location.reload();
        } else {
            navigate(path);
        }
    };

    return { onRedirect };
};

export default useRedirect;
