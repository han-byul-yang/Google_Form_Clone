import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { QuestionOptionState } from 'types/sliceStateType'
import { RootState } from 'store'
import ChoosingOptions from '../ChoosingOptions'

import { XIcon } from 'assets/svgs'
import styles from './checkBoxAnswer.module.scss'

interface CheckBoxProps {
  type: string
  formIndex: number
  options: QuestionOptionState[]
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteQuestionOptionClick?: (name: string) => void
  handleDeleteEtcClick?: () => void
}

interface ChoosingOptionsChildrenProps {
  option: QuestionOptionState
}

const CheckBox = (props: CheckBoxProps, { option }: ChoosingOptionsChildrenProps) => {
  const { type, handlePreviewOptionChange } = props

  return (
    <ChoosingOptions {...props}>
      <input
        type='checkbox'
        id={`${option?.name}`}
        name={`${option?.name}`}
        value={`${option?.value}`}
        onChange={handlePreviewOptionChange}
        disabled={type === 'question' || type === 'answer'}
      />
    </ChoosingOptions>
  )
}

export default CheckBox
