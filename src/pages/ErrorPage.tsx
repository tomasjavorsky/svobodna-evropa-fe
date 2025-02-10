import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { Alert, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

type ErrorPopupProps = {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: ErrorPopupProps) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />
      <Alert severity="error">{t('somethingWrong')}</Alert>
      <Typography>{error.message}</Typography>
      <Button onClick={resetErrorBoundary}>{t('tryAgain')}</Button>
    </div>
  )
}

const useStyles = tss.withName('error-popup').create(({ theme }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: 300,
    margin: `${theme.spacing(4)} auto`,
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}))
