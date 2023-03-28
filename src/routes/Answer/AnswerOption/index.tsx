import { useSelector } from 'react-redux'

import { RootState } from 'store'
import CheckBox from '../../../components/Options/ChoosingOptions/CheckBox'
import LongText from '../../../components/Options/LongText'
import Objective from '../../../components/Options/ChoosingOptions/Objective'
import ShortText from '../../../components/Options/ShortText'
import Dropdown from 'components/Options/ChoosingOptions/Dropdown'

import styles from './answerOption.module.scss'

interface AnswerOptionProps {
  formIndex: number
}

const AnswerOption = ({ formIndex }: AnswerOptionProps) => {
  const {
    type: answerType,
    options: answerOptions,
    answer,
  } = useSelector((state: RootState) => state.question.questionInfos[formIndex])

  const answerOptionComponents = {
    단답형: <ShortText type='answer' answer={answer as string} />,
    장문형: <LongText type='answer' answer={answer as string} />,
    '객관식 질문': <Objective type='answer' formIndex={formIndex} options={answerOptions} />,
    체크박스: <CheckBox type='answer' formIndex={formIndex} options={answerOptions} />,
    드롭다운: <Dropdown type='answer' formIndex={formIndex} options={answerOptions} />,
  }[answerType]

  return <div className={styles.answerOptionContainer}>{answerOptionComponents}</div>
}

export default AnswerOption
