import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useClickTarget from 'hooks/useClickOutside'
import { RootState } from 'store'
import Title from './Title'
import Question from './Question'
import AddQuestionBar from './AddQuestionBar'
import AnswerOption from 'routes/Answer/AnswerOption'

import { EyeIcon } from 'assets/svgs'
import styles from './main.module.scss'

const Main = () => {
  const [targetedItemPlace, setTargetedItemPlace] = useState({ x: 0, y: 0 })
  const [targeted, setTargeted] = useState(0)
  const [formIndex, setFormIndex] = useState(0)
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)
  const navigate = useNavigate()
  const targetRef = useRef<HTMLLIElement>(null)

  const clickInsideHandle = (index: number, id: number) => {
    /* if (targetRef && targetRef.current) {
      const { width, height } = targetRef.current.getBoundingClientRect()
      setTargetedItemPlace({ x: width, y: height })
    } */ // 로직 분리
    setFormIndex(index)
    setTargeted(id)
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
                  className={styles.questionItem}
                  ref={targetRef}
                  onClick={() => clickInsideHandle(index, questionInfo.id)}
                >
                  {targeted === questionInfo.id ? (
                    <Question formIndex={index} />
                  ) : (
                    <div className={styles.questionAnsweritem}>
                      <p className={styles.questionTitle}>{questionInfo.title}</p>
                      <AnswerOption questionInfo={questionInfo} formIndex={formIndex} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <AddQuestionBar targetedItemPlace={targetedItemPlace} formIndex={formIndex} />
      </div>
    </>
  )
}

export default Main
