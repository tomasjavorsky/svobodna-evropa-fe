import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton } from '@mui/material'
import { useContext } from 'react'

import { ThemeContext } from '../misc/theme/ThemeContext'

export function ThemeToggle() {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider')
  }

  const { darkMode, toggleTheme } = themeContext

  return (
    <IconButton size="small" onClick={toggleTheme}>
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}
