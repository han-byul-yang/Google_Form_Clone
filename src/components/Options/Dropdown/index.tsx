import { ChangeEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'
import ChoosingOptions from '../ChoosingOptions'

interface ChoosingDropdownProps {
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

interface DropdownProps {
  option: QuestionOptionState
}

const Dropdown = ({ option }: DropdownProps) => {
  return <p>{option?.name.slice(2)}</p>
}

const ChoosingDropdown = (props: ChoosingDropdownProps, { option }: ChoosingOptionsChildrenProps) => {
  return (
    <ChoosingOptions {...props}>
      <Dropdown option={option} />
    </ChoosingOptions>
  )
}

export default ChoosingDropdown
