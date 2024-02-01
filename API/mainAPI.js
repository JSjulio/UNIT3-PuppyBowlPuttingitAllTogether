import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry point

export const mainApi = createApi({
  reducerPath: "mainApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/",
  }),
  // Define a base query function that all endpoints will use as the base of their request
  // The base URL for all requests

  endpoints: (builder) => ({
    fetchPlayers: builder.query({
      query: () => "players",
      // This function defines an endpoint and fetches all players
    }),

    createPlayer: builder.mutation({
      query: (name, breed, status, imageUrl) => ({
        url: "players/",
        method: "POST",
        body: name,
        breed,
        status,
        imageUrl,
      }),
    }),

    //retrieve a single player
    fetchPlayerId: builder.query({
      query: (playerId) => ({
        url: `player/${playerId}`,
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    //     This function defines an endpoint to create a new player
    // }),
    // deletePlayer: builder.mutation({
    //     query: (playerId) => ({
    //         url: `players/${playerId}`,
    //         method: 'DELETE',
    //     }),
    //      This function defines an endpoint to delete a player
    // }),
  }),
});

export const {
  useFetchPlayersQuery,
  useCreatePlayerMutation,
  useFetchPlayerIdQuery,
} = mainApi;
