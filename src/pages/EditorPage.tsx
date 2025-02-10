import ListIcon from '@mui/icons-material/List'
import { Button, CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { tss } from 'tss-react/mui'

import { ThemeToggle } from '../components'
import { ApiError } from '../components/ApiError'
import { EditorControls } from '../components/EditorControls'
import { RootState } from '../redux/store'

const ViewMode = lazy(() => import('../components/ViewMode'))
const EditMode = lazy(() => import('../components/EditMode'))

export default function EditorPage() {
  const { t } = useTranslation()
  const { classes } = useStyles()
  const navigate = useNavigate()
  const editorMode = useSelector((state: RootState) => state.editor.mode)

  return (
    <div className={classes.root}>
      <ApiError />
      <div className={classes.sidebar}>
        <EditorControls />
      </div>
      <div className={classes.center}>
        <Suspense fallback={<CircularProgress />}>
          {editorMode === 'view' ? <ViewMode /> : <EditMode />}
        </Suspense>
      </div>
      <div className={classes.sidebar}>
        <Button
          variant="contained"
          startIcon={<ListIcon />}
          onClick={() => navigate('/list')}
        >
          {t('list')}
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}

const useStyles = tss.withName('editor').create(({ theme }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '100vh',
    padding: theme.spacing(2),
  },
  center: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    minWidth: 100,
  },
}))
