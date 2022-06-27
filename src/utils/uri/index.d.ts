/**
 * URI type definitions module.
 */

interface FormUrlEncodeObject {
  params:     {[key: string]: string}
  delimiter?: string
}

interface IUri {
  fragment: Map<string, string[] | string>
  host:     string
  path:     string
  query:    Map<string, string[] | string>
  scheme:   string
}

interface IUrl {
  base?:     string
  fragment?: Iterable<string, any>
  host?:     string
  path?:     string
  query?:    Iterable<string, any>
  scheme?:   string
}

type UriParams = Map<string, string[] | string>
