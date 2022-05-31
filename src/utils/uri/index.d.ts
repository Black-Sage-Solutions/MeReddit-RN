/**
 * URI type definitions module.
 */

type FormUrlEncodeObject = {
  params:     {[key: string]: string},
  delimiter?: string,
}

interface IUri {
  fragment: Map<string, string | Array<string>>
  host:     string
  path:     string
  query:    Map<string, string | Array<string>>
  scheme:   string
}

type UriEncode = {
  base?:     string,
  fragment?: Iterable<string, any>,
  host?:     string,
  path?:     string,
  query?:    Iterable<string, any>,
  scheme?:   string,
}

type UriParams = Map<string, string | Array<string>>
