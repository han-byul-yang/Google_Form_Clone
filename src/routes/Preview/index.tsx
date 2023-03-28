import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'

import useClickOutside from 'hooks/useClickOutside'
import { RootState } from 'store'
import { deleteAllAnswers, setDeleteAnswerError, setNoAnswerError } from 'store/questionSlice'
import PreviewOption from './PreviewOption'

import { WarningIcon } from 'assets/svgs'
import styles from './preview.module.scss'

const Preview = () => {
  const [firstErrorIndex, setFirstErrorIndex] = useState(-1)
  const [targetedFormIndex, setTargetedFormIndex] = useState(0)
  const [toggleClickSubmit, setToggleClickSubmit] = useState(false)
  const { title, description } = useSelector((state: RootState) => state.title.titleInfo)
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    const questionInfo = questionInfos[targetedFormIndex]
    if (questionInfo.essential && (!questionInfo.answer || !questionInfo.answer.length || !questionInfo.etcAnswer)) {
      dispatch(setNoAnswerError({ index: targetedFormIndex }))
    }
    if (questionInfo.essential && (questionInfo.answer || questionInfo.answer.length || questionInfo.etcAnswer)) {
      dispatch(setDeleteAnswerError({ index: targetedFormIndex }))
    }
  }
  const { clickOutsideEvent, removeClickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()

    return () => removeClickOutsideEvent()
  }, [clickOutsideEvent, removeClickOutsideEvent])

  useEffect(() => {
    if (firstErrorIndex !== -1) document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth' })
  }, [firstErrorIndex, toggleClickSubmit])

  const handleInsideClick = (index: number) => {
    setTargetedFormIndex(index)
  }

  const handleAnswerDeleteClick = () => {
    dispatch(deleteAllAnswers())
  }

  const handleSubmitClick = () => {
    const noAnswerErrors = questionInfos.some(
      (info) => info.essential && (!info.answer || !info.answer.length) && !info.etcAnswer
    )
    const findFirstErrorIndex = questionInfos.findIndex(
      (info) => info.essential && (!info.answer || !info.answer.length) && !info.etcAnswer
    )
    if (!noAnswerErrors) navigate('/answer')
    else {
      setFirstErrorIndex(findFirstErrorIndex)
      setToggleClickSubmit((prevState) => !prevState)
    }
  }

  return (
    <form className={styles.previewForm}>
      <div className={styles.titlePreview}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.essentialItem}>* 필수항목</p>
      </div>
      <ul className={styles.questionPreviews}>
        {questionInfos.map((questionInfo, index) => {
          const { noAnswerError } = questionInfo
          const questionInfoKey = `questionInfo-${index}`
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={questionInfoKey}
              className={cx(styles.questionPreviewItem, { [styles.essentialWarning]: noAnswerError })}
              id={firstErrorIndex === index ? 'scroll' : undefined}
              ref={index === targetedFormIndex ? targetRef : null}
              onClick={() => handleInsideClick(index)}
            >
              <div className={styles.questionTitleBox}>
                <p className={styles.questionTitle}>{questionInfo.title}</p>
                {questionInfo.essential && <p className={styles.essential}>*</p>}
              </div>
              <PreviewOption formIndex={index} />
              {noAnswerError && (
                <div className={styles.essentialOption}>
                  <WarningIcon className={styles.warningIcon} />
                  <p>필수 옵션 입니다</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <button type='button' className={styles.submitButton} onClick={handleSubmitClick}>
        제출
      </button>
      <button type='button' className={styles.deleteAnswers} onClick={handleAnswerDeleteClick}>
        양식 지우기
      </button>
    </form>
  )
}

export default Preview
