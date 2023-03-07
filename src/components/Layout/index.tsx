import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Loader from 'components/Loader'

import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.background}>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default Layout
