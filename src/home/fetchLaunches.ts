export type LaunchFilters = {
  name?: string;
  success?: boolean;
  upcoming?: boolean;
}

export type Launch = {
  date_utc: string;
  id: string;
  name: string;
  success: boolean;
  upcoming: boolean;
  links: {
    patch: {
      small?: string;
    }
  }
}

export const fetchLaunches = async (query: LaunchFilters = {}) => {
  const response = await fetch(`https://api.spacexdata.com/v5/launches/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: {
        ...(query.success && { success: query.success }),
        ...(query.name && { name: { $regex: query.name } }),
        upcoming: query.upcoming ?? false,
      },
      options: {
        pagination: false,
        sort: {
          date_utc: -1
        }
      }
    })
  });

  const body: { docs: Launch [] } = await response.json();

  return body.docs;
}