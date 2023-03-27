import { QuestionInfo } from 'types/sliceStateType'
import Dropdown from 'components/Options/ChoosingOptions/Dropdown'
import Objective from 'components/Options/ChoosingOptions/Objective'
import ShortText from 'components/Options/ShortText'
import CheckBox from 'components/Options/ChoosingOptions/CheckBox'
import LongText from 'components/Options/LongText'

import styles from './noTargetedOption.module.scss'

interface NoTargetedOptionProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const NoTargetedOption = ({ questionInfo, formIndex }: NoTargetedOptionProps) => {
  const { type: questionType, options: questionOptions } = questionInfo

  const noTargetedOptionComponents = {
    단답형: <ShortText type='noTarget' />,
    장문형: <LongText type='noTarget' />,
    '객관식 질문': <Objective type='noTarget' formIndex={formIndex} options={questionOptions} />,
    체크박스: <CheckBox type='noTarget' formIndex={formIndex} options={questionOptions} />,
    드롭다운: <Dropdown type='noTarget' formIndex={formIndex} options={questionOptions} />,
  }[questionType]

  return <div className={styles.noTargetedOptionContainer}>{noTargetedOptionComponents}</div>
}

export default NoTargetedOption
