import React from 'react'
import styles from 'assets/style/components/pokemon-card.module.scss'
import HappinessIcon from 'assets/images/cute.png'

const PokemonCard = ({
  data = {},  
  btnText = 'Add',
  action = Function,  
}) => {
  const { id, name, imageUrl, hp, attacks, weaknesses } = data  
  const hpLevel = hp > 0 ? Math.min(hp, 100) : 0
  const strLevel = attacks ? Math.min(attacks.length * 50, 100) : 0
  const weakLevel = weaknesses ? Math.min(weaknesses.length * 100, 100) : 0
  const damageLevel = attacks?.map(attack => attack.damage)
    .reduce((acc, damage) => {
      if (/[+x]/.test(damage)) {                        
        acc += +damage.replace(/[x+]/g ,'')
      } else {
        acc += +damage
      }         
      return acc
    }, 0) || 0
  const happinessLevel = Math.round(((hpLevel / 10) + (damageLevel / 10) + 10 - (weakLevel / 100)) / 5)  
  return (
    <div className={styles.card }>
      <button className={styles.actionBtn} onClick={() => action(data)}>{btnText}</button>    
      <div className={styles.wrapImg}>
        <div className={styles.cardImg}>
          <img src={imageUrl} alt="fda"/>
        </div>
      </div>
      <div className={styles.cardDetail}>
        <div className={styles.name}>{name.toUpperCase()}</div>
        <div className={styles.wrapStatus}>
          <StatusBar value={hpLevel} title="HP" />
          <StatusBar value={strLevel} title="STR" />
          <StatusBar value={weakLevel} title="WEAK" />
        </div>
        <Happiness level={happinessLevel} id={id} />
      </div>
    </div>    
  )
}

const Happiness = ({ level, id }) => (
    <div className={styles.happinessLevel}>
      {[...Array(level)].map((_, i) => (
        <div className={styles.happinessIcon} key={`${id + i}`}>
          <img src={HappinessIcon} alt="happy-icon" />
        </div>        
      ))}          
    </div>
)

const StatusBar = ({ title, value }) => {  
  return (
    <div className={styles.status}>
      <div className={styles.title}>{title}</div>
      <div className={styles.bar}>
        <div className={styles.value} style={{width: `${value}%`}}></div>
      </div>
    </div>
  )
}

export default PokemonCard