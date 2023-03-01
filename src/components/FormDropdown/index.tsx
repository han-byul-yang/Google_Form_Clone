import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import useClickOutside from 'hooks/useClickOutside'
import { addType } from 'store/questionSlice'

import { CheckBoxIcon, DropdownIcon, FullCircleIcon, ParagraphIcon, ShortTextIcon } from 'assets/svgs'
import styles from './formDropdown.module.scss'

interface FormDropdownProps {
  formIndex: number
}

const questionTypes = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운']
const dropdownIcons = (type: string) =>
  ({
    단답형: <ShortTextIcon className={styles.dropdownIcon} />,
    장문형: <ParagraphIcon className={styles.dropdownIcon} />,
    '객관식 질문': <FullCircleIcon className={styles.dropdownIcon} />,
    체크박스: <CheckBoxIcon className={styles.dropdownIcon} />,
    드롭다운: <DropdownIcon className={styles.dropdownIcon} />,
  }[type])

const FormDropdown = ({ formIndex }: FormDropdownProps) => {
  const [selectedDropdownType, setSelectedDropdownType] = useState({ type: '객관식 질문', order: 2 })
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const dispatch = useDispatch()
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenDropdown(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleOpenDropdownClick = () => {
    setIsOpenDropdown(true)
  }

  const handleTypeDropdownClick = (type: string, order: number) => {
    setSelectedDropdownType({ type, order })
    dispatch(addType({ index: formIndex, type }))
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
  )
}

export default FormDropdown
