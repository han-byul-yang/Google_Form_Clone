import { ChangeEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'

import styles from './objectiveAnswer.module.scss'

interface ObjectiveAnswerProps {
  answerOptions: QuestionOptionState[]
  handleSetAnswerChange: (e: ChangeEvent<HTMLInputElement>) => void
  index: number
}

const ObjectiveAnswer = ({ answerOptions, handleSetAnswerChange, index: optionName }: ObjectiveAnswerProps) => {
  return (
    <>
      {answerOptions.map((option, index) => {
        const answerOptionKey = `answerOption-${index}`
        return (
          <div key={answerOptionKey} className={styles.radio}>
            <input type='radio' id={`${option.name}`} name={`${optionName}`} value={`${option.value}`} />
            <label htmlFor={`${option.name}`}>{option.value}</label>
          </div>
        )
      })}
    </>
  )
}

export default ObjectiveAnswer
