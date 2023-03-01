import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import Title from './Title'
import Question from './Question'

import styles from './main.module.scss'

const Main = () => {
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)
  const dispatch = useDispatch()

  return (
    <>
      <Title />
      {questionInfos.map((_questionInfo, index) => {
        const questionInfoKey = `questionInfo-${index}`
        return <Question key={questionInfoKey} questionInfoIndex={index} />
      })}
    </>
  )
}

export default Main
