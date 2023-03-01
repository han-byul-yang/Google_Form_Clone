import { createSlice } from '@reduxjs/toolkit'

import { TitleState } from 'types/sliceStateType'

const initialState = {
  titleInfo: {
    title: '제목 없는 설문지',
    description: '',
  },
} as TitleState

const titleSlice = createSlice({
  name: 'titleSlice',
  initialState,
  reducers: {
    addTitle: (state, action) => {
      const { title } = action.payload
      state.titleInfo.title = title
    },
    addDescription: (state, action) => {
      const { description } = action.payload
      state.titleInfo.description = description
    },
  },
})

export const { addTitle, addDescription } = titleSlice.actions
export default titleSlice
