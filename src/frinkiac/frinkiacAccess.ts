import { Episode, Frame, Subtitle } from './types';

export interface RandomResponse {
  Episode: Episode;
  Frame: Frame;
  Subtitles: Subtitle[];
}

export async function getRandom(): Promise<RandomResponse> {
  const data = (await (
    await fetch('/api/get-episode', {
      method: 'GET',
    })
  ).json()) as RandomResponse;

  return data;
}
