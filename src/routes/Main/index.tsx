import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from 'store'
import Title from './Title'
import Question from './Question'

import { EyeIcon } from 'assets/svgs'
import styles from './main.module.scss'

const Main = () => {
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)
  const navigate = useNavigate()

  const handleMovePreviewClick = () => {
    navigate('/preview')
  }

  return (
    <>
      <nav className={styles.navigation}>
        <EyeIcon className={styles.eyeIcon} onClick={handleMovePreviewClick} />
      </nav>
      <div className={styles.mainContainer}>
        <Title />
        {questionInfos.map((_questionInfo, index) => {
          const questionInfoKey = `questionInfo-${index}`
          return <Question key={questionInfoKey} questionInfoIndex={index} />
        })}
      </div>
    </>
  )
}

export default Main
