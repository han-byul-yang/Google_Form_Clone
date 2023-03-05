export interface QuestionOptionState {
  name: string
  value: string
}

interface QuestionEtcOptionState {
  name: string
  value: boolean
}

export interface QuestionInfo {
  id: number
  title: string
  type: string
  essential: boolean
  options: QuestionOptionState[]
  etcOption: QuestionEtcOptionState
  answer: string | string[]
}

export interface QuestionState {
  questionInfos: QuestionInfo[]
}

export interface TitleState {
  titleInfo: {
    title: string
    description: string
  }
}
