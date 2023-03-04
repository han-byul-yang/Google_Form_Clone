import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useClickTarget from 'hooks/useClickOutside'
import { RootState } from 'store'
import { addType } from 'store/questionSlice'

import styles from './formDropdown.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface FormDropdownProps {
  formIndex: number
  items: string[]
  icons?: (
    type: string,
    styles: {
      [className: string]: string
    }
  ) => JSX.Element | undefined
  selectedState: string
  action: any
}

const FormDropdown = ({ formIndex, items, icons, selectedState, action }: FormDropdownProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dispatch = useDispatch()
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenDropdown(false)
  }
  const { clickOutsideEvent } = useClickTarget({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleOpenDropdownClick = () => {
    setIsOpenDropdown(true)
  }

  const handleAnswerDropdownClick = (answer: string, index: number) => {
    dispatch(action(answer))
    setSelectedIndex(index)
    setIsOpenDropdown(false)
  }

  return (
    <div className={styles.dropdownBox}>
      <p className={styles.selectedType}>
        <button type='button' onClick={handleOpenDropdownClick}>
          {icons && icons(selectedState, styles)}
          <p>{selectedState || '선택하기'}</p>
        </button>
      </p>
      {isOpenDropdown && (
        <ul className={styles.dropdown} ref={targetRef} style={{ top: -(selectedIndex * 40) }}>
          {items.map((answer, index) => {
            const typeKey = `typeKey-${index}`
            return (
              <li key={typeKey}>
                <button type='button' onClick={() => handleAnswerDropdownClick(answer, index)}>
                  {icons && icons(answer, styles)}
                  <p>{answer}</p>
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
