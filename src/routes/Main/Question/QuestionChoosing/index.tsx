import { ChangeEvent, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { addEtcOption, addOption, deleteEtcOption, deleteOption, editOption } from 'store/questionSlice'

import { CircleIcon, CheckBoxOutlineIcon, DropdownIcon, XIcon } from 'assets/svgs'
import styles from './questionChoosing.module.scss'

interface QuestionChoosingProps {
  formIndex: number
}

const optionTypeIcons = (option: string) =>
  ({
    '객관식 질문': <CircleIcon className={styles.optionTypeIcon} />,
    체크박스: <CheckBoxOutlineIcon className={styles.optionTypeIcon} />,
    드롭다운: <DropdownIcon className={styles.optionTypeIcon} />,
  }[option])

const QuestionChoosing = ({ formIndex }: QuestionChoosingProps) => {
  const [isAddEtcOption, setIsAddEtcOption] = useState(false)
  const { type: questionType, options: optionsInput } = useSelector(
    (state: RootState) => state.question.questionInfos[formIndex]
  )
  const dispatch = useDispatch()
  const optionCountRef = useRef(1)

  const handleOptionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    dispatch(editOption({ index: formIndex, option: { name, value } }))
  }

  const handleDeleteOptionClick = (name: string) => {
    dispatch(deleteOption({ index: formIndex, name }))
  }

  const handleDeleteEtcClick = () => {
    setIsAddEtcOption(false)
    dispatch(deleteEtcOption({ index: formIndex }))
  }

  const handleAddOptionClick = () => {
    optionCountRef.current += 1
    const option = { name: `옵션${optionCountRef.current}`, value: `옵션${optionCountRef.current}` }
    dispatch(addOption({ index: formIndex, option, etcOption: isAddEtcOption }))
  }

  const handleAddEtcClick = () => {
    setIsAddEtcOption(true)
    dispatch(addEtcOption({ index: formIndex }))
  }

  return (
    <div className={styles.optionTypeBox}>
      <ul className={styles.options}>
        {optionsInput.map((option, index) => {
          const optionKey = `option-${index}`
          return (
            <li key={optionKey}>
              <div className={styles.optionInput}>
                {optionTypeIcons(questionType.name)}
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
            {optionTypeIcons(questionType.name)}
            <p>기타...</p>
            <XIcon className={styles.xIcon} onClick={handleDeleteEtcClick} />
          </li>
        )}
      </ul>
      <p className={styles.addOptions}>
        {optionTypeIcons(questionType.name)}
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
