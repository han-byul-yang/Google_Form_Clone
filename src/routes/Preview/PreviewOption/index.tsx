import { ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuestionInfo } from 'types/sliceStateType'
import { RootState } from 'store'
import { addType, setAnswer } from 'store/questionSlice'
import CheckBox from '../../../components/Options/CheckBox'
import LongText from '../../../components/Options/LongText'
import Objective from '../../../components/Options/Objective'
import ShortText from '../../../components/Options/ShortText'
import FormDropdown from 'components/FormDropdown'

import styles from './previewOption.module.scss'

interface PreviewOptionProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const PreviewOption = ({ questionInfo, formIndex }: PreviewOptionProps) => {
  const { answer } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
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

  const previewOptionComponents = {
    단답형: <ShortText type='preview' handlePreviewOptionChange={handleShortTextPreviewChange} answer={answer} />,
    장문형: <LongText type='preview' handlePreviewOptionChange={handleLongTextPreviewChange} answer={answer} />,
    '객관식 질문': (
      <Objective
        type='preview'
        options={previewOptions}
        handlePreviewOptionChange={handleChoosePreviewChange}
        formIndex={formIndex}
      />
    ),
    체크박스: (
      <CheckBox
        type='preview'
        formIndex={formIndex}
        options={previewOptions}
        handlePreviewOptionChange={handleChoosePreviewChange}
      />
    ),
    드롭다운: (
      <FormDropdown formIndex={formIndex} items={optionValues} selectedState={answer} action={dropdownAction} />
    ),
  }[previewType]

  return <div className={styles.previewOptionContainer}>{previewOptionComponents}</div>
}

export default PreviewOption
