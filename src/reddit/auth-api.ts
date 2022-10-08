/**
 * 
 */

import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { env } from '../../app.json'

import { RootState } from '@app/store'

/**
 * [prepareHeaders description]
 * @param  {Headers}               headers       [description]
 * @param  {Pick<BaseQueryApi, 'getState'>} {getState}  [description]
 * @return {Headers}                             [description]
 */
function prepareHeaders(headers: Headers, {getState}: Pick<BaseQueryApi, 'getState'>): Headers {
  const {accessToken, tokenType} = (getState() as RootState).oauth
  headers.set('Authorization', `${tokenType} ${accessToken}`)
  return headers
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.reddit.apiOauthUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getFrontpage: builder.query<any, void>({
      query: () => '/.json'
    }),
    getMe: builder.query({
      query: () => '/api/v1/me'
    }),
    getSubreddit: builder.query<any, string>({  // TODO, figure out query params
      query: (subreddit) => `/r/${subreddit}.json`
    }),
  }),
})

export const { useGetFrontpageQuery, useGetSubredditQuery } = authApi
