import got from 'got';
import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://frinkiac.com/api/random';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await got<object>(API_ENDPOINT, {
    headers: { Accept: 'application/json' },
    responseType: 'json',
  });
  const json = data.body;
  if (json) {
    res.status(200).json(json);
  } else {
    res.status(422).json({});
  }
}
