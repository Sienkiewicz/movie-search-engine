export interface Root {
  Search: Search[]
  totalResults: string
  Response: string
  Error?: string
}

export interface Search {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
