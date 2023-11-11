import { Navigate, Outlet } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';

const Auth = () => {
    const user = useGetUserInfo();

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
