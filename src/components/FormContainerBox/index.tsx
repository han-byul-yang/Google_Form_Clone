import { ReactElement } from 'react'
import cx from 'classnames'

import styles from './formContainerBox.module.scss'

interface FormContainerBoxProps {
  children: ReactElement | ReactElement[]
  boxType: string
}

const FormContainerBox = ({ children, boxType }: FormContainerBoxProps) => {
  return (
    <form
      className={cx(styles.containerBox, {
        [styles.titleBox]: boxType === 'title',
      })}
    >
      {children}
    </form>
  )
}

export default FormContainerBox
