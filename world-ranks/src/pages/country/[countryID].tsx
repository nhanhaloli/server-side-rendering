import React from 'react'
import styles from './country.module.css'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout/Layout'

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

interface Props {
  infoDetailCountry: any
}

const infoDetailCountry: React.FC<Props> = ({ infoDetailCountry }) => {
  const [borders, setBorders] = React.useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      infoDetailCountry.borders.map((border) => getCountry(border))
    );

    setBorders(borders);
  };

  React.useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout
      title={infoDetailCountry.name}
    >
      <div>
        <div className={styles.overview_panel}>
          <img src={infoDetailCountry.flag} alt={infoDetailCountry.name}></img>

          <h1 className={styles.overview_name}>{infoDetailCountry.name}</h1>
          <div className={styles.overview_region}>{infoDetailCountry.region}</div>

          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>
                {infoDetailCountry.population}
              </div>
              <div className={styles.overview_label}>Population</div>
            </div>

            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{infoDetailCountry.area}</div>
              <div className={styles.overview_label}>Area</div>
            </div>
          </div>
        </div>

        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>Details</h4>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>
              {infoDetailCountry.capital}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Languages</div>
            <div className={styles.details_panel_value}>
              {infoDetailCountry.languages.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Currencies</div>
            <div className={styles.details_panel_value}>
              {infoDetailCountry.currencies.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Native name</div>
            <div className={styles.details_panel_value}>
              {infoDetailCountry.nativeName}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Gini</div>
            <div className={styles.details_panel_value}>{infoDetailCountry.gini} %</div>
          </div>

          <div className={styles.details_panel_borders}>
            <div className={styles.details_panel_borders_label}>
              Neighbouring Countries
              </div>

            <div className={styles.details_panel_borders_container}>
              {borders.map(({ flag, name }) => (
                <div key={name} className={styles.details_panel_borders_country}>
                  <img src={flag} alt={name}></img>

                  <div className={styles.details_panel_borders_name}>
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default infoDetailCountry

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.countryID}`)
  const infoDetailCountry = await response.json()

  return {
    props: {
      infoDetailCountry,
    }
  }
}