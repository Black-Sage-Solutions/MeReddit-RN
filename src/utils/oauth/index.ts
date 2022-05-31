/**
 * 
 */
import { Linking } from 'react-native'

import { store } from '@app/store'

import { toBase64 } from '@utils/text'

import { formUrlEncode } from '@utils/uri/encode'

import { UpdateToken, clear, updateError, updateToken } from './reducer'

const { dispatch } = store

// TODO: move to a secret spot
const clientId = ''
const redirectUri = ''
/**
 * [requestAuth description]
 */
function startAuthRequest() : void {
	// TODO: Move client id and redirect_uri into secure location
  //       Also make scope configurable?
  const params = {
    client_id: clientId,
    duration: 'permanent',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identity edit flair mysubreddits save submit subscribe vote',
    state: (Math.random() + 1).toString(36).substring(7),  // TODO save?
  }

  const encodedParams = formUrlEncode({params})

  Linking.openURL(`https://ssl.reddit.com/api/v1/authorize.compact?${encodedParams}`)
}

/**
 * [handleRedirect description]
 * @param {IUri} url [description]
 */
function handleRedirect(url: IUri) : void {
  if (url.query.has('error')) {
    console.warn('An error occured:', url.query.get('error'))
    return
  }

  accessToken(url.query.get('code') as string)
}

type RedditTokenResponse = {
  access_token: string,
  expires_in:   number,
  scope:        string,
  token_type:   'bearer',
}

type RedditAccessTokenResponse = RedditTokenResponse & {
  refresh_token: string,
}

/**
 * [accessToken description]
 * @param {string} code [description]
 */
function accessToken(code: string) : Promise<void> {
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  }

  return fetch('https://ssl.reddit.com/api/v1/access_token', {
    body: formUrlEncode({params, delimiter: '&'}),
    headers: {
      'Authorization': `Basic ${toBase64(`${clientId}:`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
  .then(resp => resp.json())  // TODO: a 200 response can also be an error
  .then(handleAccessTokenResponse)
  .then((data: RedditAccessTokenResponse) => {
    console.log({data})
    const payload: UpdateToken = {
      accessToken: data.access_token,
      expires: data.expires_in,
      refreshToken: data.refresh_token,
      tokenType: data.token_type,
    }
    dispatch(updateToken(payload))
  })
  .catch(catchTokenResponse)
}

/**
 * [refreshToken description]
 * TODO: test flow
 * @return {Promise} [description]
 */
function refreshToken() : Promise<void> {
  const { oauth } = store.getState()
  const { refreshToken } = oauth

  const params = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  }

  return fetch('https://ssl.reddit.com/api/v1/refresh_token', {
    body: formUrlEncode({params, delimiter: '&'}),
    headers: {
      'Authorization': `Basic ${toBase64(`${clientId}:`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
  .then(resp => resp.json())
  .then(handleRefreshTokenResponse)
  .then((data: RedditTokenResponse) => {
    const payload: UpdateToken = {
      accessToken: data.access_token,
      expires: data.expires_in,
      refreshToken,
      tokenType: data.token_type,
    }
    dispatch(updateToken(payload))
  })
  .catch(catchTokenResponse)
}

/**
 * [revokeToken description]
 */
function revokeToken() : void {
  console.log('TODO: revoke token flow')
  dispatch(clear())
}

/**
 * [OauthResponseError description]
 */
class OAuthResponseError extends Error {
  /**
   * [constructor description]
   * @param {string} message [description]
   */
  constructor(message: string) {
    super(message)
    this.name = 'OAuthError'
  }
}

/**
 * [checkTokenResponse description]
 * @param {any} data [description]
 */
function checkTokenResponse(data: any) : void {
  if (data?.error) {
    throw new OAuthResponseError(data.error)
  }
}

/**
 * [catchTokenResponse description]
 * @param {Error} error [description]
 */
function catchTokenResponse(error: Error) : void {
  if (error instanceof OAuthResponseError) {
    dispatch(updateError(error.message))
  } else {
    console.error(error)
  }
}

/**
 * [handleAccessTokenResponse description]
 * @param  {any}                       data [description]
 * @return {RedditAccessTokenResponse}      [description]
 */
function handleAccessTokenResponse(data: any) : RedditAccessTokenResponse {
  checkTokenResponse(data)
  return data as RedditAccessTokenResponse
}

/**
 * [handleRefreshTokenResponse description]
 * @param  {any}                 data [description]
 * @return {RedditTokenResponse}      [description]
 */
function handleRefreshTokenResponse(data: any) : RedditTokenResponse {
  checkTokenResponse(data)
  return data as RedditTokenResponse
}

export { handleRedirect, refreshToken, startAuthRequest }
