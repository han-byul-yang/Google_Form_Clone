import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useClickOutside from 'hooks/useClickOutside'
import { RootState } from 'store'
import PreviewOption from './PreviewOption'

import { WarningIcon } from 'assets/svgs'
import styles from './preview.module.scss'

const Preview = () => {
  const [targetedForms, setTargetedForms] = useState([{ id: 0, essential: false, answer: '', noAnswerError: false }])
  // const [noAnswerError, setNoAnswerError] = useState(false)
  const { title, description } = useSelector((state: RootState) => state.title.titleInfo)
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)
  const navigate = useNavigate()
  const targetRef = useRef(null)
  const targetedFormId = useRef(0)

  /* const clickOutsideHandle = () => {
    if (targetRef.current ) {
      
    }
  } 
  const { clickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent]) */

  const handleInsideClick = (id: number, essential: boolean, answer: string) => {
    targetedFormId.current = id
    if (targetedForms.map((prevForms) => prevForms.id).includes(id)) return
    setTargetedForms((prevForms) => [...prevForms, { id, essential, answer, noAnswerError: false }])
  }

  const handleSubmitClick = () => {
    navigate('/answer')
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
          const { id, essential, answer } = questionInfo
          const questionInfoKey = `questionInfo-${index}`
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={questionInfoKey}
              className={styles.questionPreviewItem}
              // ref={id === targetedForm.id ? targetRef : null}
              onClick={() => handleInsideClick(id, essential, answer)}
            >
              <div className={styles.questionTitleBox}>
                <p className={styles.questionTitle}>{questionInfo.title}</p>
                {questionInfo.essential && <p className={styles.essential}>*</p>}
              </div>
              <PreviewOption questionInfo={questionInfo} formIndex={index} />
              {/* targetedForm.id === id && noAnswerError && (
                <>
                  <WarningIcon className={styles.warningIcon} />
                  <p>필수 옵션 입니다</p>
                </>
              ) */}
            </li>
          )
        })}
      </ul>
      <button type='button' className={styles.submitButton} onClick={handleSubmitClick}>
        제출
      </button>
    </form>
  )
}

export default Preview
