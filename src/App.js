import React, { useContext } from 'react'
import PokedexContextProvider, { PokedexContext } from 'context/pokedex-context'
import styles from 'assets/style/App.module.scss'
import PokemonCard from 'components/PokemonCard'
import PokedexModal from 'components/PokedexModal'

const App = () => {
  const { pokedexList, setPokedexList, isActiveModal, setIsActiveModal } = useContext(PokedexContext)
  const handleAddBtnClick = () => {
    setIsActiveModal(true)
  }
  const removePokemonFromList = (index) => {
    const list = [
      ...pokedexList.slice(0, index),
      ...pokedexList.slice(index + 1)
    ]    
    setPokedexList(list)
  }
  const card = (data, index) => (
    <PokemonCard 
      key={data.id}
      extraClass="twoCol"
      data={data} 
      btnText="X" 
      action={() => {removePokemonFromList(index)}} />
  )
  return (
    <div className={styles.App}>
      <header className={styles.pokedexHeader}>My Pokedex</header>
      <div className={styles.wrapPokeList}>
        <section className={styles.pokedexList}>
          {pokedexList.map(card)}
        </section>
      </div>
      <footer className={styles.pokedexFooter}>
        <div className={styles.addBtn} onClick={handleAddBtnClick}>+</div>
      </footer>
      {isActiveModal && <PokedexModal />}
    </div>
  )
}

const AppWithContext = () => {
  return (
    <PokedexContextProvider>
      <App />
    </PokedexContextProvider>
  )
}

export default AppWithContext
