/**
 * [formUrlEncode description]
 * @param  {formUrlEncodeObject} {params, delimiter=';'} [description]
 * @return {string}                        [description]
 */
function formUrlEncode({params, delimiter=';'}: FormUrlEncodeObject) : string {
  // FIXME not sure what to do here, Map is not a viable input for .entries
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join(delimiter);
}

export { formUrlEncode };
