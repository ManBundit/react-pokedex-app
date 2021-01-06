import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { getCards } from 'services/cards.api'
import { PokedexContext } from 'context/pokedex-context'
import styles from 'assets/style/components/pokedex-modal.module.scss'
import SearchBox from 'components/SearchBox'
import PokemonCard from 'components/PokemonCard'

const PokedexModal = () => {    
  const [list, setList] = useState([]);  
  const [keyword, setKeyword] = useState('');
  const [activeAnimation, setActiveAnimation] = useState(false);  
  const modalRef = useRef(null);  
  const {      
    setIsActiveModal, 
    pokedexList ,
    setPokedexList 
  } = useContext(PokedexContext)
       
  const handleInputChange = (value) => {    
    setKeyword(value)
  }
  
  useEffect(() => {
    setKeyword('')
    setActiveAnimation(true)    
  }, [])  

  const closeModal = useCallback(() => {
    setActiveAnimation(false)
    setTimeout(() => {
      setIsActiveModal(false)
    }, 300)
  }, [setIsActiveModal])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {        
        closeModal()
      }
    }          
    document.addEventListener("mousedown", handleClickOutside);
    return () => {         
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);
  
  const getPokedex = useCallback(async () => {
    try {
      const response = await getCards({
        name: keyword,
        type: keyword
      })      
      const alreadyAddedPokemonIds = pokedexList.map((pokemon) => (
        pokemon.id
      ))
      const filteredList = response?.data?.cards.filter((card) => (
        !alreadyAddedPokemonIds.includes(card.id))
      )
      setList(filteredList)
    } catch {
      setList([])
    }
  }, [keyword, pokedexList]);
  
  useEffect(() => {    
    getPokedex()
  }, [getPokedex])
  
  const addPokemonToDex = (pokemonData) => {  
    setPokedexList([
      ...pokedexList,
      pokemonData
    ])
  }
  
  const card = (data) => (
    <div className={styles.cardWrap} key={data.id}>
      <PokemonCard data={data} action={addPokemonToDex} />
    </div>
  )      
  return (
    <div className={`${styles.modal} ${activeAnimation && styles.active}`}>
      <div ref={modalRef} className={styles.modalBox}>
        <SearchBox onChange={handleInputChange} value={keyword} />
        <section className={styles.cardList}>
          {list.map(card)}
        </section>
      </div>
    </div>
  )
}

export default PokedexModal