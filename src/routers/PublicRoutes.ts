import { ComponentType } from 'react';

// ========== import page =============
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword';
import Profile from '../pages/Profile/Profile';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout';
import ContentOnlyLayout from '../layouts/ContentOnlyLayout';
import LayoutProfile from '../layouts/LayoutProfile';


type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PublicRoutes: Route[] = [
    { path: '/', page: Home, layout: DefaultLayout },
    { path: '/login', page: Login, layout: ContentOnlyLayout },
    { path: '/register', page: Register, layout: ContentOnlyLayout },
    { path: '/forget-password', page: ForgetPassword, layout: ContentOnlyLayout },
    { path: '/profile', page: Profile, layout:  LayoutProfile}
];
