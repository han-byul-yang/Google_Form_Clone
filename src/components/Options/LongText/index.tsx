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
      disabled={type === 'question' || type === 'answer'}
    />
  )
}

export default LongText
