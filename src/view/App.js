import React, { Fragment, useEffect } from "react";
import { routes } from "../routes";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultComponentFooter from "../components/DefaultComponent/DefaultComponentFooter";
import DefaultComponentHeader from "../components/DefaultComponent/DefaultComponentHeader";

function App() {
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {};

  return (
    <div>
      <Router>
        <Routes>
        {routes.map((route) => {
            const Page = route.page;
            const HeaderLayout = route.isShowHeader
              ? DefaultComponentHeader
              : Fragment;
            const FooterLayout = route.isShowFooter
              ? DefaultComponentFooter
              : Fragment; 
            return (
              <Route
                path={route.path}
                element={
                  <HeaderLayout>
                    <FooterLayout>
                      <Page />
                    </FooterLayout>
                  </HeaderLayout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
