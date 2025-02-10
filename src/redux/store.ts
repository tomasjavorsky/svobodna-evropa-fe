import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articlesSlice'
import editorReducer from './slices/editorSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    editor: editorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
