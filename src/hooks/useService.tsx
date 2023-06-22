import { useState } from "react";
import axios, { AxiosError } from "axios";
import { DetailSourceMovies } from "./useMovies";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const useService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { value } = useContext(AuthContext);
  const { currentUser, sessionId } = value;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const endpoint = `https://api.themoviedb.org/3/account/${
    currentUser?.id
  }/watchlist/movies?api_key=${import.meta.env.VITE_API_KEY}&session_id=${sessionId}`;

  const action = (snackbarId) => (
    <>
      <button
        className='px-3 mx-1 py-2 rounded-md bg-input-only bg-opacity-0 duration-300 hover:bg-opacity-25 text-blue-600 font-semibold uppercase'
        onClick={() => navigate("/sign-in")}>
        Log in
      </button>
      <button
        className='px-3  py-2 rounded-md bg-input-only bg-opacity-0 duration-300 hover:bg-opacity-25 text-error font-semibold uppercase'
        onClick={() => closeSnackbar()}>
        Dismiss
      </button>
    </>
  );

  const fetchSourceUserHave = async () => {
    setIsLoading(true);

    const { data }: { data: { results: DetailSourceMovies[] } } = await axios.get(endpoint);

    setIsLoading(false);

    return data.results;
  };

  const postWatchList = async (id: number) => {
    const config = {
      method: "POST",
      url: `https://api.themoviedb.org/3/account/${currentUser?.id}/watchlist?api_key=${
        import.meta.env.VITE_API_KEY
      }&session_id=${sessionId}`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: { media_type: "movie", media_id: id, watchlist: true },
    };

    try {
      await axios.request(config);

      enqueueSnackbar("Successfully added", { variant: "success" });
    } catch (error) {
      if (error instanceof AxiosError) {
        const response: { status_message: string } = error.response?.data;
        enqueueSnackbar(response.status_message, { action });
      }
    }
  };

  return { postWatchList, isLoading, fetchSourceUserHave };
};
