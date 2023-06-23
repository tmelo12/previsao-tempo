import WeatherComponent from '@/WeatherComponent'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <WeatherComponent
      />
    </main>
  )
}
