import { ChangeEvent, memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { deleteEtcOption, deleteOption, editOption } from 'store/questionSlice'
import CheckBox from 'components/Options/ChoosingOptions/CheckBox'
import Dropdown from 'components/Options/ChoosingOptions/Dropdown'
import LongText from 'components/Options/LongText'
import Objective from 'components/Options/ChoosingOptions/Objective'
import ShortText from 'components/Options/ShortText'
import OptionAdd from './QuestionAdd'

import styles from './questionOption.module.scss'

interface QuestionOptionProps {
  formIndex: number
}

const QuestionOption = ({ formIndex }: QuestionOptionProps) => {
  const [sameOptionError, setSameOptionError] = useState({ place: '', error: false })
  const { type: questionType, options: optionsInput } = useSelector(
    (state: RootState) => state.question.questionInfos[formIndex]
  )
  const dispatch = useDispatch()

  const handleQuestionOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    const optionsInputValues = optionsInput.map((option) => option.value)
    if (optionsInputValues.includes(value)) {
      setSameOptionError({ place: name, error: true })
    } else {
      setSameOptionError((prevState) => ({ ...prevState, error: false }))
    }
    dispatch(editOption({ index: formIndex, option: { name, value } }))
  }

  const handleDeleteQuestionOptionClick = (name: string) => {
    dispatch(deleteOption({ index: formIndex, name }))
  }

  const handleDeleteEtcClick = () => {
    dispatch(deleteEtcOption({ index: formIndex }))
  }

  const questionOptionComponents = {
    단답형: <ShortText type='question' />,
    장문형: <LongText type='question' />,
    '객관식 질문': (
      <Objective
        type='question'
        formIndex={formIndex}
        options={optionsInput}
        sameOptionError={sameOptionError}
        handleQuestionOptionChange={handleQuestionOptionChange}
        handleDeleteEtcClick={handleDeleteEtcClick}
        handleDeleteQuestionOptionClick={handleDeleteQuestionOptionClick}
      />
    ),
    체크박스: (
      <CheckBox
        type='question'
        formIndex={formIndex}
        options={optionsInput}
        sameOptionError={sameOptionError}
        handleQuestionOptionChange={handleQuestionOptionChange}
        handleDeleteQuestionOptionClick={handleDeleteQuestionOptionClick}
        handleDeleteEtcClick={handleDeleteEtcClick}
      />
    ),
    드롭다운: (
      <Dropdown
        type='question'
        formIndex={formIndex}
        options={optionsInput}
        sameOptionError={sameOptionError}
        handleQuestionOptionChange={handleQuestionOptionChange}
        handleDeleteQuestionOptionClick={handleDeleteQuestionOptionClick}
      />
    ),
  }[questionType]

  return (
    <div className={styles.questionOptionContainer}>
      {questionType === '단답형' || questionType === '장문형' ? (
        questionOptionComponents
      ) : (
        <>
          {questionOptionComponents}
          <OptionAdd formIndex={formIndex} />
        </>
      )}
    </div>
  )
}

export default memo(QuestionOption)
