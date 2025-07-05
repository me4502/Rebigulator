import { describe, expect, it } from 'vitest';
import { getDailyEpisode, getDailyTimestampHashes } from './daily';

describe('getDailyEpisode', () => {
  it.each([['2023-03-01'], ['2024-10-01'], ['2025-07-03']])(
    'should return the correct episode for the given date %s',
    (dateString) => {
      const date = new Date(dateString).toISOString().split('T')[0];
      const episode = getDailyEpisode(date);
      expect(episode).toMatchSnapshot();
    }
  );
});

describe('getDailyTimestampHashes', () => {
  it.each([['2023-03-01'], ['2024-10-01'], ['2025-07-03']])(
    'should return the correct timestamp hashes for the given date %s',
    (dateString) => {
      const date = new Date(dateString).toISOString().split('T')[0];
      const episode = getDailyTimestampHashes(date);
      expect(episode).toMatchSnapshot();
    }
  );
});
