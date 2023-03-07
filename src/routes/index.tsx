import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Main from './Main'
import Layout from 'components/Layout'

const Preview = lazy(() => import('./Preview'))
const Answer = lazy(() => import('./Answer'))

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='preview' element={<Preview />} />
        <Route path='answer' element={<Answer />} />
        <Route path='*' element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default App
