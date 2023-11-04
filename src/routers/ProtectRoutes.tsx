import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = (props: any) => {
    var user = null;

    if (localStorage['userData']) {
        user = JSON.parse(localStorage['userData']);
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
