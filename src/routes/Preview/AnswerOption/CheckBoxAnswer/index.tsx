import { ChangeEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'

import styles from './checkBoxAnswer.module.scss'

interface CheckBoxAnswerProps {
  answerOptions: QuestionOptionState[]
  handleSetAnswerChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckBoxAnswer = ({ answerOptions, handleSetAnswerChange }: CheckBoxAnswerProps) => {
  return (
    <>
      {answerOptions.map((option, index) => {
        const answerOptionKey = `answerOption-${index}`
        return (
          <div key={answerOptionKey} className={styles.checkBox}>
            <input
              type='checkbox'
              id={`${option.name}`}
              name={`${option.name}`}
              value={`${option.value}`}
              onChange={handleSetAnswerChange}
            />
            <label htmlFor={`${option.name}`}>{option.value}</label>
          </div>
        )
      })}
    </>
  )
}

export default CheckBoxAnswer
