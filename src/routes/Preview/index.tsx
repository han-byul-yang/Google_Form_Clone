import { useSelector } from 'react-redux'

import { RootState } from 'store'

import styles from './preview.module.scss'

const Preview = () => {
  const { title, description } = useSelector((state: RootState) => state.title.titleInfo)

  return (
    <div className={styles.titlePreview}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.essentialItem}>* 필수항목</p>
    </div>
  )
}

export default Preview
