/**
 * URI type definitions module.
 */

interface FormUrlEncodeObject {
  params:     UriParams | Iterable<string, any>
  delimiter?: string
}

interface Uri {
  fragment: UriParams
  host:     string
  path:     string
  query:    UriParams
  scheme:   string
}

type UriParams = Array<[string,string]>

interface Url {
  base?:     string
  fragment?: Iterable<string, any>
  host?:     string
  path?:     string
  query?:    Iterable<string, any>
  scheme?:   string
}
