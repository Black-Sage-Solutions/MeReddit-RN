/**
 * TODO:
 * - some reason it's doing a bunch of stuff subscribe unsubscribe rejection dispatchs,
 * what would be the best way to cache the Scope list data?
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type PostCommentsQueryArgs = {
  subreddit: string,
  postId:    string,
}

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
      query: () => '/.json',
    }),
    getPostComments: builder.query<any, PostCommentsQueryArgs>({
      query: ({subreddit, postId}) => `/r/${subreddit}/comments/${postId}.json`,
      transformResponse: (response: Array<any>) => {
        const [post, comments] = response
        return {post: post.data.children[0].data, comments: comments.data.children}
      },
    }),
    getSubreddit: builder.query<any, string>({  // TODO, figure out query params
      query: (subreddit) => `/r/${subreddit}.json`
    }),
    getUser: builder.query<any, string>({
      query: (userName) => `/user/${userName}.json`
    }),
  }),
})

export const {
  useGetFrontpageQuery,
  useGetPostCommentsQuery,
  useGetScopesQuery,
  useGetSubredditQuery,
  useGetUserQuery
} = noauthApi
