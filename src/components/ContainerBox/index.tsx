import { ReactElement } from 'react'
import cx from 'classnames'

import styles from './containerBox.module.scss'

interface ContainerBoxProps {
  children: ReactElement | ReactElement[]
  boxType: string
}

const ContainerBox = ({ children, boxType }: ContainerBoxProps) => {
  return (
    <div
      className={cx(styles.containerBox, {
        [styles.titleBox]: boxType === 'title',
      })}
    >
      {children}
    </div>
  )
}

export default ContainerBox
