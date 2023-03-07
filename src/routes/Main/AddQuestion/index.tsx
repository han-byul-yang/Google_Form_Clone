import { useDispatch } from 'react-redux'

import { addQuestionInfo } from 'store/questionSlice'

import { AddIcon } from 'assets/svgs'
import styles from './addQuestion.module.scss'

interface AddQuestionProps {
  formIndex: number
}

const AddQuestion = ({ formIndex }: AddQuestionProps) => {
  const dispatch = useDispatch()
  const date = Date.now()

  const handleAddQuestionClick = () => {
    dispatch(addQuestionInfo({ index: formIndex, id: date }))
  }

  return (
    <button type='button' className={styles.addButton} onClick={handleAddQuestionClick}>
      <AddIcon className={styles.addIcon} />
    </button>
  )
}

export default AddQuestion
