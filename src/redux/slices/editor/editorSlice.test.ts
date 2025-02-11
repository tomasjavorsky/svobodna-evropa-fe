import { describe, expect, it } from 'vitest'

import editorReducer, { initialState, setMode } from './editorSlice'

describe('articles slice', () => {
  it('has correct initial state', () => {
    expect(editorReducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('can create new blank article', () => {
    expect(
      editorReducer(
        {
          ...initialState,
          mode: 'edit',
        },
        setMode('view')
      )
    ).toEqual({
      ...initialState,
      mode: 'view',
    })
  })
})
