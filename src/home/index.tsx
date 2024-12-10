import 'react';
import styles from './styles.module.scss';
import { Suspense, useMemo, useState } from 'react';
import { fetchLaunches, LaunchFilters } from './fetchLaunches.ts';
import { List } from './list';
import { LaunchDetailsContainer } from './details';

export const Home = () => {

  const [filters, setFilters] = useState<LaunchFilters>({});
  const [launchId, setLaunchId] = useState<string | null>(null);
  const launchesPromise = useMemo(() => fetchLaunches(filters), [filters]);

  if (launchId) {
    return <LaunchDetailsContainer id={launchId} onExit={() => setLaunchId(null)} />;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.filter}>
        <img src={'https://upload.wikimedia.org/wikipedia/commons/9/96/SpaceX_Logo_Black.png'} alt={'SpaceX Logo'} />
        <div>
          <input
            type={'text'}
            placeholder={'Filter by name'}
            onChange={(e) => setFilters({...filters, name: e.target.value})}
          />
        </div>
        <div>
          <input
            id={'success'}
            type={'checkbox'}
            onChange={(e) => setFilters({...filters, success: e.target.checked})}
          />
          <label htmlFor={'success'}>Only display successful launches</label>
        </div>
        <div>
          <input
            id={'upcoming'}
            type={'checkbox'}
            onChange={(e) => setFilters({...filters, upcoming: e.target.checked})}
          />
          <label htmlFor={'upcoming'}>Only display upcoming launches</label>
        </div>
      </div>
      <div className={styles.list}>
        <Suspense fallback={<div>Loading...</div>}>
          <List launchesPromise={launchesPromise} onClick={(id) => setLaunchId(id)} />
        </Suspense>
      </div>
    </div>
  )
}