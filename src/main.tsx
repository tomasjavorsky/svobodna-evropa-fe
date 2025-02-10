import './misc/translations/i18n'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import { ThemeProvider } from './misc/theme/ThemeProvider.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
