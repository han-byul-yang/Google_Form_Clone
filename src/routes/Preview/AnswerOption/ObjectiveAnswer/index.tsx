import { QuestionOptionState } from 'types/sliceStateType'

import styles from './objectiveAnswer.module.scss'

interface ObjectiveAnswerProps {
  answerOptions: QuestionOptionState[]
  index: number
}

const ObjectiveAnswer = ({ answerOptions, index: optionName }: ObjectiveAnswerProps) => {
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
