import { ComponentType } from 'react';

// ========== import page =============
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword';

// ========== import layout =============

import ContentOnlyLayout from '../layouts/ContentOnlyLayout';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PublicRoutes: Route[] = [
    { path: '/login', page: Login, layout: ContentOnlyLayout },
    { path: '/register', page: Register, layout: ContentOnlyLayout },
    { path: '/forget-password', page: ForgetPassword, layout: ContentOnlyLayout },
];
