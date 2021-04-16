import React, { ChangeEvent, FC } from 'react'
import { Box, CircularProgress, Grid, TextField, Fab } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

type Props = {
  title: string
  searchBarValue: string
  isFocus: boolean
  isValid: boolean
  isFetching: boolean

  handlerSearchBar(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  onFocusHandler(): void
  onBlurHandler(): void
  startFetch(): void
}

export const SearchBar: FC<Props> = React.memo(
  ({
    title,
    onFocusHandler,
    onBlurHandler,
    isFocus,
    isValid,
    searchBarValue,
    handlerSearchBar,
    startFetch,
    isFetching,
  }) => {
    return (
      <Box
        m={{ xs: 2, sm: 3, md: 4 }}
        border={1}
        borderColor='#ccc'
        borderRadius={5}
        p={1}
      >
        <Grid container spacing={1} justify='center' alignItems='center'>
          <Grid item xs={9} sm={10} md={11}>
            <TextField
              fullWidth
              id='searchBar'
              label={title}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              helperText={isFocus && isValid && 'must be min 3 characters'}
              value={searchBarValue}
              onChange={e => handlerSearchBar(e)}
              error={isFocus && isValid}
              onKeyDown={e => {
                if (e.key === 'Enter') !isValid && startFetch()
              }}
            />
          </Grid>
          <Grid item>
            <Fab
              color='primary'
              aria-label='add'
              onClick={startFetch}
              size='small'
              disabled={isValid}
            >
              {isFetching ? (
                <CircularProgress size={25} color='inherit' />
              ) : (
                <SearchIcon />
              )}
            </Fab>
          </Grid>
        </Grid>
      </Box>
    )
  }
)
