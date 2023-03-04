import { ChangeEvent, cloneElement } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { QuestionOptionState } from 'types/sliceStateType'
import { RootState } from 'store'

import { WarningIcon, XIcon } from 'assets/svgs'
import styles from './choosingOptions.module.scss'

interface ChoosingOptionsProps {
  children: JSX.Element
  type: string
  formIndex: number
  options: QuestionOptionState[]
  sameOptionError?: { place: string; error: boolean }
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteQuestionOptionClick?: (name: string) => void
  handleDeleteEtcClick?: () => void
}

const ChoosingOptions = ({
  children,
  type,
  formIndex,
  options,
  sameOptionError,
  handleQuestionOptionChange,
  handleDeleteQuestionOptionClick,
  handleDeleteEtcClick,
}: ChoosingOptionsProps) => {
  const { etcOption, answer } = useSelector((state: RootState) => state.question.questionInfos[formIndex])

  return (
    <ul className={styles.checkBox}>
      {options.map((option, index) => {
        return (
          <li key={option.name} className={styles.checkBoxItem}>
            <div className={styles.valueInput}>
              {cloneElement(children, { option })}
              {type === 'preview' && <label htmlFor={`${option.name}`}>{option.value}</label>}
              {type === 'answer' && (
                <label className={cx({ selectedAnswer: option.name === answer })} htmlFor={`${option.name}`}>
                  {option.value}
                </label>
              )}
              {type === 'question' && handleDeleteQuestionOptionClick && (
                <input type='text' name={option.name} value={option.value} onChange={handleQuestionOptionChange} />
              )}
            </div>
            {type === 'question' && handleDeleteQuestionOptionClick && (options.length !== 1 || index !== 0) && (
              <>
                {sameOptionError?.error && sameOptionError.place === option.name && (
                  <WarningIcon className={styles.warningIcon} />
                )}
                <XIcon className={styles.xIcon} onClick={() => handleDeleteQuestionOptionClick(option.name)} />
              </>
            )}
          </li>
        )
      })}
      {etcOption.value && (
        <li className='etcOption'>
          <input type='text' placeholder='기타...' disabled={type === 'question' || type === 'answer'} />
          {type === 'question' && <XIcon className={styles.xIcon} onClick={handleDeleteEtcClick} />}
        </li>
      )}
    </ul>
  )
}

export default ChoosingOptions
