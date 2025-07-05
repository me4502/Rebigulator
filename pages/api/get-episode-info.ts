import type { NextApiRequest, NextApiResponse } from 'next';
import {
  TIMESTAMP_MAXIMUM,
  TIMESTAMP_MINIMUM,
} from '../../src/frinkiac/frinkiacAccess';

const API_ENDPOINT = 'https://frinkiac.com/api/episode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { episode } = req.query;

  // Validate required parameters
  if (!episode) {
    return res.status(400).json({ error: 'Missing episode parameter' });
  }

  const response = await fetch(
    `${API_ENDPOINT}/${episode}/${TIMESTAMP_MINIMUM}/${TIMESTAMP_MAXIMUM}`,
    {
      headers: { Accept: 'application/json' },
    }
  );

  const json = await response.json();
  if (json) {
    res.status(200).json(json);
  } else {
    res.status(422).json({});
  }
}
