import { fireEvent, render } from '@testing-library/react'
import { expect, it } from 'vitest'

import { RenderWithProviders } from '../../misc/utils/testUtils'
import EditMode from './EditMode'

it('shows confirm dialog when cancelling an edit', async () => {
  const r = render(RenderWithProviders(<EditMode />))
  const cancelButton = await r.findByText('cancel')
  fireEvent.click(cancelButton)
  const modalText = await r.findByText(
    'Do you really want to discard changes ?'
  )

  expect(modalText).toBeTruthy()
})
