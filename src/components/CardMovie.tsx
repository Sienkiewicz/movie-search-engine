import React, { FC } from 'react'
import { Search } from '../helpers/types'
import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  paperContainer: {
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: 5,
  },
})

type Props = {
  mov: Search
}

export const CardMovie: FC<Props> = React.memo(({ mov }) => {
  const classes = useStyles()
  return (
    <Grid key={mov.imdbID} item xs={12} sm={6} md={4}>
      <CardActionArea className={classes.paperContainer}>
        <CardMedia
          component='img'
          alt={`poster of movie with title: ${mov.Title}`}
          image={mov.Poster}
          title={mov.Title}
        />
        <Box
          display='flex'
          flexDirection='column'
          height='100%'
          justifyContent='flex-end'
        >
          <Typography gutterBottom variant='h6' component='h2'>
            {mov.Title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {mov.Year}
          </Typography>
        </Box>
      </CardActionArea>
    </Grid>
  )
})
