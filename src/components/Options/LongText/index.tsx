import { ChangeEvent } from 'react'

import styles from './longText.module.scss'

interface ShortTextProps {
  type: string
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  answer?: string
}

const LongText = ({ type, handlePreviewOptionChange, answer }: ShortTextProps) => {
  return (
    <textarea
      className={styles.longText}
      value={answer}
      onChange={handlePreviewOptionChange}
      placeholder={type === 'question' ? '장문형 텍스트' : '내 답변'}
      disabled={type === 'question' || type === 'noTarget' || type === 'answer'}
    />
  )
}

export default LongText
