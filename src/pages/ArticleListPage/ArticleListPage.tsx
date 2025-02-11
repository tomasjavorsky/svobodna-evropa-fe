import AddIcon from '@mui/icons-material/Add'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'
import {
  Alert,
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router'
import { tss } from 'tss-react/mui'

import { ApiError, ThemeToggle } from '../../components'
import { validateSort } from '../../misc/utils/validateSort/validateSort'
import {
  ArticleInfo,
  createBlankArticle,
  getArticles,
  selectArticleList,
} from '../../redux/slices/articles/articlesSlice'
import { setMode } from '../../redux/slices/editor/editorSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function ArticleListPage() {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const articleList = useSelector(selectArticleList)
  const loading = useSelector((state: RootState) => state.articles.loading)

  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  )

  const onArticleSelect = useCallback(
    (id: string) => {
      navigate(`/article/${id}`)
    },
    [navigate]
  )

  const create = useCallback(() => {
    dispatch(createBlankArticle())
    dispatch(setMode('edit'))
    navigate('/article/new')
  }, [dispatch, navigate])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set('search', searchQuery)
    }
    if (searchParams.get('sort')) {
      params.set('sort', searchParams.get('sort') || '')
    }
    setSearchParams(params)
  }

  const handleSort = (by: keyof ArticleInfo) => {
    const params = new URLSearchParams()
    if (searchParams.get('search')) {
      params.set('search', searchQuery)
    }
    if (by !== searchParams.get('sort')) {
      params.set('sort', by)
    }
    setSearchParams(params)
  }

  useEffect(() => {
    dispatch(setMode('view')) //Reset editor state
    if (validateSort(searchParams.get('sort') || '')) {
      dispatch(
        getArticles({
          query: searchParams.get('search') || '',
          sort: (searchParams.get('sort') as keyof ArticleInfo) || '',
        })
      )
    } else {
      dispatch(
        getArticles({
          query: searchParams.get('search') || '',
          sort: '',
        })
      )
    }
  }, [dispatch, searchParams])

  return (
    <>
      <ApiError />
      <Container className={classes.root}>
        <div className={classes.controls}>
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<AddIcon />}
            onClick={create}
          >
            {t('new')}
          </Button>
          <div className={classes.searchContainer}>
            <ThemeToggle />
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              placeholder="search"
            />
            <Button onClick={handleSearch} variant="contained">
              <SearchIcon />
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.header}>
                  <Typography variant="h6" onClick={() => handleSort('title')}>
                    {t('title')}
                    {searchParams.get('sort') === 'title' && (
                      <ArrowDropUpIcon fontSize={'small'} />
                    )}
                  </Typography>
                </TableCell>
                <TableCell className={classes.header}>
                  <Typography variant="h6" onClick={() => handleSort('author')}>
                    {t('author')}
                    {searchParams.get('sort') === 'author' && (
                      <ArrowDropUpIcon fontSize={'small'} />
                    )}
                  </Typography>
                </TableCell>
                <TableCell className={classes.header}>
                  <Typography
                    variant="h6"
                    onClick={() => handleSort('dateOfPublication')}
                  >
                    {t('dateOfPublication')}
                    {searchParams.get('sort') === 'dateOfPublication' && (
                      <ArrowDropUpIcon fontSize={'small'} />
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody data-testid="table-body">
              {articleList.map((article) => (
                <TableRow
                  key={article.id}
                  className={classes.row}
                  onClick={() => onArticleSelect(article.id)}
                >
                  <TableCell component="th" scope="row">
                    {article.title}
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.dateOfPublication}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading.getArticleList && <LinearProgress />}
        {!loading.getArticleList && articleList.length === 0 && (
          <Box mt={2}>
            <Alert severity="warning">{t('noArticles')}</Alert>
          </Box>
        )}
      </Container>
    </>
  )
}

const useStyles = tss.withName('article-list').create(({ theme }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: theme.spacing(2),
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  tableHead: {
    backgroundColor: theme.palette.divider,
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
  },
  header: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))
