import { Launch } from '../fetchLaunches.ts';

export type LaunchDetails = Launch;

export const fetchLaunchDetails = async (id: string) => {
  const response = await fetch(`https://api.spacexdata.com/v5/launches/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: {
        _id: { $eq: id }
      },
      options: {
        populate: ['crew.crew', 'rocket']
      }
    })
  });

  const body: { docs: LaunchDetails[] } = await response.json();

  return body.docs[0];
}