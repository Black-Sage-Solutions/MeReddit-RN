import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Scopes = any

export const noauthApi = createApi({
  reducerPath: 'noauthApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.reddit.com/api/'}),
  endpoints: (builder) => ({
    getScopes: builder.query<Scopes, void>({
      query: () => 'v1/scopes',
    })
  }),
})

export const { useGetScopesQuery } = noauthApi
