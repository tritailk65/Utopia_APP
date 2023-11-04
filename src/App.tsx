import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PublicRoutes } from './routers/PublicRoutes';
import { PrivateRoutes } from './routers/PrivateRoutes';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';
import Auth from './routers/ProtectRoutes';

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
            </GlobalStyles>
        </Router>
    );
}

export default App;
