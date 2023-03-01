import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { addTitle } from 'store/questionSlice'
import FormDropdown from 'components/FormDropdown'
import QuestionWriting from './QuestionWriting'
import QuestionChoosing from './QuestionChoosing'

import styles from './question.module.scss'

interface QuestionProps {
  formIndex?: number
}

const Question = ({ formIndex = 0 }: QuestionProps) => {
  const [questionTitleInput, setQuestionTitleInput] = useState('제목 없는 질문')
  const questionType = useSelector((state: RootState) => state.question.questionInfos[formIndex].type)
  const dispatch = useDispatch()

  const handleQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionTitleInput(e.currentTarget.value)
    dispatch(addTitle({ index: formIndex, title: questionTitleInput }))
  }

  return (
    <form className={styles.questionForm}>
      <div className={styles.questionHeader}>
        <input
          className={styles.question}
          placeholder='질문'
          value={questionTitleInput}
          onChange={handleQuestionInputChange}
        />
        <FormDropdown formIndex={formIndex} />
      </div>
      {questionType === '단답형' || questionType === '장문형' ? (
        <QuestionWriting questionType={questionType} />
      ) : (
        <QuestionChoosing questionType={questionType} />
      )}
    </form>
  )
}

export default Question
