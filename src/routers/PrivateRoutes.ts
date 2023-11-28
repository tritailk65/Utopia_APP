import { ComponentType } from 'react';

// ========== import page =============
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import EditProfile from '../pages/EditProfile/EditProfile';

// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout';
import LayoutProfile from '../layouts/LayoutProfile';
import SeeAllSuggest from '../pages/SeeAllSuggest/SeeAllSuggest';
import DetailPost from '../pages/DetailPost/DetailPost';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PrivateRoutes: Route[] = [
    { path: '/', page: Home, layout: DefaultLayout },
    { path: '/post/:id', page: DetailPost, layout: DefaultLayout },
    { path: '/profile/:username', page: Profile, layout: LayoutProfile },
    { path: '/profile/edit', page: EditProfile, layout: LayoutProfile },
    { path: '/see-all-suggest', page: SeeAllSuggest, layout: LayoutProfile },
];
