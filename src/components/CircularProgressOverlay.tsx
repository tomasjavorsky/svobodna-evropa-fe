import { CircularProgress } from '@mui/material'

export function CircularProgressOverlay() {
  return (
    <CircularProgress
      size={24}
      sx={(theme) => ({
        color: theme.palette.background.paper,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      })}
    />
  )
}
