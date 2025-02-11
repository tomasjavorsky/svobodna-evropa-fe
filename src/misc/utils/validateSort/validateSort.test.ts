import { expect, test } from 'vitest'

import { validateSort } from './validateSort'

test('validates sort parameter', () => {
  expect(validateSort('')).toBeFalsy()
  expect(validateSort('description')).toBeFalsy()
  expect(validateSort('title')).toBeTruthy()
})
