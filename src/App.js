import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { layoutTypes } from "./constants/layout";
import { authProtectedRoutes, publicRoutes } from "./routes";
import Authmiddleware from "./routes/route";
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import "./assets/scss/theme.scss";

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

function clearStorage() {
  let session = sessionStorage.getItem('register');

  if (session == null) {
    sessionStorage.clear();

  }
  sessionStorage.setItem('register', 1);
}
window.addEventListener('load', clearStorage);

const App = () => {

  const { layoutType, isLoading } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    isLoading: state.isLoading,
  }));

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;