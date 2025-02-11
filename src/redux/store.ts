import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articles/articlesSlice'
import editorReducer from './slices/editor/editorSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    editor: editorReducer,
  },
})

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
