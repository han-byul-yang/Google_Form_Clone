import { useSelector } from 'react-redux'

import { QuestionInfo } from 'types/sliceStateType'
import { RootState } from 'store'
import CheckBox from '../../../components/Options/ChoosingOptions/CheckBox'
import LongText from '../../../components/Options/LongText'
import Objective from '../../../components/Options/ChoosingOptions/Objective'
import ShortText from '../../../components/Options/ShortText'
import Dropdown from 'components/Options/ChoosingOptions/Dropdown'

import styles from './answerOption.module.scss'

interface AnswerOptionProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const AnswerOption = ({ questionInfo, formIndex }: AnswerOptionProps) => {
  const { answer } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const { type: answerType, options: answerOptions } = questionInfo

  const answerOptionComponents = {
    단답형: <ShortText type='answer' answer={answer as string} />,
    장문형: <LongText type='answer' answer={answer as string} />,
    '객관식 질문': <Objective type='answer' options={answerOptions} formIndex={formIndex} />,
    체크박스: <CheckBox type='answer' formIndex={formIndex} options={answerOptions} />,
    드롭다운: <Dropdown type='answer' formIndex={formIndex} options={answerOptions} />,
  }[answerType]

  return <div className={styles.answerOptionContainer}>{answerOptionComponents}</div>
}

export default AnswerOption
