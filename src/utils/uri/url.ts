import { isEmpty } from "utils/misc"
import { formUrlEncode } from "./encode"

interface UrlParams extends Url {
  delimiter?: string
}

/**
 * [url description]
 *
 * @param  {UrlParams} incoming [description]
 *
 * @return {string}
 */
function url(incoming: UrlParams) : string {
  const {base, delimiter, fragment, host, path, query, scheme} = incoming

  let output = ''

  if (base) {
    output += base
  }

  if (scheme) {
    output += `${scheme}://`
  }

  if (host) {
    output += host
  }

  if (path) {
    output += `/${path}`
  }

  if (!isEmpty(query)) {
    output += `?${formUrlEncode({params: query, delimiter})}`
  }

  if (!isEmpty(fragment)) {
    output += `#${formUrlEncode({params: fragment, delimiter})}`
  }

  return output
}

export { url }
