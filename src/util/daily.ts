import { useFrinkiacEpisodes } from '../frinkiac/episodes';
import type { FrinkiacEpisodesJsonType } from '../frinkiac/types';

export const ROUND_COUNT = 6;

/**
 * Gets the current day's date, to use as a seed for daily challenges.
 * This is less perfect than manually setting the challenges each day,
 * but it means that I don't have to set a list of challenges every day.
 *
 * @returns A string representing today's date in YYYY-MM-DD format.
 */
export const getDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export function getDailyEpisode(
  dateString: string,
  episodes: FrinkiacEpisodesJsonType[]
): FrinkiacEpisodesJsonType {
  // Simple hash function to convert date string to number
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.codePointAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use absolute value and modulo to get episode index
  const episodeIndex = Math.abs(hash) % episodes.length;
  return episodes[episodeIndex];
}

export function useDailyEpisode(date?: string): FrinkiacEpisodesJsonType {
  const dateString = date || getDateString();

  return useFrinkiacEpisodes((data) => {
    return getDailyEpisode(dateString, data);
  });
}

export function getDailyTimestampHashes(date?: string): number[] {
  const dateString = date || getDateString();

  const timestampHashes: number[] = [];

  for (let i = 0; i < ROUND_COUNT; i++) {
    // Create very different seeds using large prime multipliers and different salts
    const seedString = `${dateString}-round${i * 12347}-salt${i * 98765 + 54321}`;
    let hash = 5381; // djb2 algorithm starting value

    // Hash the seed string
    for (let j = 0; j < seedString.length; j++) {
      const char = seedString.codePointAt(j) || 0;
      hash = (hash << 5) + hash + char; // hash * 33 + char
      hash = hash >>> 0; // Convert to unsigned 32-bit
    }

    // Apply additional mixing with different constants per iteration
    const mixingConstant = [
      0x85ebca6b, 0xc2b2ae35, 0xcc9e2d51, 0x1b873593, 0xe6546b64, 0x9e3779b9,
    ][i % 6];
    hash ^= hash >>> 16;
    hash *= mixingConstant;
    hash ^= hash >>> 13;
    hash *= 0xc2b2ae35;
    hash ^= hash >>> 16;
    hash = hash >>> 0;

    // Additional round-specific mixing
    hash ^= (i * 2654435761) >>> 0; // Different prime per round
    hash = hash >>> 0;

    // Normalize to 0-1 range
    const normalizedHash = hash / 4294967295; // Max unsigned 32-bit value
    timestampHashes.push(normalizedHash);
  }

  return timestampHashes;
}

export interface DailyResults {
  a: number; // Attempts
  r: (string | null)[]; // Results
  e: string; // Episode Key
  w: boolean; // Won
  d?: string; // Date
}

export function generateDailyResults(
  attempts: number,
  results: (string | null)[],
  episodeKey: string,
  won: boolean,
  date?: string
): string {
  return `${btoa(JSON.stringify({ a: attempts, r: results, e: episodeKey, w: won, d: date }))}`;
}
