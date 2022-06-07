type Thing = {
  data: object,
  id:   string,
  kind: string,
  name: string,
}

type ThingChild = {
  data: object,
  kind: string,
}

type Listing = {
  after:    string,
  before:   string,
  children: Array<ThingChild>,
  modhash:  string,
}

type ScopeData = {
  description: string,
  id:          string,
  name:        string,  
}

type Scopes = {[key: string]: ScopeData}
