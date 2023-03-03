interface QuestionTypeState {
  name: string
  order: number
}

export interface QuestionOptionState {
  name: string
  value: string
}

export interface QuestionInfo {
  id: number
  title: string
  type: QuestionTypeState
  essential: boolean
  options: QuestionOptionState[]
  answer: string
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
