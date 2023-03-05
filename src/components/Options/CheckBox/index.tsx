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
  option: QuestionOptionState
  type: string
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckBox = ({ option, type, handlePreviewOptionChange }: CheckBoxProps) => {
  return (
    <input
      type='checkbox'
      id={`${option?.name}`}
      name={`${option?.name}`}
      value={`${option?.value}`}
      onChange={handlePreviewOptionChange}
      disabled={type === 'question' || type === 'answer'}
    />
  )
}

const ChoosingCheckBox = (props: ChoosingCheckBoxProps, { option }: ChoosingOptionsChildrenProps) => {
  const { type, handlePreviewOptionChange } = props

  return (
    <ChoosingOptions {...props}>
      <CheckBox option={option} type={type} handlePreviewOptionChange={handlePreviewOptionChange} />
    </ChoosingOptions>
  )
}

export default ChoosingCheckBox
