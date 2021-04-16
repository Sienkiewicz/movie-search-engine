import { Box, Fab, Grid } from '@material-ui/core'
import React, { FC, memo } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

type Props = {
  currentPage: number
  leaf(arg: 'prev' | 'next'): void
  amountOfPages: number
}

export const Pagination: FC<Props> = memo(
  ({ currentPage, leaf, amountOfPages }) => {
    return (
      <Box pb={2}>
        <Grid container justify='space-between'>
          <Grid item>
            <Fab
              color='primary'
              aria-label='add'
              onClick={() => leaf('prev')}
              size='small'
              disabled={!(currentPage > 1)}
            >
              <ArrowBackIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              color='primary'
              aria-label='add'
              onClick={() => leaf('next')}
              size='small'
              disabled={!(currentPage < amountOfPages)}
            >
              <ArrowForwardIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    )
  }
)
