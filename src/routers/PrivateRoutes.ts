import { ComponentType } from 'react';

// ========== import page =============
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import EditProfile from '../pages/EditProfile/EditProfile';

// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout';
import LayoutProfile from '../layouts/LayoutProfile';
import SuggestFollowAll from '../pages/SuggestFollowAll/SuggestFollowAll';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PrivateRoutes: Route[] = [
    { path: '/', page: Home, layout: DefaultLayout },
    { path: '/profile/:id', page: Profile, layout: LayoutProfile },
    { path: '/profile/edit', page: EditProfile, layout: LayoutProfile },
    { path: '/suggest-follow', page: SuggestFollowAll, layout: LayoutProfile },
];
