import { ChangeEvent, useRef, useState } from 'react'

import { CircleIcon, CheckBoxOutlineIcon, DropdownIcon, XIcon } from 'assets/svgs'
import styles from './questionChoosing.module.scss'

interface QuestionChoosingProps {
  questionType: string
}

const optionTypeIcons = (option: string) =>
  ({
    '객관식 질문': <CircleIcon className={styles.optionTypeIcon} />,
    체크박스: <CheckBoxOutlineIcon className={styles.optionTypeIcon} />,
    드롭다운: <DropdownIcon className={styles.optionTypeIcon} />,
  }[option])

const QuestionChoosing = ({ questionType }: QuestionChoosingProps) => {
  const [optionsInput, setOptionsInput] = useState([{ name: '옵션1', value: '옵션1' }])
  const [isAddEtcOption, setIsAddEtcOption] = useState(false)
  const optionCountRef = useRef(1)

  const handleOptionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setOptionsInput((prevOptions) =>
      prevOptions.map((prevOption) => {
        if (prevOption.name === name) return { ...prevOption, value }
        return prevOption
      })
    )
  }

  const handleDeleteOptionClick = (name: string) => {
    setOptionsInput((prevOptions) => prevOptions.filter((prevOption) => prevOption.name !== name))
  }

  const handleDeleteEtcClick = () => {
    setIsAddEtcOption(false)
  }

  const handleAddOptionClick = () => {
    optionCountRef.current += 1
    setOptionsInput((prevOptions) => [
      ...prevOptions,
      { name: `옵션${optionCountRef.current}`, value: `옵션${optionCountRef.current}` },
    ])
  }

  const handleAddEtcClick = () => {
    setIsAddEtcOption(true)
  }

  return (
    <div className={styles.optionTypeBox}>
      <ul className={styles.options}>
        {optionsInput.map((option, index) => {
          const optionKey = `option-${index}`
          return (
            <li key={optionKey}>
              <div className={styles.optionInput}>
                {optionTypeIcons(questionType)}
                <input type='text' name={option.name} value={option.value} onChange={handleOptionInputChange} />
              </div>
              {(optionsInput.length !== 1 || index !== 0) && (
                <XIcon className={styles.xIcon} onClick={() => handleDeleteOptionClick(option.name)} />
              )}
            </li>
          )
        })}
        {isAddEtcOption && (
          <li className={styles.etcOption}>
            {optionTypeIcons(questionType)}
            <p>기타...</p>
            <XIcon className={styles.xIcon} onClick={handleDeleteEtcClick} />
          </li>
        )}
      </ul>
      <p className={styles.addOptions}>
        {optionTypeIcons(questionType)}
        <button type='button' className={styles.addOption} onClick={handleAddOptionClick}>
          옵션 추가
        </button>
        {!isAddEtcOption && (
          <button type='button' className={styles.addEtc} onClick={handleAddEtcClick}>
            &apos;기타&apos; 추가
          </button>
        )}
      </p>
    </div>
  )
}

export default QuestionChoosing
