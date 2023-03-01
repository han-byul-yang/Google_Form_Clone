import { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { copyQuestionInfo, deleteQuestionInfo, setEssential } from 'store/questionSlice'

import { CopyIcon, TrashIcon } from 'assets/svgs'
import styles from './questionFooter.module.scss'

interface QuestionFooterProps {
  formIndex: number
}

const QuestionFooter = ({ formIndex }: QuestionFooterProps) => {
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const dispatch = useDispatch()

  const handleCopyFormClick = () => {
    dispatch(copyQuestionInfo({ index: formIndex, questionInfos }))
  }

  const handleDeleteFormClick = () => {
    dispatch(deleteQuestionInfo({ index: formIndex }))
  }

  const handleEssentialFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    if (checked) dispatch(setEssential({ index: formIndex }))
  }

  return (
    <div className={styles.formFooter}>
      <CopyIcon className={styles.footerIcon} onClick={handleCopyFormClick} />
      <TrashIcon className={styles.footerIcon} onClick={handleDeleteFormClick} />
      <input id='toggle' type='checkbox' className={styles.input} onChange={handleEssentialFormChange} />
      <label htmlFor='toggle' className={styles.label} />
    </div>
  )
}

export default QuestionFooter
