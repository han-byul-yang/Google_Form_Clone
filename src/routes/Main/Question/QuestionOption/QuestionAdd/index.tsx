import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { addOption, addEtcOption } from 'store/questionSlice'

import styles from './questionAdd.module.scss'

interface QuestionAddProps {
  formIndex: number
}

const QuestionAdd = ({ formIndex }: QuestionAddProps) => {
  const { etcOption } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const dispatch = useDispatch()
  const optionCountRef = useRef(1)

  const handleAddOptionClick = () => {
    optionCountRef.current += 1
    const option = { name: `옵션${optionCountRef.current}`, value: `옵션${optionCountRef.current}` }
    dispatch(addOption({ index: formIndex, option }))
  }

  const handleAddEtcClick = () => {
    dispatch(addEtcOption({ index: formIndex }))
  }

  return (
    <p className={styles.addOptions}>
      <button type='button' className={styles.addOption} onClick={handleAddOptionClick}>
        옵션 추가
      </button>
      {!etcOption.value && (
        <button type='button' className={styles.addEtc} onClick={handleAddEtcClick}>
          &apos;기타&apos; 추가
        </button>
      )}
    </p>
  )
}

export default QuestionAdd