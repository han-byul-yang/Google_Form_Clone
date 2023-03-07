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
  sameOptionError?: { place: string; error: boolean }
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
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
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckBox = ({ formIndex, option, type, answer, handlePreviewOptionChange }: CheckBoxProps) => {
  return (
    <input
      type='checkbox'
      id={`${formIndex}-${option?.name}`}
      name={`${option?.name}`}
      value={`${option?.value}`}
      onChange={handlePreviewOptionChange}
      checked={answer?.includes(option.value)}
      disabled={type === 'question' || type === 'answer'}
    />
  )
}

const ChoosingCheckBox = (props: ChoosingCheckBoxProps, { option }: ChoosingOptionsChildrenProps) => {
  const { formIndex, type, answer, handlePreviewOptionChange } = props

  return (
    <ChoosingOptions {...props}>
      <CheckBox
        formIndex={formIndex}
        option={option}
        type={type}
        answer={answer}
        handlePreviewOptionChange={handlePreviewOptionChange}
      />
    </ChoosingOptions>
  )
}

export default ChoosingCheckBox
