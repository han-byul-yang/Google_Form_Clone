import styles from './main.module.scss'

const Main = () => {
  return (
    <>
      <input type='text' className={styles.title} />
      <textarea className={styles.description} />
    </>
  )
}

export default Main
