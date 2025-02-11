import { CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { tss } from 'tss-react/mui'

import { getArticle, selectArticlesLoading, selectSelectedArticle } from '../redux/slices/articles/articlesSlice'
import { AppDispatch } from '../redux/store'
import { ArticleText } from './'

export default function ViewMode() {
  const { classes } = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  const loading = useSelector(selectArticlesLoading)
  const article = useSelector(selectSelectedArticle)

  useEffect(() => {
    if (id) {
      dispatch(getArticle(id))
    }
  }, [dispatch, id])

  return (
    <div className={classes.container}>
      {loading.getArticle ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <>
          <Typography pl={2} variant="h3">
            {article.title}
          </Typography>
          <div className={classes.description}>
            <Typography pl={2} variant="h5">
              {article.author}
            </Typography>
            <Typography pr={2} variant="caption">
              {article.dateOfPublication}
            </Typography>
          </div>
          <ArticleText text={article.text} />
        </>
      )}
    </div>
  )
}

const useStyles = tss.withName('view-mode').create(({ theme }) => ({
  description: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  loading: {
    alignSelf: 'center',
    margin: theme.spacing(4),
  },
}))
