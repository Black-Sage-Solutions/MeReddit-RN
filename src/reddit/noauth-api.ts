/**
 * TODO:
 * - some reason it's doing a bunch of stuff subscribe unsubscribe rejection dispatchs,
 * what would be the best way to cache the Scope list data?
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const noauthApi = createApi({
  reducerPath: 'noauthApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.reddit.com'}),
  endpoints: (builder) => ({
    getScopes: builder.query<ScopeData[], void>({
      query: () => '/api/v1/scopes',
      transformResponse: (response: Scopes) => {
        return Object.values(response)
      },
    }),
    getFrontpage: builder.query<any, void>({
      query: () => '/',
    }),
    getSubreddit: builder.query<any, string>({  // TODO, figure out query params
      query: (subreddit) => `/r/${subreddit}`
    }),
  }),
})

export const { useGetFrontpageQuery, useGetScopesQuery } = noauthApi
