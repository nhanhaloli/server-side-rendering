import React from 'react'
import SearchRounded from '@material-ui/icons/SearchRounded'
import style from './SearchInput.module.css'

const SearchInput: React.FC<any> = ({ ...rest }) => {
  return (
    <div className={style.wrapper}>
      <SearchRounded color='inherit' />
      <input className={style.input} {...rest} type="text" />
    </div>
  )
}

export default SearchInput