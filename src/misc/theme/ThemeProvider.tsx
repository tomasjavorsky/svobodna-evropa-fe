import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ReactNode, useMemo, useState } from 'react'

import { darkTheme, lightTheme } from './theme'
import { ThemeContext } from './ThemeContext'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode])

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
