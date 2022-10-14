/**
 * [formUrlEncode description]
 *
 * @param  {FormUrlEncodeObject} {params, delimiter=';'} [description]
 *
 * @return {string}
 */
function formUrlEncode({params, delimiter=';'}: FormUrlEncodeObject) : string {
  let items

  if (Array.isArray(params)) {
    items = params
  } else {
    items = Object.entries(params)
  }

  return items
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join(delimiter)
}

export { formUrlEncode }
