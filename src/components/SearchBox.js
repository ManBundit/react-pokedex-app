import React, { useRef } from 'react'
import searchIcon from 'assets/images/search.png'
import styles from 'assets/style/components/search-box.module.scss'

const SearchBox = ({ onChange, value }) => {  
  const inputRef = useRef(null);
  const handleSearchClick = () => {
    inputRef.current.focus()
  }
  const handleInput = (e) => {    
    onChange(e.target.value)
  }
  return (
    <div className={styles.wrapSearchBox}>
      <div className={styles.searchBox}>
        <input ref={inputRef} type="text" placeholder="Find pokemon" onChange={handleInput} value={value} />        
        <i className={styles.searchIcon} onClick={handleSearchClick} value={value}>
          <img src={searchIcon} alt="search" />
        </i>
      </div>
    </div>
  )
}

export default SearchBox