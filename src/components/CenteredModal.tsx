import { Modal } from '@mui/material'
import { tss } from 'tss-react/mui'

interface CenteredModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function CenteredModal({ open, onClose, children }: CenteredModalProps) {
  const { classes } = useStyles()
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modal}>{children}</div>
    </Modal>
  )
}

const useStyles = tss.withName('centered-modal').create(({ theme }) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
}))
