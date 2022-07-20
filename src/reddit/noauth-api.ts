/**
 * TODO:
 * - some reason it's doing a bunch of stuff subscribe unsubscribe rejection dispatchs,
 * what would be the best way to cache the Scope list data?
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from 'utils/uri/url'

interface PostCommentsQueryArgs {
  subreddit: string
  postId:    string
}

interface SubredditQueryArgs {
  after?:     string
  count?:     number
  subreddit?: string
}

export const noauthApi = createApi({
  reducerPath: 'noauthApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.reddit.com/'}),
  endpoints: (builder) => ({
    getScopes: builder.query<ScopeData[], void>({
      query: () => 'api/v1/scopes',
      transformResponse: (response: Scopes) => {
        return Object.values(response)
      },
    }),
    getFrontpage: builder.query<any, SubredditQueryArgs>({
      query: ({after, count}) => {
        const queryArgs = (after && count) ? {after, count} : {}
        return url({path: `.json`, query: queryArgs})
      },
    }),
    getPostComments: builder.query<any, PostCommentsQueryArgs>({
      query: ({subreddit, postId}) => `r/${subreddit}/comments/${postId}.json`,
      transformResponse: (response: Array<any>) => {
        const [post, comments] = response
        const moreComments = comments.data.children.pop()
        return {post: post.data.children[0].data, comments: comments.data.children, moreComments}
      },
    }),
    getSubreddit: builder.query<any, SubredditQueryArgs>({
      query: ({after, count, subreddit}) => {
        const queryArgs = (after && count) ? {after, count} : {}
        const place = subreddit ? `r/${subreddit}` : ''
        return url({path: `${place}.json`, query: queryArgs})
      },
    }),
    getUser: builder.query<any, string>({
      query: (userName) => `user/${userName}.json`
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
