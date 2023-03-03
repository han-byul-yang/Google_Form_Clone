import { ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuestionInfo } from 'types/sliceStateType'
import { RootState } from 'store'
import { setAnswer } from 'store/questionSlice'
import CheckBoxAnswer from '../../../components/Options/CheckBox'
import DropdownAnswer from '../../../components/Options/Dropdown'
import LongTextAnswer from '../../../components/Options/LongText'
import ObjectiveAnswer from '../../../components/Options/Objective'
import ShortTextAnswer from '../../../components/Options/ShortText'

import styles from './previewOption.module.scss'

interface PreviewOptionProps {
  questionInfo: QuestionInfo
  formIndex: number
}

const PreviewOption = ({ questionInfo, formIndex }: PreviewOptionProps) => {
  const { answer } = useSelector((state: RootState) => state.question.questionInfos[formIndex])
  const dispatch = useDispatch()
  const {
    type: { name: previewType },
    options: previewOptions,
  } = questionInfo

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
    단답형: <ShortTextAnswer type='preview' handlePreviewOptionChange={handleShortTextPreviewChange} answer={answer} />,
    장문형: <LongTextAnswer type='preview' handlePreviewOptionChange={handleLongTextPreviewChange} answer={answer} />,
    '객관식 질문': (
      <ObjectiveAnswer
        type='preview'
        options={previewOptions}
        handlePreviewOptionChange={handleChoosePreviewChange}
        formIndex={formIndex}
      />
    ),
    체크박스: (
      <CheckBoxAnswer
        type='preview'
        formIndex={formIndex}
        options={previewOptions}
        handlePreviewOptionChange={handleChoosePreviewChange}
      />
    ),
    드롭다운: <DropdownAnswer type='preview' formIndex={formIndex} options={previewOptions} />,
  }[previewType]

  return <div className={styles.previewOptionContainer}>{previewOptionComponents}</div>
}

export default PreviewOption
