import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Login from "@/pages/LoginPage";
import TvShowPage from "@/pages/TvShowPage";
import ErrorPage from "@/pages/404Page";
import { Logout } from "@/components/common/utils/index";
import ShowDetail from "@/components/pagesComponent/ShowDetail";
import WatchListPage from "./pages/WatchListPage";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='sign-in'
        element={<Login />}
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
        <Route
          path='watchlist'
          element={<WatchListPage />}
        />
        <Route path='movie/all' />
      </Route>
      <Route
        path='*'
        element={<ErrorPage />}
      />
    </>
  )
);
