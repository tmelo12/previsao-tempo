import styles from './page.module.css'
import WeatherCard from '@/components/WeatherCard'
export default function Home() {
  return (
    <main className={styles.main}>
      <WeatherCard />
    </main>
  )
}
