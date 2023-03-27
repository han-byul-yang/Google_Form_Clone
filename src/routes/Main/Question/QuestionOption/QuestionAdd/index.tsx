import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { addOption, addEtcOption } from 'store/questionSlice'

import styles from './optionAdd.module.scss'

interface OptionAddProps {
  formIndex: number
}

const OptionAdd = ({ formIndex }: OptionAddProps) => {
  const {
    options,
    etcOption,
    type: questionType,
  } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const dispatch = useDispatch()

  const handleAddOptionClick = () => {
    const prevOptionNumber = Number(options[options.length - 1].name.slice(2, 3))
    const option = { name: `옵션${prevOptionNumber + 1}`, value: `옵션${prevOptionNumber + 1}` }
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
      {!etcOption.value && questionType !== '드롭다운' && (
        <button type='button' className={styles.addEtc} onClick={handleAddEtcClick}>
          &apos;기타&apos; 추가
        </button>
      )}
    </p>
  )
}

export default OptionAdd
