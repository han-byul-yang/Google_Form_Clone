import { useSelector } from 'react-redux'

import { RootState } from 'store'

import styles from './questionWriting.module.scss'

interface QuestionWritingProps {
  formIndex: number
}

const QuestionWriting = ({ formIndex }: QuestionWritingProps) => {
  const { type: questionType } = useSelector((state: RootState) => state.question.questionInfos[formIndex])

  return (
    <div className={styles.textTypeBox}>
      {questionType === '단답형' ? (
        <p className={styles.shortText}>단답형 텍스트</p>
      ) : (
        <p className={styles.longText}>장문형 텍스트</p>
      )}
    </div>
  )
}

export default QuestionWriting
