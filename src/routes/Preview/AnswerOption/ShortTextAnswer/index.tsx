import { FormEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'

import styles from './shortTextAnswer.module.scss'

interface ShortTextAnswerProps {
  handleSetAnswerChange: (e: FormEvent<HTMLInputElement>) => void
  answer: string
}

const ShortTextAnswer = ({ handleSetAnswerChange, answer }: ShortTextAnswerProps) => {
  return <input type='text' value={answer} onChange={handleSetAnswerChange} />
}

export default ShortTextAnswer
