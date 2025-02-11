import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { baseURL } from '../../../misc/consts'
import { RootState } from '../../store'

export interface Article {
  id: string
  title: string
  author: string
  dateOfPublication: string
  text: string
}

export type ArticleInfo = Omit<Article, 'text'>

interface ArticlesState {
  list: ArticleInfo[]
  selectedArticle: Article
  loading: {
    getArticleList: boolean
    getArticle: boolean
    createArticle: boolean
    updateArticle: boolean
    deleteArticle: boolean
  }
  error: string
}

export const initialState: ArticlesState = {
  list: [],
  selectedArticle: {
    id: '',
    title: '',
    author: '',
    dateOfPublication: '',
    text: '',
  },
  loading: {
    getArticleList: false,
    getArticle: false,
    createArticle: false,
    updateArticle: false,
    deleteArticle: false,
  },
  error: '',
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = ''
    },
    createBlankArticle: (state) => {
      state.selectedArticle = {
        id: '',
        title: '',
        author: '',
        text: '',
        dateOfPublication: dayjs().format('YYYY-MM-DD'),
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading.getArticleList = true
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading.getArticleList = false
        state.list = action.payload
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading.getArticleList = false
        state.error =
          action.error.message || 'An error occurred loading article list'
      })

      .addCase(getArticle.pending, (state) => {
        state.loading.getArticle = true
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.loading.getArticle = false
        state.selectedArticle = action.payload
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.loading.getArticle = false
        state.error =
          action.error.message || 'An error occurred loading full article'
      })

      .addCase(createArticle.pending, (state) => {
        state.loading.createArticle = true
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.loading.createArticle = false
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading.createArticle = false
        state.error =
          action.error.message || 'An error occurred while posting new article'
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading.updateArticle = true
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.loading.updateArticle = false
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading.updateArticle = false
        state.error =
          action.error.message || 'An error occurred while updating article'
      })

      .addCase(deleteArticle.pending, (state) => {
        state.loading.deleteArticle = true
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading.deleteArticle = false
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading.deleteArticle = false
        state.error =
          action.error.message || 'An error occurred while deleting an article'
      })
  },
})

export const getArticles = createAsyncThunk<
  ArticleInfo[],
  { query: string; sort: keyof ArticleInfo | '' }
>('articles/getArticleList', async ({ query, sort }) => {
  const response = await fetch(
    `${baseURL}/articles/?search=${query}&sort=${sort}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch article list')
  }
  return response.json()
})

export const getArticle = createAsyncThunk<Article, string>(
  'articles/getArticle',
  async (id: string) => {
    const response = await fetch(`${baseURL}/articles/?id=${id}`)
    if (!response.ok) {
      const res = await response.json()
      throw new Error(res.message || 'Failed to fetch article data')
    }
    return response.json()
  }
)

export const createArticle = createAsyncThunk<boolean, Article>(
  'articles/create',
  async (article: Article) => {
    const response = await fetch(`${baseURL}/articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
    if (!response.ok) {
      const res = await response.json()
      throw new Error(res.message || 'Failed to create article')
    }
    return response.ok
  }
)

export const updateArticle = createAsyncThunk<boolean, Article>(
  'articles/update',
  async (article: Article) => {
    const response = await fetch(`${baseURL}/articles/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
    if (!response.ok) {
      const res = await response.json()
      throw new Error(res.message || 'Failed to update article')
    }
    return response.ok
  }
)

export const deleteArticle = createAsyncThunk<boolean, string>(
  'articles/delete',
  async (id: string) => {
    const response = await fetch(`${baseURL}/articles/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    if (!response.ok) {
      const res = await response.json()
      throw new Error(res.message || 'Failed to delete article')
    }
    return response.ok
  }
)

export const { createBlankArticle, clearError } = articlesSlice.actions
export default articlesSlice.reducer

export const selectArticlesLoading = (state: RootState) => state.articles.loading
export const selectArticlesError = (state: RootState) => state.articles.error
export const selectArticleList = (state: RootState) => state.articles.list
export const selectSelectedArticle = (state: RootState) => state.articles.selectedArticle