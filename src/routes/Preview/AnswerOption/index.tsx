import { QuestionOptionState } from 'types/sliceStateType'
import CheckBoxAnswer from './CheckBoxAnswer'
import DropdownAnswer from './DropdownAnswer'
import LongTextAnswer from './LongTextAnswer'
import ObjectiveAnswer from './ObjectiveAnswer'
import ShortTextAnswer from './ShortTextAnswer'

import styles from './answerOption.module.scss'

interface OptionTypeComponentProps {
  answerType: string
  answerOptions: QuestionOptionState[]
  index: number
}

const AnswerOption = ({ answerType, answerOptions, index }: OptionTypeComponentProps) => {
  /* if (answerType === '단답형') return <ShortTextAnswer />
  if (answerType === '장문형') return <LongTextAnswer />
  if (answerType === '객관식 질문') return <ObjectiveAnswer />
  if (answerType === '체크박스') return <CheckBoxAnswer /> */

  const answerOptionComponents = {
    단답형: <ShortTextAnswer />,
    장문형: <LongTextAnswer />,
    '객관식 질문': <ObjectiveAnswer answerOptions={answerOptions} index={index} />,
    체크박스: <CheckBoxAnswer answerOptions={answerOptions} />,
    드롭다운: <DropdownAnswer answerOptions={answerOptions} />,
  }[answerType]

  return <div className={styles.answerOptionContainer}>{answerOptionComponents}</div>
}

export default AnswerOption
