import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useClickOutside from 'hooks/useClickOutside'
import { addQuestionInfo } from 'store/questionSlice'

import { AddIcon } from 'assets/svgs'
import styles from './addQuestionBar.module.scss'

interface AddQuestionBarProps {
  targetedItemPlace: { x: number; y: number }
  questionInfoIndex: number
}

const AddQuestionBar = ({ targetedItemPlace, questionInfoIndex }: AddQuestionBarProps) => {
  const [barHeight, setBarHeight] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)
  const { x, y } = targetedItemPlace
  const dispatch = useDispatch()
  const date = Date.now()

  useEffect(() => {
    if (barRef && barRef.current) {
      const barPlace = barRef.current.offsetTop
      setBarHeight(barPlace)
    }
  }, [])

  const handleAddQuestionClick = () => {
    dispatch(addQuestionInfo({ index: questionInfoIndex, id: date }))
  }

  return (
    <div className={styles.barLine}>
      <div className={styles.addQuestionBar} ref={barRef} style={{ top: barHeight + y }}>
        <button type='button' onClick={handleAddQuestionClick}>
          <AddIcon className={styles.addIcon} />
        </button>
      </div>
    </div>
  )
}

export default AddQuestionBar
