import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routers/PublicRoutes';
import { PrivateRoutes } from './routers/PrivateRoutes';
import GlobalStyles from './styles/GlobalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FollowModal from './components/Modal/FollowModal/FollowModal';
import CreatePostModal from './components/Modal/CreatePostModal/CreatePostModal';
import PostCommentModal from './components/Modal/PostCommentModal/PostCommentModal';
import Auth from './routers/ProtectRoutes';
import EditPostModal from './components/Modal/EditPostModal/EditPostModal';
import useGetUserInfo from './hooks/useGetUserInfo';
import { useEffect } from 'react';

function App() {
    const user = useGetUserInfo();

    const showToast = (message: string) => {
        toast.info(message, {
            position: 'bottom-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    useEffect(() => {
        const connectSSE = () => {
            try {
                const eventSource = new EventSource(`http://localhost:8080/api/SSE/${user.id}/callNotification`);

                eventSource.onmessage = (event) => {
                    console.log('Received message from server:', event.data);
                    if (event.data.includes('message')) showToast(event.data);
                };

                eventSource.onerror = (error) => {
                    console.error('EventSource failed:', error);
                    eventSource.close();
                    reconnectSSE();
                };

                return () => {
                    eventSource.close();
                };
            } catch (ex) {
                console.log(ex);
            }
        };

        const reconnectSSE = () => {
            connectSSE();
        };

        if (user != null) {
            connectSSE();
        }
    }, [user]);

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
                <ToastContainer />
                <FollowModal />
                <CreatePostModal />
                <PostCommentModal />
            </GlobalStyles>
        </Router>
    );
}

export default App;
