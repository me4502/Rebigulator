import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://frinkiac.com/api/random';
const ALL_EPISODES = '?smin=0&smax=34';
const CLASSIC_EPISODES = '?smin=1&smax=11';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mode } = req.query;

  let episodeFilter = ALL_EPISODES;

  if (mode === 'classic') {
    episodeFilter = CLASSIC_EPISODES;
  }

  const response = await fetch(API_ENDPOINT + episodeFilter, {
    headers: { Accept: 'application/json' },
  });

  const json = await response.json();
  if (json) {
    res.status(200).json(json);
  } else {
    res.status(422).json({});
  }
}
