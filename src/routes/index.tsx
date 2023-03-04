import { Route, Routes } from 'react-router-dom'

import Main from './Main'
import Preview from './Preview'
import Answer from './Answer'
import Layout from 'components/Layout'

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
