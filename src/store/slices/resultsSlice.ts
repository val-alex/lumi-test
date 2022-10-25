import { fetchSpotifyApi } from "@/pages/api/findSpotifyApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./rootReducer";

interface ResultsState {
  status: "idle" | "loading" | "complete";
  searchInput: string;
  recentSearches: string[];
  resultsList: Array<Object>;
  accessToken: string;
  artist: any;
  artistId: any;
  artistAvatar: any;
  artistAlbums: any;
}

const initialState: ResultsState = {
  status: "idle",
  searchInput: "",
  recentSearches: [],
  resultsList: [],
  accessToken: '',
  artist: null,
  artistId: {},
  artistAlbums: {},
};

export const recipesSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setSearchInput: (state, { payload }: PayloadAction<string>) => {
      state.searchInput = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        fetchSpotifyApi.endpoints.getAccessToken.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.access_token;
        }
      ),
      builder
        .addMatcher(
          fetchSpotifyApi.endpoints.getArtistId.matchFulfilled,
          (state, { payload }) => {
            state.artist = payload?.artists;
            state.artistId = payload?.artists?.items[ 0 ]?.id;
            state.artistAvatar = payload?.artists?.items[ 0 ]?.images[ 2 ]?.url;
          }
        ),
      builder
        .addMatcher(
          fetchSpotifyApi.endpoints.getArtistAlbums.matchFulfilled,
          (state, { payload }) => {
            state.artistAlbums = payload;
          }
        )
  },
});

export const { setSearchInput } = recipesSlice.actions;





export const selectResultsFetchStatus = (state: RootState) =>
  state.results.status;
export const selectSearchInput = (state: RootState) =>
  state.results.searchInput;
export const selectRecentSearches = (state: RootState) =>
  state.results.recentSearches;
export const selectResultsList = (state: RootState) =>
  state.results.recipesList;
export const selectAccessToken = (state: RootState) =>
  state.results.accessToken;
export const selectArtistId = (state: RootState) =>
  state.results.artistId;
export const selectArtistAvatar = (state: RootState) =>
  state.results.artistAvatar;
export const selectArtistAlbums = (state: RootState) =>
  state.results.artistAlbums;


export default recipesSlice.reducer;
