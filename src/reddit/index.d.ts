interface Thing {
  data: object
  id:   string
  kind: string
  name: string
}

interface ThingChild {
  data: object
  kind: string
}

interface Listing {
  after:    string
  before:   string
  children: Array<ThingChild>
  modhash:  string
}

interface ScopeData {
  description: string
  id:          string
  name:        string
}

interface Scopes {
  [key: string]: ScopeData
}
