import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { tss } from 'tss-react/mui'

import { clearError, selectArticlesError } from '../redux/slices/articles/articlesSlice'
import { AppDispatch } from '../redux/store'

export function ApiError() {
  const error = useSelector(selectArticlesError)
  const dispatch = useDispatch<AppDispatch>()
  const { classes } = useStyles()
  return (
    <>
      {error && (
        <div className={classes.root}>
          <Alert severity="error">{error}</Alert>
          <IconButton
            onClick={() => {
              dispatch(clearError())
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </>
  )
}

const useStyles = tss.withName('api-error').create(({ theme }) => ({
  root: {
    display: 'flex',
    gap: theme.spacing(2),
    position: 'absolute',
    right: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    borderRadius: theme.spacing(1),
    zIndex: 1,
  },
}))
