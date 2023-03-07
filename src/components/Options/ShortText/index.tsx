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
      className={styles.shortText}
      type='text'
      value={answer}
      onChange={handlePreviewOptionChange}
      placeholder={type === 'question' ? '단답형 텍스트' : '내 답변'}
      disabled={type === 'question' || type === 'noTarget' || type === 'answer'}
    />
  )
}

export default ShortText
