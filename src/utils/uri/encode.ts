function encode(incoming: UriEncode) : string {
	return ''
}

/**
 * [formUrlEncode description]
 * @param  {formUrlEncodeObject} {params, delimiter=';'} [description]
 * @return {string}                        [description]
 */
function formUrlEncode({params, delimiter=';'} : FormUrlEncodeObject) : string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join(delimiter)
}

export { formUrlEncode }