import { Episode, Frame, Subtitle } from './types';
import { NETLIFY_PREFIX } from '../util/routes';

interface RandomResponse {
  Episode: Episode;
  Frame: Frame;
  Subtitles: Subtitle[];
}

export async function getRandom(): Promise<RandomResponse> {
  const data = (await (
    await fetch(NETLIFY_PREFIX + 'functions/random', {
      method: 'GET',
    })
  ).json()) as RandomResponse;

  return data;
}
