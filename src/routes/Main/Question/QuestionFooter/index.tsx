import { CopyIcon, TrashIcon } from 'assets/svgs'
import styles from './questionFooter.module.scss'

const QuestionFooter = () => {
  return (
    <div className={styles.formFooter}>
      <CopyIcon className={styles.footerIcon} />
      <TrashIcon className={styles.footerIcon} />
      <input id='toggle' type='checkbox' className={styles.input} />
      <label htmlFor='toggle' className={styles.label} />
    </div>
  )
}

export default QuestionFooter
