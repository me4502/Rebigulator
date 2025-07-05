import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://frinkiac.com/api/random';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(API_ENDPOINT, {
    headers: { Accept: 'application/json' },
  });

  const json = await response.json();
  if (json) {
    res.status(200).json(json);
  } else {
    res.status(422).json({});
  }
}
