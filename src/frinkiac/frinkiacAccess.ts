import type { Episode, Frame, Subtitle } from './types';

// The following are multiplied by 24, due to Frinkiac using frame-based timestamps
const TIMESTAMP_MULTIPLIER = 1000;

/**
 * This is a minimum timestamp value, to avoid returning frames within the intro.
 * While we initially used 75 seconds, a vast majority of couch gags are fairly short.
 * If it's long, it's usually unique- and I feel like it does fit the premise of the game.
 * Therefore, 30 seconds has been chosen.
 */
export const TIMESTAMP_MINIMUM = 30 * TIMESTAMP_MULTIPLIER; // 30 seconds in frames

/**
 * The average episode is 21-24 minutes long according to a quick search. 20 minutes seems like a
 * good maximum to avoid returning frames that are in the credits.
 *
 * Slight disclaimer, that this is technically longer than the _shortest_ episode, which
 * as of writing is allegedly "Hardly Kirk-ing" at just over 19 minutes long.
 */
export const TIMESTAMP_MAXIMUM = 20 * 60 * TIMESTAMP_MULTIPLIER; // 20 minutes in frames

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

  // Avoid returning frames that are in the intro or credits.
  if (
    data.Frame.Timestamp < TIMESTAMP_MINIMUM ||
    data.Frame.Timestamp > TIMESTAMP_MAXIMUM
  ) {
    return getRandom();
  }

  return data;
}

export interface ScreencapResponse {
  Episode: Episode;
  Frame: Frame;
  Subtitles: Subtitle[];
}

export async function getScreencap(
  episode: string,
  timestamp: number
): Promise<ScreencapResponse> {
  const data = (await (
    await fetch(
      `/api/get-screencap?episode=${encodeURIComponent(episode)}&timestamp=${timestamp}`,
      {
        method: 'GET',
      }
    )
  ).json()) as ScreencapResponse;

  return data;
}

export interface EpisodeInfoResponse {
  Episode: Episode;
  Subtitles: Subtitle[];
}

export async function getEpisodeInfo(
  episode: string
): Promise<EpisodeInfoResponse> {
  const data = (await (
    await fetch(
      `/api/get-episode-info?episode=${encodeURIComponent(episode)}`,
      {
        method: 'GET',
      }
    )
  ).json()) as EpisodeInfoResponse;

  return data;
}
