import { combineReducers } from "@reduxjs/toolkit";

import { fetchSpotifyApi } from "../../pages/api/findSpotifyApi";
import resultsSlice from "./resultsSlice";

export const rootReducer = combineReducers( {
  results: resultsSlice,
  [ fetchSpotifyApi.reducerPath ]: fetchSpotifyApi.reducer,
} );

export type RootState = ReturnType<typeof rootReducer>;
