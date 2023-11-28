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
import { useEffect, useState } from 'react';
import { Message } from './types/message-type';
import useNotification from './hooks/useNotification';

function App() {
    const user = useGetUserInfo();
    const { addMoreNotification } = useNotification();
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
        let eventSource: EventSource | null = null;

        const connectSSE = () => {
            try {
                // Đóng kết nối cũ trước khi mở kết nối mới
                if (eventSource) {
                    eventSource.close();
                }

                eventSource = new EventSource(`http://localhost:8080/api/SSE/${user.id}/callNotification`);

                eventSource.onmessage = (event) => {
                    console.log('Received message from server:', event.data);
                    if (event.data.includes('content')) {
                        const data: Message = JSON.parse(event.data) as Message;
                        addMoreNotification(data);
                        if (data.isAlert === true) {
                            showToast(data.content);
                        }
                    }
                };

                eventSource.onerror = (error) => {
                    console.error('EventSource failed:', error);
                    // Kiểm tra trước khi đóng kết nối
                    if (eventSource) {
                        eventSource.close();
                    }
                    reconnectSSE();
                };

                return () => {
                    if (eventSource) {
                        eventSource.close();
                    }
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

        // Clean up function
        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
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
