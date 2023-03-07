import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { QuestionOptionState } from 'types/sliceStateType'
import { RootState } from 'store'
import ChoosingOptions from '../ChoosingOptions'

import { XIcon } from 'assets/svgs'
import styles from './checkBoxAnswer.module.scss'

interface ChoosingCheckBoxProps {
  type: string
  formIndex: number
  options: QuestionOptionState[]
  answer?: string[]
  etcAnswer?: string
  sameOptionError?: { place: string; error: boolean }
  handleCheckBoxPreviewChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleEtcAnswerChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteQuestionOptionClick?: (name: string) => void
  handleDeleteEtcClick?: () => void
}

interface ChoosingOptionsChildrenProps {
  option: QuestionOptionState
}

interface CheckBoxProps {
  formIndex: number
  option: QuestionOptionState
  type: string
  answer?: string[]
  etcAnswer?: string
  handleCheckBoxPreviewChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckBox = ({ formIndex, option, type, answer, etcAnswer, handleCheckBoxPreviewChange }: CheckBoxProps) => {
  return (
    <input
      type='checkbox'
      id={`${formIndex}-${option?.name}`}
      name={`${option?.name}`}
      value={`${option?.value}`}
      onChange={handleCheckBoxPreviewChange}
      checked={option?.name ? answer?.includes(option?.value) : !!etcAnswer}
      disabled={type === 'question' || type === 'noTarget' || type === 'answer'}
    />
  )
}

const ChoosingCheckBox = (props: ChoosingCheckBoxProps, { option }: ChoosingOptionsChildrenProps) => {
  const { formIndex, type, answer, etcAnswer, handleCheckBoxPreviewChange } = props

  return (
    <ChoosingOptions {...props}>
      <CheckBox
        formIndex={formIndex}
        option={option}
        type={type}
        answer={answer}
        etcAnswer={etcAnswer}
        handleCheckBoxPreviewChange={handleCheckBoxPreviewChange}
      />
    </ChoosingOptions>
  )
}

export default ChoosingCheckBox
