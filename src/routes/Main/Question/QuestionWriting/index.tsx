import styles from './questionWriting.module.scss'

interface QuestionWritingProps {
  questionType: string
}

const QuestionWriting = ({ questionType }: QuestionWritingProps) => {
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
