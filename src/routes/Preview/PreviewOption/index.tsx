import { ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuestionInfo } from 'types/sliceStateType'
import { RootState } from 'store'
import { deleteAnswer, setAnswer, setEtcAnswer } from 'store/questionSlice'
import CheckBox from '../../../components/Options/ChoosingOptions/CheckBox'
import LongText from '../../../components/Options/LongText'
import Objective from '../../../components/Options/ChoosingOptions/Objective'
import ShortText from '../../../components/Options/ShortText'
import FormDropdown from 'components/FormDropdown'

import styles from './previewOption.module.scss'

interface PreviewOptionProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const PreviewOption = ({ questionInfo, formIndex }: PreviewOptionProps) => {
  const { answer, etcAnswer } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const dispatch = useDispatch()
  const { type: previewType, options: previewOptions } = questionInfo
  const optionValues = previewOptions.map((option) => option.value)
  const dropdownAction = (selectedAnswer: string) => setAnswer({ index: formIndex, answer: selectedAnswer })

  const setPreviewChange = (e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setAnswer({ index: formIndex, answer: e.currentTarget.value }))
  }

  const handleShortTextPreviewChange = (e: FormEvent<HTMLInputElement>) => {
    setPreviewChange(e)
  }

  const handleLongTextPreviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPreviewChange(e)
  }

  const handleChoosePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreviewChange(e)
  }

  const handleCheckBoxPreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget
    let answers: string[]
    if (checked) {
      answers = [...(answer as string[]), e.currentTarget.value]
    } else {
      const valueIndex = answer.indexOf(value)
      answers = [...(answer as string[])]
      answers.splice(valueIndex, 1)
    }
    dispatch(setAnswer({ index: formIndex, answer: answers }))
  }

  const handleEtcAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(deleteAnswer({ index: formIndex }))
    dispatch(setEtcAnswer({ index: formIndex, etcAnswer: e.currentTarget.value }))
  }

  const previewOptionComponents = {
    단답형: (
      <ShortText type='preview' handlePreviewOptionChange={handleShortTextPreviewChange} answer={answer as string} />
    ),
    장문형: (
      <LongText type='preview' handlePreviewOptionChange={handleLongTextPreviewChange} answer={answer as string} />
    ),
    '객관식 질문': (
      <Objective
        type='preview'
        formIndex={formIndex}
        options={previewOptions}
        answer={answer as string}
        etcAnswer={etcAnswer}
        handlePreviewOptionChange={handleChoosePreviewChange}
        handleEtcAnswerChange={handleEtcAnswerChange}
      />
    ),
    체크박스: (
      <CheckBox
        type='preview'
        formIndex={formIndex}
        options={previewOptions}
        answer={answer as string[]}
        etcAnswer={etcAnswer}
        handleCheckBoxPreviewChange={handleCheckBoxPreviewChange}
        handleEtcAnswerChange={handleEtcAnswerChange}
      />
    ),
    드롭다운: <FormDropdown items={optionValues} selectedState={answer as string} action={dropdownAction} />,
  }[previewType]

  return <div className={styles.previewOptionContainer}>{previewOptionComponents}</div>
}

export default PreviewOption
