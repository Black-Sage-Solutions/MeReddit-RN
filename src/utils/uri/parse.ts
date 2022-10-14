//
// URI Parsing module
//
// Example: [scheme]://[host]/[path]?[query]#[fragment]
//

/**
 * [parse description]
 *
 * @param  {string} incoming [description]
 *
 * @return {Uri}
 */
function parse(incoming: string) : Uri {
  let
    fragment: string,
    host:     string,
    path:     string,
    query:    string,
    scheme:   string;

  // helper variables on split destructuring
  let
    head:      string,
    pathItems: Array<string>,
    tail:      string;

  // if split returns only 1 item, destructuring set to default with an empty
  // string, the helper variables can continue with the split flow
  [scheme='', tail=''] = incoming.split('://', 2);

  // Downside: I can see doing it this way, is not helpful in finding malformed
  //           URIs. For example the query `?` sets of properties could come
  //           after the fragment `#` set and end up in the `fragment` IUri
  //           prop.
  //           
  //           1 solution could be doing validation beforehand to see the
  //           incoming URI's delimiter order and emit errors. 2nd solution
  //           could be just doing the loop to iterate through the incoming URI
  //           and deal with incorrect URI form in a more efficent manner.
  [head='', fragment=''] = tail.split('#', 2);

  [head='', query=''] = head.split('?', 2);

  // A bit inefficent, could find the first instance and do a splice instead
  [host='', ...pathItems] = head.split('/');

  path = pathItems.join('/')

  const queryItems = listUriArgs(query)
  const fragmentItems = listUriArgs(fragment)

  return {
    fragment: fragmentItems,
    host,
    path,
    query: queryItems,
    scheme,
  }
}

/**
 * [listUriArgs description]
 *
 * @param  {string}    incoming [description]
 *
 * @return {UriParams}
 */
function listUriArgs(incoming: string) : UriParams {
  return incoming
    .split('&')
    .filter(item => item !== '')
    .map(item => item.split('='))
    .sort((a, b) => a[0].localeCompare(b[0])) as UriParams
}

export { parse }
