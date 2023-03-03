import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { addTitle } from 'store/questionSlice'
import FormDropdown from 'components/FormDropdown'
import QuestionWriting from './QuestionWriting'
import QuestionChoosing from './QuestionChoosing'
import QuestionOption from './QuestionOption'
import QuestionFooter from './QuestionFooter'

import styles from './question.module.scss'

interface QuestionProps {
  formIndex: number
}

const Question = ({ formIndex }: QuestionProps) => {
  const { type: questionType, title: questionTitle } = useSelector(
    (state: RootState) => state.question.questionInfos[formIndex]
  )
  const dispatch = useDispatch()

  const handleQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addTitle({ index: formIndex, title: e.currentTarget.value }))
  }

  return (
    <form className={styles.questionForm}>
      <div className={styles.questionHeader}>
        <input
          className={styles.question}
          placeholder='질문'
          value={questionTitle}
          onChange={handleQuestionInputChange}
        />
        <FormDropdown formIndex={formIndex} />
      </div>
      {/* questionType.name === '단답형' || questionType.name === '장문형' ? (
        <QuestionWriting formIndex={formIndex} />
      ) : (
        <QuestionChoosing formIndex={formIndex} />
      ) */}
      <QuestionOption questionType={questionType.name} formIndex={formIndex} />
      <QuestionFooter formIndex={formIndex} />
    </form>
  )
}

export default Question
