import { createSlice } from '@reduxjs/toolkit'

import { QuestionState } from 'types/sliceStateType'

const initialState = {
  questionInfos: [
    {
      id: Date.now(),
      title: '제목 없는 질문',
      type: '객관식 질문',
      essential: false,
      options: [{ name: '옵션1', value: '옵션1' }],
      etcOption: { name: '기타', value: false },
      answer: '',
    },
  ],
} as QuestionState

const questionSlice = createSlice({
  name: 'questionSlice',
  initialState,
  reducers: {
    addQuestionInfo: (state, action) => {
      const { index, id } = action.payload
      const newQuestionInfo = { ...initialState.questionInfos[0], id }
      state.questionInfos.splice(index + 1, 0, newQuestionInfo)
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
      if (type === '체크박스') state.questionInfos[index].answer = ['']
    },
    addOption: (state, action) => {
      const { index, option } = action.payload
      const optionLength = state.questionInfos[index].options.length
      state.questionInfos[index].options.splice(optionLength, 0, option)
    },
    editOption: (state, action) => {
      const { index, option } = action.payload
      const optionIndex = state.questionInfos[index].options.findIndex((item) => item.name === option.name)
      const optionsValues = state.questionInfos[index].options.map((infoOption) => infoOption.value)
      if (optionIndex === -1) return
      if (optionsValues.includes(option.value)) return
      state.questionInfos[index].options[optionIndex] = option
    },
    deleteOption: (state, action) => {
      const { index, name } = action.payload
      const optionIndex = state.questionInfos[index].options.findIndex((item) => item.name === name)
      state.questionInfos[index].options.splice(optionIndex, 1)
    },
    addEtcOption: (state, action) => {
      const { index } = action.payload
      const etcOption = { name: '기타', value: true }
      state.questionInfos[index].etcOption = etcOption
    },
    deleteEtcOption: (state, action) => {
      const { index } = action.payload
      const etcOption = { name: '기타', value: false }
      state.questionInfos[index].etcOption = etcOption
    },
    setEssential: (state, action) => {
      const { index, essential } = action.payload
      state.questionInfos[index].essential = essential
    },
    setAnswer: (state, action) => {
      const { index, answer } = action.payload
      state.questionInfos[index].answer = answer
    },
    deleteAllAnswers: (state) => {
      const deletedAnswers = state.questionInfos.map((info) => {
        if (typeof info.answer === 'string') return { ...info, answer: '' }
        return { ...info, answer: [''] }
      })
      state.questionInfos = deletedAnswers
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
  setAnswer,
  deleteAllAnswers,
} = questionSlice.actions
export default questionSlice
