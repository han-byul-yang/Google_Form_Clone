import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'store'
import { QuestionOptionState } from 'types/sliceStateType'

import { XIcon } from 'assets/svgs'
import styles from './dropdown.module.scss'

interface DropdownProps {
  type: string
  formIndex: number
  options: QuestionOptionState[]
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteEtcClick?: () => void
  handleDeleteQuestionOptionClick?: (name: string) => void
}

const Dropdown = ({
  type,
  formIndex,
  options,
  handleQuestionOptionChange,
  handleDeleteEtcClick,
  handleDeleteQuestionOptionClick,
}: DropdownProps) => {
  const { etcOption } = useSelector((state: RootState) => state.question.questionInfos[formIndex])

  return (
    <ul>
      {options.map((option, index) => {
        return (
          <li key={option.name} className={styles.dropdown}>
            <p>{option.name}</p>
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

export default Dropdown
