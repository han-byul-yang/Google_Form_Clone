import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { questionTypes, questionTypeIcons } from 'utils/questionTypes'
import { RootState } from 'store'
import { addTitle, addType } from 'store/questionSlice'
import FormDropdown from 'components/FormDropdown'
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
  const dropdownAction = (type: string) => addType({ index: formIndex, type })

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
        <FormDropdown
          items={questionTypes}
          icons={questionTypeIcons}
          selectedState={questionType}
          action={dropdownAction}
        />
      </div>
      <QuestionOption questionType={questionType} formIndex={formIndex} />
      <QuestionFooter formIndex={formIndex} />
    </form>
  )
}

export default Question
