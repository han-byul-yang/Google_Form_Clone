import { FormEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'

import styles from './shortTextAnswer.module.scss'

interface ShortTextProps {
  type: string
  handlePreviewOptionChange?: (e: FormEvent<HTMLInputElement>) => void
  answer?: string
}

const ShortText = ({ type, handlePreviewOptionChange, answer }: ShortTextProps) => {
  return (
    <input
      type='text'
      value={answer}
      onChange={handlePreviewOptionChange}
      disabled={type === 'question' || type === 'answer'}
    />
  )
}

export default ShortText
