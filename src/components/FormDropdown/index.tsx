import { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import useClickOutside from 'hooks/useClickOutside'

import styles from './formDropdown.module.scss'

interface FormDropdownProps {
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

const FormDropdown = ({ items, icons, selectedState, action }: FormDropdownProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dispatch = useDispatch()
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenDropdown(false)
  }
  const { clickOutsideEvent, removeClickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()

    return () => removeClickOutsideEvent()
  }, [clickOutsideEvent, removeClickOutsideEvent])

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
          {items.map((item, index) => {
            const typeKey = `typeKey-${index}`
            return (
              <li key={typeKey}>
                <button type='button' onClick={() => handleAnswerDropdownClick(item, index)}>
                  {icons && icons(item, styles)}
                  <p>{item}</p>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default memo(FormDropdown)
