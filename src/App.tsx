import { CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

const ArticleListPage = lazy(
  () => import('./pages/ArticleListPage/ArticleListPage')
)
const EditorPage = lazy(() => import('./pages/EditorPage/EditorPage'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route index element={<Navigate to="/list" />} />
        <Route path="article">
          <Route path=":id" element={<EditorPage />} />
          <Route path="new" element={<EditorPage />} />
        </Route>
        <Route path="list">
          <Route index element={<ArticleListPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
