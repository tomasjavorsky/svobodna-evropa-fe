import { Button, Paper, TextField, Typography } from '@mui/material'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { tss } from 'tss-react/mui'

import { createArticle, updateArticle } from '../redux/slices/articlesSlice'
import { setMode } from '../redux/slices/editorSlice'
import { AppDispatch, RootState } from '../redux/store'
import { CenteredModal } from './CenteredModal'
import { CircularProgressOverlay } from './CircularProgressOverlay'

interface Fields {
  title: string
  author: string
  text: string
  dateOfPublication: Dayjs | null
}

export default function EditMode() {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.articles.loading)
  const article = useSelector(
    (state: RootState) => state.articles.selectedArticle
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const cancelEdit = useCallback(() => {
    dispatch(setMode('view'))
    navigate('/list')
  }, [dispatch, navigate])

  const onSubmit: SubmitHandler<Fields> = (data) => {
    if (!data.dateOfPublication) {
      throw new Error('Date of publication missing')
    }
    //new article does not have an id yet
    if (!article.id) {
      dispatch(
        createArticle({
          id: crypto.randomUUID(),
          ...data,
          dateOfPublication: data.dateOfPublication?.format('YYYY-MM-DD'),
        })
      ).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/list')
        }
      })
    } else {
      dispatch(
        updateArticle({
          id: article.id,
          ...data,
          dateOfPublication: data.dateOfPublication?.format('YYYY-MM-DD'),
        })
      ).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/list')
        }
      })
    }
  }

  const { register, handleSubmit, control } = useForm<Fields>({
    defaultValues: {
      title: article.title,
      author: article.author,
      text: article.text,
      dateOfPublication: dayjs(article.dateOfPublication),
    },
  })

  return (
    <>
      <CenteredModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Typography>{t('confirmDiscard')}</Typography>
        <div className={classes.modalButtons}>
          <Button variant="outlined" onClick={() => setModalOpen(false)}>
            {t('cancel')}
          </Button>
          <Button variant="contained" color="error" onClick={cancelEdit}>
            {t('discard')}
          </Button>
        </div>
      </CenteredModal>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <TextField
          required
          className={classes.title}
          variant="outlined"
          placeholder={t('title')}
          {...register('title')}
        />
        <div className={classes.description}>
          <TextField
            required
            variant="outlined"
            fullWidth
            placeholder={t('author')}
            {...register('author')}
          />
          <Controller
            name="dateOfPublication"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField {...field} format="YYYY-MM-DD" />
              </LocalizationProvider>
            )}
          />
        </div>
        <Paper className={classes.paper}>
          <TextField
            required
            className={classes.textarea}
            fullWidth
            multiline
            variant="outlined"
            placeholder={t('text')}
            {...register('text')}
          />
        </Paper>
        <div className={classes.bottomControls}>
          <Button
            variant="outlined"
            color="info"
            size="small"
            onClick={() => setModalOpen(true)}
          >
            {t('cancel')}
          </Button>
          <Button variant="contained" type="submit">
            {(loading.updateArticle || loading.createArticle) && (
              <CircularProgressOverlay />
            )}
            {t('save')}
          </Button>
        </div>
      </form>
    </>
  )
}

const useStyles = tss.withName('edit-mode').create(({ theme }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  paper: {
    display: 'flex',
    flex: 1,
  },
  title: {
    '& .MuiInputBase-root': {
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
  },
  textarea: {
    display: 'flex',
    flex: 1,
    '& .MuiInputBase-root': {
      display: 'flex',
      flex: 1,
      alignItems: 'start',
    },
  },
  description: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  bottomControls: {
    alignSelf: 'end',
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  modalButtons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}))
