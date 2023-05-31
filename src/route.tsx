import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/LoginPage";
import TvShowPage from "./pages/TvShowPage";
import HomePage from "./pages/HomePage";

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
          path='homepage'
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
