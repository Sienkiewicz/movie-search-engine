import './App.scss'
import Typography from '@material-ui/core/Typography'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'
import { Search } from './helpers/types'
import { fetchData } from './query'
import { SearchBar } from './components/SearchBar'
import { MovieCards } from './components/MovieCards'
import querystring from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { Pagination } from './components/Pagination'

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
})

function App() {
  const [searchBarValue, setSearchBarValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<Search[] | undefined>()
  const [errorMessage, setErrorMessage] = useState('')
  const [amountOfPages, setAmountOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const isValid = searchBarValue.length < 3

  let history = useHistory()
  let { search } = useLocation()
  const { query } = querystring.parse(search)
  const classes = useStyles()

  const title = 'Movie search'

  const handlerSearchBar = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchBarValue(e.target.value)
    },
    [setSearchBarValue]
  )

  const leaf = useCallback(
    (arg: 'prev' | 'next'): void => {
      if (arg === 'prev') {
        setCurrentPage(prevState => prevState - 1)
      } else {
        setCurrentPage(prevState => prevState + 1)
      }
      setIsFetching(true)
    },
    [setCurrentPage, setIsFetching]
  )

  const fetchingHandler = useCallback(
    (data: Search[] | undefined, errorMessage = '') => {
      setData(data)
      setIsFetching(false)
      setErrorMessage(errorMessage)
      setSearchBarValue('')
    },
    [setData, setIsFetching, setErrorMessage, setSearchBarValue]
  )

  const onFocusHandler = useCallback(() => {
    setIsFocus(true)
    setErrorMessage('')
  }, [setIsFocus, setErrorMessage])

  const onBlurHandler = useCallback(() => {
    setIsFocus(false)
  }, [setIsFocus])

  const startFetch = useCallback(() => {
    setCurrentPage(1)
    setIsFetching(true)
  }, [setIsFetching])

  useEffect(() => {
    if (isFetching) {
      const search = !!searchBarValue ? searchBarValue : (query as string)

      !!searchBarValue && history.push(`/?query=${searchBarValue}`)
      fetchData(search, currentPage).then(data => {
        if (data.Error) {
          fetchingHandler(undefined, data.Error)
          return
        }

        fetchingHandler(data.Search)
        setAmountOfPages(Math.ceil(+data.totalResults / 10))
      })
    }
  }, [isFetching, searchBarValue, fetchingHandler, currentPage, history, query])

  return (
    <div className='App'>
      <header className='App-header'>
        <Typography variant='h4' color='initial'>
          {title}
        </Typography>
      </header>
      <main className='App-main'>
        <Container maxWidth='lg' className={classes.flex}>
          <Box
            className={classes.flex}
            justifyContent={data ? 'flex-start' : 'center'}
          >
            <SearchBar
              title={title}
              onFocusHandler={onFocusHandler}
              onBlurHandler={onBlurHandler}
              isFocus={isFocus}
              isValid={isValid}
              searchBarValue={searchBarValue}
              handlerSearchBar={handlerSearchBar}
              startFetch={startFetch}
              isFetching={isFetching}
            />
            {data ? (
              <>
                <MovieCards data={data} />
                <Pagination
                  currentPage={currentPage}
                  leaf={leaf}
                  amountOfPages={amountOfPages}
                />
              </>
            ) : (
              <Typography variant='h5' color='secondary'>
                {!!errorMessage ? errorMessage : 'Start to search'}
              </Typography>
            )}
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default App
