import { memo } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'store'
import NoTargetedOption from './NoTargetedOption'

import styles from './questionNoTargetedForm.module.scss'

interface QuestionNoTargetedFormProps {
  formIndex: number
}

const QuestionNoTargetedForm = ({ formIndex }: QuestionNoTargetedFormProps) => {
  const questionInfo = useSelector((state: RootState) => state.question.questionInfos[formIndex])

  return (
    <form className={styles.noTargetedForm}>
      <p className={styles.questionTitle}>{questionInfo.title}</p>
      <NoTargetedOption questionInfo={questionInfo} formIndex={formIndex} />
    </form>
  )
}
export default memo(QuestionNoTargetedForm)
