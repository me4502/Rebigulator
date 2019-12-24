import { Episode, Frame, Subtitle } from './types';

interface RandomResponse {
  Episode: Episode;
  Frame: Frame;
  Subtitles: Subtitle[];
}

export async function getRandom(): Promise<RandomResponse> {
  const data = (await (
    await fetch('https://frinkiac.com/api/random', {
      method: 'GET',
      mode: 'no-cors',
    })
  ).json()) as RandomResponse;

  return data;
}
