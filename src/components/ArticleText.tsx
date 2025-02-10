import { Paper } from '@mui/material'
import { memo } from 'react'
import { tss } from 'tss-react/mui'

interface ArticleTextProps {
  text: string
}

export const ArticleText = memo(function ({ text }: ArticleTextProps) {
  const { classes } = useStyles()
  return <Paper className={classes.paper}>{text}</Paper>
})

const useStyles = tss.withName('article-text').create(({ theme }) => ({
  paper: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing(2),
  },
}))
