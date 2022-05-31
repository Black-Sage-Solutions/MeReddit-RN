import { Buffer } from 'buffer'

/**
 * [toBase64 description]
 * @param  {string} incoming [description]
 * @return {string}          [description]
 */
function toBase64(incoming: string) : string {
  return Buffer.from(incoming, 'utf-8').toString('base64')
}

export { toBase64 }
