import { useState } from 'react'

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
  const [options, setOptions] = useState(['옵션1'])
  const [isAddEtcOption, setIsAddEtcOption] = useState(false)

  const handleAddOptionClick = () => {
    setOptions((prevOptions) => [...prevOptions, `옵션${prevOptions.length + 1}`])
  }

  const handleAddEtcClick = () => {
    setIsAddEtcOption(true)
  }

  return (
    <div className={styles.optionTypeBox}>
      <ul className={styles.options}>
        {options.map((option, index) => {
          const optionKey = `option-${index}`
          return (
            <li key={optionKey}>
              <div className={styles.optionInput}>
                {optionTypeIcons(questionType)}
                <input type='text' value={option} />
              </div>
              <XIcon className={styles.xIcon} />
            </li>
          )
        })}
        {isAddEtcOption && (
          <li className={styles.etcOption}>
            {optionTypeIcons(questionType)}
            <p>기타...</p>
            <XIcon className={styles.xIcon} />
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
