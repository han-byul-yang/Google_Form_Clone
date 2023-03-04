import { ChangeEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'
import ChoosingOptions from '../ChoosingOptions'

interface DropdownProps {
  type: string
  formIndex: number
  options: QuestionOptionState[]
  sameOptionError?: { place: string; error: boolean }
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteQuestionOptionClick?: (name: string) => void
  handleDeleteEtcClick?: () => void
}

interface ChoosingOptionsChildrenProps {
  option: QuestionOptionState
}

const Dropdown = (props: DropdownProps, { option }: ChoosingOptionsChildrenProps) => {
  return (
    <ChoosingOptions {...props}>
      <p>{option?.name}</p>
    </ChoosingOptions>
  )
}

export default Dropdown
