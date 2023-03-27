import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { addQuestionInfo } from 'store/questionSlice'

import { AddIcon } from 'assets/svgs'
import styles from './questionAdd.module.scss'

interface QuestionAddProps {
  formIndex: number
}

const QuestionAdd = ({ formIndex }: QuestionAddProps) => {
  const dispatch = useDispatch()

  const handleAddQuestionClick = () => {
    const date = Date.now()
    dispatch(addQuestionInfo({ index: formIndex, id: date }))
  }

  return (
    <button type='button' className={styles.addButton} onClick={handleAddQuestionClick}>
      <AddIcon className={styles.addIcon} />
    </button>
  )
}

export default memo(QuestionAdd)
