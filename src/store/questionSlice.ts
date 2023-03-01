import { createSlice } from '@reduxjs/toolkit'

import { QuestionState } from 'types/sliceStateType'

const initialState = {
  questionInfos: [
    {
      id: Date.now(),
      title: '제목 없는 질문',
      type: { name: '객관식 질문', order: 2 },
      essential: false,
      options: [{ name: '옵션1', value: '옵션1' }],
    },
  ],
} as QuestionState

const questionSlice = createSlice({
  name: 'questionSlice',
  initialState,
  reducers: {
    addQuestionInfo: (state, action) => {
      const { index } = action.payload
      state.questionInfos.splice(index + 1, 0, initialState.questionInfos[0])
    },
    copyQuestionInfo: (state, action) => {
      const { index, questionInfos } = action.payload
      state.questionInfos.splice(index + 1, 0, questionInfos)
    },
    deleteQuestionInfo: (state, action) => {
      const { index } = action.payload
      state.questionInfos.splice(index, 1)
    },
    addTitle: (state, action) => {
      const { index, title } = action.payload
      state.questionInfos[index].title = title
    },
    addType: (state, action) => {
      const { index, type } = action.payload
      state.questionInfos[index].type = type
    },
    addOption: (state, action) => {
      const { index, option, etcOption } = action.payload
      const optionLength = state.questionInfos[index].options.length
      if (etcOption) state.questionInfos[index].options.splice(optionLength - 1, 0, option)
      else state.questionInfos[index].options.splice(optionLength, 0, option)
    },
    editOption: (state, action) => {
      const { index, option } = action.payload
      const optionIndex = state.questionInfos[index].options.findIndex((item) => item.name === option.name)
      if (optionIndex === -1) return
      state.questionInfos[index].options[optionIndex] = option
    },
    deleteOption: (state, action) => {
      const { index, name } = action.payload
      const optionIndex = state.questionInfos[index].options.findIndex((item) => item.name === name)
      state.questionInfos[index].options.splice(optionIndex, 1)
    },
    addEtcOption: (state, action) => {
      const { index } = action.payload
      const optionLength = state.questionInfos[index].options.length
      const etcOption = { name: '기타', value: '기타' }
      state.questionInfos[index].options.splice(optionLength, 0, etcOption)
    },
    deleteEtcOption: (state, action) => {
      const { index } = action.payload
      const optionLength = state.questionInfos[index].options.length
      state.questionInfos[index].options.splice(optionLength, 1)
    },
    setEssential: (state, action) => {
      const { index, essential } = action.payload
      state.questionInfos[index].essential = essential
    },
  },
})

export const {
  addQuestionInfo,
  copyQuestionInfo,
  deleteQuestionInfo,
  addTitle,
  addType,
  addOption,
  editOption,
  deleteOption,
  addEtcOption,
  deleteEtcOption,
  setEssential,
} = questionSlice.actions
export default questionSlice
