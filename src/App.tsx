import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routers/PublicRoutes';
import { PrivateRoutes } from './routers/PrivateRoutes';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';
import FollowModal from './components/Modal/FollowModal/FollowModal';
import CreatePostModal from './components/Modal/CreatePostModal/CreatePostModal';
import PostCommentModal from './components/Modal/PostCommentModal/PostCommentModal';
import Auth from './routers/ProtectRoutes';
import EditPostModal from './components/Modal/EditPostModal/EditPostModal';

function App() {
    return (
        <Router>
            <GlobalStyles>
                <div className={'App'}>
                    <Routes>
                        {PrivateRoutes.map((value, index) => {
                            const Page = value.page;
                            const Layout = value.layout;
                            return (
                                <Route element={<Auth />} key="key">
                                    <Route
                                        path={value.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                        key={value.path}
                                    />
                                </Route>
                            );
                        })}
                        {PublicRoutes.map((value, index) => {
                            const Page = value.page;
                            const Layout = value.layout;
                            return (
                                <Route
                                    path={value.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                    key={value.path}
                                />
                            );
                        })}
                    </Routes>
                </div>
                <FollowModal />
                <CreatePostModal />
                <PostCommentModal />
            </GlobalStyles>
        </Router>
    );
}

export default App;
