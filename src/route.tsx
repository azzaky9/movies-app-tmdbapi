import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Login from "@/pages/LoginPage";
import TvShowPage from "@/pages/TvShowPage";
import ErrorPage from "@/pages/404Page";
import ShowDetail from "@/components/ShowDetail";

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
          path='tv-show'
          element={<TvShowPage />}
        />
        <Route
          path='movies/:moviesId'
          element={<ShowDetail />}
        />
      </Route>
      <Route
        path='*'
        element={<ErrorPage />}
      />
    </>
  )
);
