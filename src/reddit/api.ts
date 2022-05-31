import { store } from '@app/store'

/**
 * [redditApi description]
 * @param  {'GET'      |    'POST'}      method [description]
 * @param  {string}        path [description]
 * @return {Promise<void>}      [description]
 */
function redditApi(method: 'GET' | 'POST', path: string) : Promise<void> {
  const { oauth } = store.getState()
  const { accessToken, tokenType } = oauth

  console.log({oauth})

  return fetch(`https://oauth.reddit.com/${path}`, {
    headers: {
      'Authorization': `${tokenType} ${accessToken}`,  // does 'bearer' need to be capitalized?
    },
    method,
  })
  .then(resp => {console.log({resp}); return resp})  // non-OK status are not throw :(
  .then(resp => resp.json())
  .then(data => { console.log({data}) })
  .catch(console.error)
}

export { redditApi }
