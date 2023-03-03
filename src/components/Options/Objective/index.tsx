import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'store'
import { QuestionOptionState } from 'types/sliceStateType'

import { XIcon } from 'assets/svgs'
import styles from './objectiveAnswer.module.scss'

interface ObjectiveProps {
  type: string
  formIndex: number
  options: QuestionOptionState[]
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteEtcClick?: () => void
  handleDeleteQuestionOptionClick?: (name: string) => void
}

const Objective = ({
  type,
  formIndex,
  options,
  handlePreviewOptionChange,
  handleQuestionOptionChange,
  handleDeleteEtcClick,
  handleDeleteQuestionOptionClick,
}: ObjectiveProps) => {
  const { etcOption } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  console.log(type, options)
  return (
    <ul>
      {options.map((option, index) => {
        return (
          <li key={option.name} className={styles.radio}>
            <input
              type='radio'
              id={`${option.name}`}
              name={`${formIndex}`}
              value={`${option.value}`}
              onChange={handlePreviewOptionChange}
              disabled={type === 'question' || type === 'answer'}
            />
            {type === 'preview' && <label htmlFor={`${option.name}`}>{option.value}</label>}
            {type === 'question' && handleDeleteQuestionOptionClick && (
              <>
                <input type='text' name={option.name} value={option.value} onChange={handleQuestionOptionChange} />
                {(options.length !== 1 || index !== 0) && (
                  <XIcon className={styles.xIcon} onClick={() => handleDeleteQuestionOptionClick(option.name)} />
                )}
              </>
            )}
          </li>
        )
      })}
      {etcOption.value && (
        <li>
          <input placeholder='기타...' disabled={type === 'question' || type === 'answer'} />
          {type === 'question' && <XIcon className={styles.xIcon} onClick={handleDeleteEtcClick} />}
        </li>
      )}
    </ul>
  )
}

export default Objective
