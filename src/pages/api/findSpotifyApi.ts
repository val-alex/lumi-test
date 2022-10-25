import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@/constants";

export const fetchSpotifyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
  }),
  reducerPath: "fetchSpotifyApi",
  endpoints: (build) => ({
    getAccessToken: build.query({
      query: () => ({
        url: `https://accounts.spotify.com/api/token`,
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${ SPOTIFY_CLIENT_ID }&client_secret=${ SPOTIFY_CLIENT_SECRET }`
      })
    }),
    getArtistId: build.query({
      query: ({ search, accessToken }) => {
        return {
          url: `https://api.spotify.com/v1/search?q=${ search }&type=artist`,
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${ accessToken }`
          },
        }
      },
    }),
    getArtistAlbums: build.query({
      query: ({ artistId, accessToken }) => {
        {
          console.log('accessToken:', accessToken)
          console.log('artistId:', artistId)

          return {
            url: `https://api.spotify.com/v1/artists/${ artistId }/albums?include_groups=album&limit=50`,
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${ accessToken }`
            },
          }
        }
      },
    }),

  }),
});

export const { useGetAccessTokenQuery, useGetArtistIdQuery, useGetArtistAlbumsQuery } = fetchSpotifyApi;

export const { endpoints, reducerPath, reducer, middleware } = fetchSpotifyApi;