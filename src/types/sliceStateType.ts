export interface QuestionTypeState {
  name: string
  order: number
}

export interface QuestionOptionState {
  name: string
  value: string
}

export interface QuestionState {
  questionInfos: {
    id: number
    title: string
    type: QuestionTypeState
    essential: boolean
    options: QuestionOptionState[]
  }[]
}

export interface TitleState {
  titleInfo: {
    title: string
    description: string
  }
}
