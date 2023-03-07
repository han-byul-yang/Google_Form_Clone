import { QuestionInfo } from 'types/sliceStateType'
import Dropdown from 'components/Options/Dropdown'
import Objective from 'components/Options/Objective'
import ShortText from 'components/Options/ShortText'
import CheckBox from 'components/Options/CheckBox'
import LongText from 'components/Options/LongText'

import styles from './noTargetedOption.module.scss'

interface NoTargetedOptionProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const NoTargetedOption = ({ questionInfo, formIndex }: NoTargetedOptionProps) => {
  const { type: answerType, options: answerOptions } = questionInfo

  const noTargetedOptionComponents = {
    단답형: <ShortText type='noTarget' answer='' />,
    장문형: <LongText type='noTarget' answer='' />,
    '객관식 질문': <Objective type='noTarget' formIndex={formIndex} options={answerOptions} />,
    체크박스: <CheckBox type='noTarget' formIndex={formIndex} options={answerOptions} />,
    드롭다운: <Dropdown type='noTarget' formIndex={formIndex} options={answerOptions} />,
  }[answerType]

  return <div className={styles.noTargetedOptionContainer}>{noTargetedOptionComponents}</div>
}

export default NoTargetedOption
