import React from 'react'
import styles from './CountriesTable.module.css'

const orderBy = (countries: any[], direction: string = '') => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a.population > b.population ? 1 : -1))
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a.population > b.population ? -1 : 1))
  }

  return [...countries]
}

interface Props {
  countries: any[]
}

const CountriesTable: React.FC<Props> = ({ countries }) => {
  const orderedCountries = orderBy(countries, 'asc')

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
        >
          <div>Name</div>
        </button>

        <button
          className={styles.heading_population}
        >
          <div>Population</div>
        </button>
      </div>

      {orderedCountries.map(country => (
        <div key={country.name} className={styles.row}>
          {/* <div className={styles.flag}>
            <img src={country.flag} alt={country.name} />
          </div> */}
          <div className={styles.name}>{country.name}</div>

          <div className={styles.population}>{country.population}</div>

          {/* <div className={styles.area}>{country.area || 0}</div>

          <div className={styles.gini}>{country.gini || 0} %</div> */}
        </div>
      ))}
    </div>
  )
}

export default CountriesTable