import React from 'react'
import Link from 'next/link'
import styles from './CountriesTable.module.css'
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded'
import KeyboardArrowUpRounded from '@material-ui/icons/KeyboardArrowUpRounded'

const orderBy = (countries: any[], value: string, direction: string): any[] => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }: { direction: string }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

interface Props {
  countries: any[]
}

const CountriesTable: React.FC<Props> = ({ countries }) => {
  const [direction, setDirection] = React.useState<string>();
  const [value, setValue] = React.useState<string>();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>

          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>

          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map(country => (
        <div key={country.name} className={styles.row}>
          {/* <div className={styles.flag}>
            <img src={country.flag} alt={country.name} />
          </div> */}
          <div className={styles.name}><Link href={`/country/${country.alpha3Code}`}>{country.name}</Link></div>

          <div className={styles.population}>{country.population}</div>

          {/* <div className={styles.area}>{country.area || 0}</div>

          <div className={styles.gini}>{country.gini || 0} %</div> */}
        </div>
      ))}
    </div>
  )
}

export default CountriesTable