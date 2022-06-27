import { Buffer } from 'buffer'

/**
 * toBase64 Transforms a string to base64 encoding.
 * @param  {string} incoming
 * @return {string}
 */
function toBase64(incoming: string) : string {
  return Buffer.from(incoming, 'utf-8').toString('base64')
}


const htmlCodeMap: {[key: string]: string} = {
  '&amp;' : '&',
  '&gt;'  : '>',
  '&lt;'  : '<',
  '&quot;': '"',
  '&#39;' : "'",
}

/**
 * htmlUnescape Transforms an escaped string of matching html escaped codes to
 * the ASCII character.
 * @param  {string} incoming
 * @return {string}
 */
function htmlUnescape(incoming: string) : string {
  function replacer(match : string) : string {
    return htmlCodeMap[match] || match
  }

  const rule = /&amp;|&gt;|&lt;|&quot;|&#39;/g

  return incoming.replace(rule, replacer)
}

export { toBase64, htmlUnescape }
