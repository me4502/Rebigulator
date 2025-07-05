import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://frinkiac.com/api/caption';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { episode, timestamp } = req.query;

  // Validate required parameters
  if (!episode || !timestamp) {
    return res
      .status(400)
      .json({ error: 'Missing episode or timestamp parameter' });
  }

  const response = await fetch(
    `${API_ENDPOINT}?e=${encodeURIComponent(episode as string)}&t=${timestamp}`,
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
