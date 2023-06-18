import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Login from "@/pages/LoginPage";
import TvShowPage from "@/pages/TvShowPage";
import ErrorPage from "@/pages/404Page";
import ShowDetail from "@/components/ShowDetail";
import SignUpPage from "@/pages/SignUpPage";
import Logout from "@/components/Logout";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='sign-in'
        element={<Login />}
      />
      <Route
        path='sign-up'
        element={<SignUpPage />}
      />
      <Route
        path='/'
        element={<Layout />}>
        <Route
          path='tv-show'
          element={<TvShowPage />}
        />
        <Route
          path='movies/:moviesId'
          element={<ShowDetail />}
        />
        <Route
          path='logout'
          element={<Logout />}
        />
      </Route>
      <Route
        path='*'
        element={<ErrorPage />}
      />
    </>
  )
);
