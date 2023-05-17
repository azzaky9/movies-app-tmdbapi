import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TvShowPage from "./pages/TvShowPage";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='login'
        element={<Login />}
      />
      <Route
        path='/'
        element={<Layout />}>
        <Route
          index
          path='home'
          element={<HomePage />}
        />
        <Route
          path='tv-show'
          element={<TvShowPage />}
        />
        <Route />
      </Route>
    </>
  )
);
