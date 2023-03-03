import { ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuestionInfo, QuestionOptionState } from 'types/sliceStateType'
import { RootState } from 'store'
import { setAnswer } from 'store/questionSlice'
import CheckBoxAnswer from './CheckBoxAnswer'
import DropdownAnswer from './DropdownAnswer'
import LongTextAnswer from './LongTextAnswer'
import ObjectiveAnswer from './ObjectiveAnswer'
import ShortTextAnswer from './ShortTextAnswer'

import styles from './answerOption.module.scss'

interface OptionTypeComponentProps {
  questionInfo: QuestionInfo
  questionIndex: number
}

const AnswerOption = ({ questionInfo, questionIndex }: OptionTypeComponentProps) => {
  const { answer } = useSelector((state: RootState) => state.question.questionInfos[questionIndex])
  const dispatch = useDispatch()
  const {
    type: { name: answerType },
    options: answerOptions,
  } = questionInfo

  const setAnswerChange = (e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setAnswer({ index: questionIndex, answer: e.currentTarget.value }))
  }

  const handleShortTextAnswerChange = (e: FormEvent<HTMLInputElement>) => {
    setAnswerChange(e)
  }

  const handleLongTextAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerChange(e)
  }

  const handleChooseAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerChange(e)
  }

  const answerOptionComponents = {
    단답형: <ShortTextAnswer handleSetAnswerChange={handleShortTextAnswerChange} answer={answer} />,
    장문형: <LongTextAnswer handleSetAnswerChange={handleLongTextAnswerChange} answer={answer} />,
    '객관식 질문': (
      <ObjectiveAnswer
        answerOptions={answerOptions}
        handleSetAnswerChange={handleChooseAnswerChange}
        index={questionIndex}
      />
    ),
    체크박스: <CheckBoxAnswer answerOptions={answerOptions} handleSetAnswerChange={handleChooseAnswerChange} />,
    드롭다운: <DropdownAnswer answerOptions={answerOptions} handleSetAnswerChange={handleChooseAnswerChange} />,
  }[answerType]

  return <div className={styles.answerOptionContainer}>{answerOptionComponents}</div>
}

export default AnswerOption
