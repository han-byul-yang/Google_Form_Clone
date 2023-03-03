import { ChangeEvent } from 'react'

import styles from './longText.module.scss'

interface ShortTextAnswerProps {
  handleSetAnswerChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  answer: string
}

const LongTextAnswer = ({ handleSetAnswerChange, answer }: ShortTextAnswerProps) => {
  return <textarea className={styles.longText} value={answer} onChange={handleSetAnswerChange} />
}

export default LongTextAnswer
