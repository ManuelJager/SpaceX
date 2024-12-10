import { FC, Suspense, use, useMemo } from "react";
import { fetchLaunchDetails, LaunchDetails } from './fetchLaunchDetails.ts';

export type LaunchDetailsProps = {
  id: string;
  onExit: () => void;
}

const LaunchDetailsContent: FC<{ detailsPromise: Promise<LaunchDetails> }> = ({ detailsPromise }) => {

  const details = use(detailsPromise);

  return (
    <pre>
      {JSON.stringify(details, null, 2)}
    </pre>
  )
}

export const LaunchDetailsContainer: FC<LaunchDetailsProps> = ({ id, onExit }) => {

  const launchDetailsPromise = useMemo(() => fetchLaunchDetails(id), [id]);

  return (
    <div>
      <button onClick={onExit}>Back</button>
      <div>
        <Suspense fallback={<div>Loading launch details ...</div>}>
          <LaunchDetailsContent detailsPromise={launchDetailsPromise} />
        </Suspense>
      </div>
    </div>
  )

}