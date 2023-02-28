import { ChangeEvent, useState } from 'react'

import ContainerBox from 'components/ContainerBox'

import styles from './title.module.scss'

const Title = () => {
  const [titleInput, setTitleInput] = useState('제목 없는 설문지')
  const [descriptionInput, setDescriptionInput] = useState('')

  const handleTitleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitleInput(e.currentTarget.value)
  }

  const handleDescriptionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.currentTarget.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <ContainerBox boxType='title'>
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
    </ContainerBox>
  )
}

export default Title
