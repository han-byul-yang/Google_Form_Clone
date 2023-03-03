import { ChangeEvent } from 'react'

import { QuestionOptionState } from 'types/sliceStateType'

interface DropdownAnswerProps {
  answerOptions: QuestionOptionState[]
  handleSetAnswerChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const DropdownAnswer = ({ answerOptions, handleSetAnswerChange }: DropdownAnswerProps) => {
  return <div>DropdownAnswer</div>
}

export default DropdownAnswer
