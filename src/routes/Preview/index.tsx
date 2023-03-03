import { useSelector } from 'react-redux'

import { RootState } from 'store'
import PreviewOption from './PreviewOption'

import styles from './preview.module.scss'

const Preview = () => {
  const { title, description } = useSelector((state: RootState) => state.title.titleInfo)
  const questionInfos = useSelector((state: RootState) => state.question.questionInfos)

  return (
    <form className={styles.previewForm}>
      <div className={styles.titlePreview}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.essentialItem}>* 필수항목</p>
      </div>
      <ul className={styles.questionPreviews}>
        {questionInfos.map((questionInfo, index) => {
          const questionInfoKey = `questionInfo-${index}`
          return (
            <li key={questionInfoKey} className={styles.questionPreviewItem}>
              <div className={styles.questionTitleBox}>
                <p className={styles.questionTitle}>{questionInfo.title}</p>
                {questionInfo.essential && <p className={styles.essential}>*</p>}
              </div>
              <PreviewOption questionInfo={questionInfo} formIndex={index} />
            </li>
          )
        })}
      </ul>
    </form>
  )
}

export default Preview
