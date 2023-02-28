import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import useClickOutside from 'hooks/useClickOutside'
import ContainerBox from 'components/ContainerBox'

import { CheckBoxIcon, CircleIcon, DropdownIcon, ParagraphIcon, ShortTextIcon } from 'assets/svgs'
import styles from './question.module.scss'

const questionTypes = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운']
const dropdownIcons = (type: string) =>
  ({
    단답형: <ShortTextIcon className={styles.dropdownIcon} />,
    장문형: <ParagraphIcon className={styles.dropdownIcon} />,
    '객관식 질문': <CircleIcon className={styles.dropdownIcon} />,
    체크박스: <CheckBoxIcon className={styles.dropdownIcon} />,
    드롭다운: <DropdownIcon className={styles.dropdownIcon} />,
  }[type])

const Question = () => {
  const [questionInput, setQuestionInput] = useState('제목 없는 질문')
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [selectedDropdownType, setSelectedDropdownType] = useState({ type: '객관식 질문', order: 2 })
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenDropdown(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleQuestionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(e.currentTarget.value)
  }

  const handleOpenDropdownClick = () => {
    setIsOpenDropdown(true)
  }

  const handleTypeDropdownClick = (type: string, order: number) => {
    setSelectedDropdownType({ type, order })
    setIsOpenDropdown(false)
  }

  const dropdownTypeItem = useCallback((type: string) => {
    return (
      <>
        {dropdownIcons(type)}
        <p>{type}</p>
      </>
    )
  }, [])

  return (
    <ContainerBox boxType='question'>
      <div className={styles.questionHeader}>
        <input
          className={styles.question}
          placeholder='질문'
          value={questionInput}
          onChange={handleQuestionInputChange}
        />
        {/* <QuestionTypeDropdown /> */}
        <div className={styles.dropdownBox}>
          <p className={styles.selectedType}>
            <button type='button' onClick={handleOpenDropdownClick}>
              {dropdownTypeItem(selectedDropdownType.type)}
            </button>
          </p>
          {isOpenDropdown && (
            <ul className={styles.dropdown} ref={containerRef} style={{ top: -(selectedDropdownType.order * 40) }}>
              {questionTypes.map((type, index) => {
                const typeKey = `typeKey-${index}`

                return (
                  <li key={typeKey}>
                    <button type='button' onClick={() => handleTypeDropdownClick(type, index)}>
                      {dropdownTypeItem(type)}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </ContainerBox>
  )
}

export default Question
