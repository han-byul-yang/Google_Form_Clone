import { useSelector } from 'react-redux'

import { RootState } from 'store'
import AnswerOption from './AnswerOption'

import styles from './answer.module.scss'

const Answer = () => {
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)

  return (
    <form className={styles.answerForm}>
      <p className={styles.titleAnswer}>* 사용자 답변 내용 *</p>
      <ul className={styles.questionAnswers}>
        {questionInfos.map((questionInfo, index) => {
          const questionInfoKey = `questionInfo-${index}`
          return (
            <li key={questionInfoKey} className={styles.questionAnswerItem}>
              <div className={styles.questionTitleBox}>
                <p className={styles.questionTitle}>{questionInfo.title}</p>
                {questionInfo.essential && <p className={styles.essential}>*</p>}
              </div>
              {questionInfo.answer ? (
                <AnswerOption questionInfo={questionInfo} formIndex={index} />
              ) : (
                <p className={styles.noAnswer}>* 무응답</p>
              )}
            </li>
          )
        })}
      </ul>
    </form>
  )
}

export default Answer
