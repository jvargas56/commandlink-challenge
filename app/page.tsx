import styles from './page.module.css'
import FormFeed from './components/molecules/dynamicForm/feedForm/FormFeed'

export default function Home() {
  return (
    <main className={styles.main}>
      <FormFeed />
    </main>
  )
}
