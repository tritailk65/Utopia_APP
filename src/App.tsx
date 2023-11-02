import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routers/PublicRoutes';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';
import FollowModal from './components/Modal/FollowModal/FollowModal';
import CreatePostModal from './components/Modal/CreatePostModal/CreatePostModal';
import PostCommentModal from './components/Modal/PostCommentModal/PostCommentModal';

function App() {
    return (
        <Router>
            <GlobalStyles>
                <div className={'App'}>
                    <Routes>
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
