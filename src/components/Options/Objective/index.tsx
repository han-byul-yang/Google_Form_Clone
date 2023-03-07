import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { QuestionOptionState } from 'types/sliceStateType'
import { RootState } from 'store'
import ChoosingOptions from '../ChoosingOptions'

import { XIcon } from 'assets/svgs'
import styles from './checkBoxAnswer.module.scss'

interface ChoosingObjectiveProps {
  type: string
  formIndex: number
  options: QuestionOptionState[]
  answer?: string
  etcAnswer?: string
  sameOptionError?: { place: string; error: boolean }
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleEtcAnswerChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleQuestionOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDeleteQuestionOptionClick?: (name: string) => void
  handleDeleteEtcClick?: () => void
}

interface ChoosingOptionsChildrenProps {
  option: QuestionOptionState
}

interface ObjectiveProps {
  option: QuestionOptionState
  formIndex: number
  type: string
  answer?: string
  etcAnswer?: string
  handlePreviewOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Objective = ({ option, formIndex, type, answer, etcAnswer, handlePreviewOptionChange }: ObjectiveProps) => {
  return (
    <input
      type='radio'
      id={`${formIndex}-${option?.name}`}
      name={`${formIndex}`}
      value={`${option?.value}`}
      onChange={handlePreviewOptionChange}
      checked={option?.name ? option?.value === answer : !!etcAnswer}
      disabled={type === 'question' || type === 'answer'}
    />
  )
}

const ChoosingObjective = (props: ChoosingObjectiveProps, { option }: ChoosingOptionsChildrenProps) => {
  const { type, formIndex, answer, etcAnswer, handlePreviewOptionChange } = props

  return (
    <ChoosingOptions {...props}>
      <Objective
        option={option}
        formIndex={formIndex}
        type={type}
        answer={answer}
        etcAnswer={etcAnswer}
        handlePreviewOptionChange={handlePreviewOptionChange}
      />
    </ChoosingOptions>
  )
}

export default ChoosingObjective
