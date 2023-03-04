import { ShortTextIcon, ParagraphIcon, FullCircleIcon, CheckBoxIcon, DropdownIcon } from 'assets/svgs'

export const questionTypeIcons = (type: string, styles: { [className: string]: string }) =>
  ({
    단답형: <ShortTextIcon className={styles.dropdownIcon} />,
    장문형: <ParagraphIcon className={styles.dropdownIcon} />,
    '객관식 질문': <FullCircleIcon className={styles.dropdownIcon} />,
    체크박스: <CheckBoxIcon className={styles.dropdownIcon} />,
    드롭다운: <DropdownIcon className={styles.dropdownIcon} />,
  }[type])

export const questionTypes = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운']
