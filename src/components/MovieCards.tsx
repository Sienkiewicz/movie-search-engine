import { Grid } from '@material-ui/core'
import { Search } from '../helpers/types'
import React, { FC } from 'react'
import { CardMovie } from './CardMovie'

type Props = {
  data: Search[]
}

export const MovieCards: FC<Props> = React.memo(({ data }) => {
  return (
    <Grid container spacing={2} justify='center'>
      {data.map((mov, index) => {
        return <CardMovie key={`${mov.imdbID}${index}`} mov={mov} />
      })}
    </Grid>
  )
})
