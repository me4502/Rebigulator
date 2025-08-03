// [episodeId, score]
export type QuestionResult = [string, number];

export interface OldQuestionResult {
  /**
   * Episode ID, e.g. "S01E01" for "Simpsons Roasting on an Open Fire" (Season 1, Episode 1)
   */
  e: string;
  /**
   * Score
   */
  s: number;
}
