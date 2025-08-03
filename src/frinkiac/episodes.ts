import { type DefaultError, useSuspenseQuery } from '@tanstack/react-query';
import type { FrinkiacEpisodesJsonType } from './types';

export function useFrinkiacEpisodes<T = FrinkiacEpisodesJsonType[]>(
  selectFn: (data: FrinkiacEpisodesJsonType[]) => T
): T {
  const { data } = useSuspenseQuery<
    FrinkiacEpisodesJsonType[],
    DefaultError,
    T
  >({
    queryKey: ['frinkiacEpisodes'],
    queryFn: async () => {
      return await import('../util/frinkiacEpisodes.json', {
        with: { type: 'json' },
      }).then((mod) => mod.default);
    },
    select: selectFn,
  });

  return data;
}

export function useFrinkiacEpisodeTitle(episode: string): string {
  const { data: title } = useSuspenseQuery({
    queryKey: ['frinkiacEpisodeTitleMap'],
    queryFn: async () => {
      const episodes = await import('../util/frinkiacEpisodes.json', {
        with: { type: 'json' },
      }).then((mod) => mod.default);
      return new Map(episodes.map(({ value, label }) => [value, label]));
    },
    select: (data) => data.get(episode),
  });
  return title;
}
