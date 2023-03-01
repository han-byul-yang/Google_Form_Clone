import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { addTitle } from 'store/questionSlice'
import FormDropdown from 'components/FormDropdown'
import QuestionWriting from './QuestionWriting'
import QuestionChoosing from './QuestionChoosing'
import QuestionFooter from './QuestionFooter'

import styles from './question.module.scss'

interface QuestionProps {
  questionInfoIndex: number
}

const Question = ({ questionInfoIndex: formIndex }: QuestionProps) => {
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
      {questionType.name === '단답형' || questionType.name === '장문형' ? (
        <QuestionWriting formIndex={formIndex} />
      ) : (
        <QuestionChoosing formIndex={formIndex} />
      )}
      <QuestionFooter formIndex={formIndex} />
    </form>
  )
}

export default Question
