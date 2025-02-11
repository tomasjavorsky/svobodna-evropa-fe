import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'

type EditorMode = 'view' | 'edit'

interface EditorState {
  mode: EditorMode
}

export const initialState: EditorState = {
  mode: 'view',
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<EditorMode>) => {
      state.mode = action.payload
    },
  },
})

export const { setMode } = editorSlice.actions
export default editorSlice.reducer

export const selectEditorMode = (state: RootState) => state.editor.mode
