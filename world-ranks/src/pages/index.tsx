import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import SearchInput from '../components/SearchInput/SearchInput'
import CountriesTable from '../components/CountriesTable/CountriesTable'

interface Props {
  countries: any[]
}

const Home: React.FC<Props> = ({ countries }) => {
  return (
    <Layout>
      <div className={styles.counts}>found {countries.length}</div>

      <SearchInput placeholder='Filter by names, regions or sub regions' />

      <CountriesTable countries={countries} />
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://restcountries.eu/rest/v2/all')
  const countries = await response.json()

  return {
    props: {
      countries,
    }
  }
}