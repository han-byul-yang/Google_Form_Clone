import { QuestionOptionState } from 'types/sliceStateType'

interface DropdownAnswerProps {
  answerOptions: QuestionOptionState[]
}

const DropdownAnswer = ({ answerOptions }: DropdownAnswerProps) => {
  return <div>DropdownAnswer</div>
}

export default DropdownAnswer
