import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { tss } from 'tss-react/mui'

import {
  createBlankArticle,
  deleteArticle,
} from '../redux/slices/articlesSlice'
import { setMode } from '../redux/slices/editorSlice'
import { AppDispatch, RootState } from '../redux/store'
import { CenteredModal } from './CenteredModal'
import { CircularProgressOverlay } from './CircularProgressOverlay'

export function EditorControls() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { classes } = useStyles()
  const editorMode = useSelector((state: RootState) => state.editor.mode)
  const loading = useSelector((state: RootState) => state.articles.loading)
  const articleId = useSelector(
    (state: RootState) => state.articles.selectedArticle.id
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const edit = useCallback(() => {
    dispatch(setMode('edit'))
  }, [dispatch])

  const create = useCallback(() => {
    dispatch(createBlankArticle())
    dispatch(setMode('edit'))
    navigate('/article/new')
  }, [dispatch, navigate])

  const remove = useCallback(() => {
    dispatch(deleteArticle(articleId)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/list')
      }
    })
  }, [articleId, dispatch, navigate])

  return (
    <>
      <CenteredModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Typography>{t('confirmDelete')}</Typography>
        <div className={classes.modalButtons}>
          <Button variant="outlined" onClick={() => setModalOpen(false)}>
            {t('cancel')}
          </Button>
          <Button variant="contained" color="error" onClick={remove}>
            {loading.deleteArticle && <CircularProgressOverlay />}
            {t('delete')}
          </Button>
        </div>
      </CenteredModal>
      {articleId && (
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<AddIcon />}
          onClick={create}
        >
          {t('new')}
        </Button>
      )}
      {editorMode === 'view' && articleId && (
        <Button
          variant="contained"
          color="warning"
          size="small"
          startIcon={<EditIcon />}
          onClick={edit}
        >
          {t('edit')}
        </Button>
      )}
      {articleId && (
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => setModalOpen(true)}
        >
          {t('delete')}
        </Button>
      )}
    </>
  )
}

const useStyles = tss.withName('controls').create(({ theme }) => ({
  modalButtons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}))
