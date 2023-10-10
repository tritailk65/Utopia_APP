import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routers/PublicRoutes';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';

function App() {
  return (
    <Router>
      <GlobalStyles>
        <div className={"App"}>
          <Routes>
            {PublicRoutes.map((value,index)=>{
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
