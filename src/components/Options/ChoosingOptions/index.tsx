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
  handleEtcAnswerChange?: (e: ChangeEvent<HTMLInputElement>) => void
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
  handleEtcAnswerChange,
  handleQuestionOptionChange,
  handleDeleteQuestionOptionClick,
  handleDeleteEtcClick,
}: ChoosingOptionsProps) => {
  const { etcOption, answer, etcAnswer } = useSelector((state: RootState) => state.question.questionInfos[formIndex])

  return (
    <ul className={styles.checkBox}>
      {options.map((option, index) => {
        return (
          <li key={option.name} className={styles.checkBoxItem}>
            <div className={styles.valueInput}>
              {cloneElement(children, { option })}
              {type === 'preview' && <label htmlFor={`${formIndex}-${option.name}`}>{option.value}</label>}
              {(type === 'answer' || type === 'noTarget') && (
                <label
                  className={
                    type === 'answer'
                      ? cx({
                          [styles.selectedAnswer]:
                            option.value === (answer as string) || (answer as string[]).includes(option.value),
                        })
                      : undefined
                  }
                  htmlFor={`${option.name}`}
                >
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
        <li className={styles.etcOption}>
          {cloneElement(children)}
          <input
            type='text'
            className={cx({ [styles.etcActive]: type === 'answer' && !!etcAnswer })}
            placeholder='기타...'
            value={type === 'noTarget' || type === 'question' ? '' : etcAnswer}
            disabled={type === 'question' || type === 'answer'}
            onChange={handleEtcAnswerChange}
          />
          {type === 'question' && <XIcon className={styles.xIcon} onClick={handleDeleteEtcClick} />}
        </li>
      )}
    </ul>
  )
}

export default ChoosingOptions
