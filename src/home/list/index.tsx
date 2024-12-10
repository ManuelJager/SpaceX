import { FC, use } from 'react';
import styles from './styles.module.scss'
import { Launch } from '../fetchLaunches.ts';

type ListProps = {
  launchesPromise: Promise<Launch[]>
  onClick: (id: string) => void
}

export const List: FC<ListProps> = ({ launchesPromise, onClick }) => {

  const launches = use(launchesPromise);

  return (
    <div className={styles.grid}>
      {launches.map((launch) => (
        <div
          key={launch.id}
          className={styles.launchCard}
          onClick={() => onClick(launch.id)}
        >
          <div className={styles.image}>
            <img src={launch.links.patch.small} alt={launch.name} />
          </div>
          <div className={styles.details}>
            <span className={styles.name}>
              {launch.name}
            </span>
            <div className={styles.status}>
              {launch.upcoming ? <>
                <div className={styles.upcoming}/>
                <span>Upcoming</span>
              </> : <>
                <div className={launch.success ? styles.success : styles.failed}/>
                <span>{launch.success ? 'Launch success' : 'Launch ailure'}</span>
              </>}
            </div>
            <span className={styles.date}>
              {new Date(launch.date_utc).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}