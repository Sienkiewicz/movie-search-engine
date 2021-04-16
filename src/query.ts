import { Root } from './helpers/types'

export const fetchData = async (searchBarValue: string, page = 1) => {
  const data: Root = await fetch(
    `http://www.omdbapi.com/?apikey=7012ca39&s=${searchBarValue}&page=${page}`
  ).then(res => {
    return res.json()
  })
  return data
}
