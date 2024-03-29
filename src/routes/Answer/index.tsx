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
          return (
            <li key={questionInfo.id} className={styles.questionAnswerItem}>
              <div className={styles.questionTitleBox}>
                <p className={styles.questionTitle}>{questionInfo.title}</p>
                {questionInfo.essential && <p className={styles.essential}>*</p>}
              </div>
              {!questionInfo.etcAnswer && (!questionInfo.answer.length || !questionInfo.answer) ? (
                <p className={styles.noAnswer}>* 미응답</p>
              ) : (
                <AnswerOption formIndex={index} />
              )}
            </li>
          )
        })}
      </ul>
    </form>
  )
}

export default Answer
