const DOH = '(Annoyed Grunt)';

export function cleanupEpisodeTitle(title: string): string {
  return title.replaceAll(DOH, `D'oh!`);
}
