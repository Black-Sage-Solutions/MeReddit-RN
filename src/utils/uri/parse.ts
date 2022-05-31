/**
 * URI Parsing module
 *
 * Testing example
 *   mereddit://oauth2redirect/reddit#access_token=1854828797057-exMm55XbDs_5wPPZyOUOk_-BjsAhFQ&token_type=bearer&state=4ezv3&expires_in=86400&scope=edit+submit+subscribe+vote+save+identity+flair
 *
 * Example: [scheme]://[host]/[path]?[query]#[fragment]
 */

/**
 * [parse description]
 * @param  {string} incoming [description]
 * @return {IUri}            [description]
 */
function parse(incoming: string) : IUri {
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
  path = pathItems.join('/');

  const queryItems = mapItems(query);
  const fragmentItems = mapItems(fragment);

  return {
    fragment: fragmentItems,
    host,
    path,
    query: queryItems,
    scheme,
  };
}

/**
 * [mapItems description]
 * @param  {string}    incoming [description]
 * @return {UriParams}          [description]
 */
function mapItems(incoming: string) : UriParams {
  // FIXME: query and fragments could have multiples of the same key, so
  // the map may only keep track of 1 item
  return new Map<string, string>(
    incoming.split('&')
    .filter(item => item !== '')
    .map(item => item.split('=')) as Iterable<[string,string]>
  );
}

export { parse }
