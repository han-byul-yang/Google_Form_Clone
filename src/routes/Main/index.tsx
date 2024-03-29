import { memo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { RootState } from 'store'
import Title from './Title'
import Question from './Question'
import QuestionAdd from './QuestionAdd'
import QuestionNoTargetedForm from './QuestionNoTargetedForm'

import { EyeIcon } from 'assets/svgs'
import styles from './main.module.scss'

const Main = () => {
  const [targetedForm, setTargetedForm] = useState(0)
  const [formIndex, setFormIndex] = useState(0)
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)
  const navigate = useNavigate()
  const targetRef = useRef<HTMLLIElement>(null)

  const handleInsideClick = (index: number, id: number) => {
    setFormIndex(index)
    setTargetedForm(id)
  }

  const handleMovePreviewClick = () => {
    navigate('/preview')
  }

  return (
    <>
      <nav className={styles.navigation}>
        <EyeIcon className={styles.eyeIcon} onClick={handleMovePreviewClick} />
      </nav>
      <div className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <Title />
          <ul>
            {questionInfos.map((questionInfo, index) => {
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={questionInfo.id}
                  className={cx(styles.questionItem, { [styles.targetedItem]: targetedForm === questionInfo.id })}
                  ref={targetRef}
                  onClick={() => handleInsideClick(index, questionInfo.id)}
                >
                  {targetedForm === questionInfo.id ? (
                    <Question formIndex={index} />
                  ) : (
                    <QuestionNoTargetedForm formIndex={index} />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.addQuestionContainer}>
          <QuestionAdd formIndex={formIndex} />
        </div>
      </div>
    </>
  )
}

export default memo(Main)
