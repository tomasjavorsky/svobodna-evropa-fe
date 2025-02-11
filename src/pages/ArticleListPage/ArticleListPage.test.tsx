import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { expect, it } from 'vitest'

import { RenderWithProviders } from '../../misc/utils/testUtils'
import articlesReducer, {
  initialState as initialArticlesState,
} from '../../redux/slices/articles/articlesSlice'
import editorReducer, {
  initialState as initialEditorState,
} from '../../redux/slices/editor/editorSlice'
import { RootState } from '../../redux/store'
import ArticleListPage from './ArticleListPage'

it('can display article info correctly', async () => {
  const testArticleInfo1 = {
    id: '123',
    title: 'The Great title',
    author: 'Lord Authorus',
    dateOfPublication: '2025-02-11',
  }

  const preloadedState: RootState = {
    articles: {
      ...initialArticlesState,
      list: [testArticleInfo1],
    },
    editor: initialEditorState,
  }

  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      editor: editorReducer,
    },
    preloadedState,
  })

  const r = render(RenderWithProviders(<ArticleListPage />, store))
  const titleCell = r.getByText('The Great title')
  expect(titleCell).toBeTruthy()
})

it('can render rows according to article info data', async () => {
  const testArticleInfo1 = {
    id: '123',
    title: 'The Great title',
    author: 'Lord Authorus',
    dateOfPublication: '2025-02-11',
  }
  const testArticleInfo2 = {
    id: '456',
    title: 'The not so great title',
    author: 'Lord Titlus',
    dateOfPublication: '2025-02-12',
  }

  const preloadedState: RootState = {
    articles: {
      ...initialArticlesState,
      list: [testArticleInfo1, testArticleInfo2],
    },
    editor: initialEditorState,
  }

  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      editor: editorReducer,
    },
    preloadedState,
  })

  const r = render(RenderWithProviders(<ArticleListPage />, store))
  const tableBody = r.getByTestId('table-body')
  expect(tableBody.childElementCount).toBe(2)
})

it('can create a new article', async () => {
  const oldSelectedArticle = {
    id: '789',
    title: 'Another title',
    author: 'Lord Publicatus',
    dateOfPublication: '2025-02-12',
    text: 'Old selected article text',
  }

  const preloadedState: RootState = {
    articles: { ...initialArticlesState, selectedArticle: oldSelectedArticle },
    editor: initialEditorState,
  }

  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      editor: editorReducer,
    },
    preloadedState,
  })

  const r = render(RenderWithProviders(<ArticleListPage />, store))
  const newButton = r.getByText('new')
  fireEvent.click(newButton)
  expect(store.getState().editor.mode).toBe('edit')
  expect(store.getState().articles.selectedArticle).toEqual({
    id: '',
    title: '',
    author: '',
    text: '',
    dateOfPublication: dayjs().format('YYYY-MM-DD'),
  })
})
