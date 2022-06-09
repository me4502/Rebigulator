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

  // Avoid returning frames that are from the first 75 seconds (intro sequence)
  if (data.Frame.Timestamp < (75 * 24)) {
    return getRandom();
  }

  return data;
}
