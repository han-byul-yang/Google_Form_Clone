import { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { addDescription, addTitle } from 'store/titleSlice'

import styles from './title.module.scss'

const Title = () => {
  const { title: titleInput, description: descriptionInput } = useSelector((state: RootState) => state.title.titleInfo)
  const dispatch = useDispatch()

  const handleTitleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(addTitle({ title: e.currentTarget.value }))
  }

  const handleDescriptionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(addDescription({ description: e.currentTarget.value }))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <form className={styles.titleForm}>
      <textarea
        className={styles.title}
        name='title'
        placeholder='설문지 제목'
        value={titleInput}
        onChange={handleTitleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <textarea
        className={styles.description}
        name='description'
        placeholder='설문지 설명'
        value={descriptionInput}
        onChange={handleDescriptionInputChange}
      />
    </form>
  )
}

export default Title
