import { ChangeEvent, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { copyQuestionInfo, deleteQuestionInfo, setEssential } from 'store/questionSlice'

import { CopyIcon, TrashIcon } from 'assets/svgs'
import styles from './questionFooter.module.scss'

interface QuestionFooterProps {
  formIndex: number
}

const QuestionFooter = ({ formIndex }: QuestionFooterProps) => {
  const questionInfo = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const dispatch = useDispatch()

  const handleCopyFormClick = () => {
    const newIdQuestionInfo = { ...questionInfo, id: Date.now() }
    dispatch(copyQuestionInfo({ index: formIndex, questionInfos: newIdQuestionInfo }))
  }

  const handleDeleteFormClick = () => {
    dispatch(deleteQuestionInfo({ index: formIndex }))
  }

  const handleEssentialFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    dispatch(setEssential({ index: formIndex, essential: checked }))
  }

  return (
    <div className={styles.formFooter}>
      <CopyIcon className={styles.footerIcon} onClick={handleCopyFormClick} />
      <TrashIcon className={styles.footerIcon} onClick={handleDeleteFormClick} />
      <input
        id={`${formIndex}`}
        type='checkbox'
        className={styles.input}
        name={`${formIndex}`}
        checked={questionInfo.essential}
        onChange={handleEssentialFormChange}
      />
      <label htmlFor={`${formIndex}`} className={styles.label} />
    </div>
  )
}

export default memo(QuestionFooter)
