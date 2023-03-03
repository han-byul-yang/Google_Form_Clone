import { Route, Routes } from 'react-router-dom'

import Main from './Main'
import Preview from './Preview'
import Layout from 'components/Layout'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='preview' element={<Preview />} />
        <Route path='*' element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default App
