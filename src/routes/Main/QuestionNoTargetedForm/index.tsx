import { QuestionInfo } from 'types/sliceStateType'
import NoTargetedOption from './NoTargetedOption'

import styles from './questionNoTargetedForm.module.scss'

interface QuestionNoTargetedFormProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const QuestionNoTargetedForm = ({ questionInfo, formIndex }: QuestionNoTargetedFormProps) => {
  return (
    <form className={styles.noTargetedForm}>
      <p className={styles.questionTitle}>{questionInfo.title}</p>
      <NoTargetedOption questionInfo={questionInfo} formIndex={formIndex} />
    </form>
  )
}
export default QuestionNoTargetedForm
