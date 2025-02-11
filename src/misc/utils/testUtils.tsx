import '../translations/i18n'

import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import App from '../../App'
import ErrorPage from '../../pages/ErrorPage'
import { store, StoreType } from '../../redux/store'
import { ThemeProvider } from '../theme/ThemeProvider'

export const RenderWithProviders = (
  customComponent?: React.ReactNode,
  customStore?: StoreType
) => (
  <BrowserRouter>
    <Provider store={customStore ?? store}>
      <ThemeProvider>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          {customComponent ?? <App />}
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
