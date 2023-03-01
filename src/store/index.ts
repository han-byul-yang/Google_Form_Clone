import { configureStore } from '@reduxjs/toolkit'

import questionSlice from './questionSlice'
import titleSlice from './titleSlice'

const store = configureStore({
  reducer: {
    question: questionSlice.reducer,
    title: titleSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
