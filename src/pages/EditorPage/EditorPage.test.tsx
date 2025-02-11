import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render } from '@testing-library/react'
import { expect, it } from 'vitest'

import { RenderWithProviders } from '../../misc/utils/testUtils'
import articlesReducer, {
  initialState as initialArticlesState,
} from '../../redux/slices/articles/articlesSlice'
import editorReducer, {
  initialState as initialEditorState,
} from '../../redux/slices/editor/editorSlice'
import { RootState } from '../../redux/store'
import EditorPage from './EditorPage'

it('can switch to edit mode', async () => {
  const testArticle = {
    id: '123',
    title: 'The Great title',
    author: 'Lord Authorus',
    dateOfPublication: '2025-02-11',
    text: 'Lorem ipsum',
  }

  const preloadedState: RootState = {
    articles: { ...initialArticlesState, selectedArticle: testArticle },
    editor: initialEditorState,
  }

  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      editor: editorReducer,
    },
    preloadedState,
  })

  const r = render(RenderWithProviders(<EditorPage />, store))
  const editButton = r.getByText('edit')
  fireEvent.click(editButton)

  expect(r.queryByText('edit')).toBeNull()
  expect(store.getState().editor.mode).toEqual('edit')
})

it('can switch back to view mode', async () => {
  const testArticle = {
    id: '123',
    title: 'The Great title',
    author: 'Lord Authorus',
    dateOfPublication: '2025-02-11',
    text: 'Lorem ipsum',
  }

  const preloadedState: RootState = {
    articles: { ...initialArticlesState, selectedArticle: testArticle },
    editor: { ...initialEditorState, mode: 'edit' },
  }

  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      editor: editorReducer,
    },
    preloadedState,
  })

  const r = render(RenderWithProviders(<EditorPage />, store))
  const cancelButton = r.getByText('cancel')
  fireEvent.click(cancelButton)
  const discardButton = r.getByText('discard')
  fireEvent.click(discardButton)

  expect(r.getByText('edit')).toBeTruthy()
  expect(store.getState().editor.mode).toEqual('view')
})
