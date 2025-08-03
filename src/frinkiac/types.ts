export interface Episode {
  Id: number;
  Key: string;
  Season: number;
  EpisodeNumber: number;
  Title: string;
  Director: string;
  Writer: string;
  OriginalAirDate: string;
  WikiLink: string;
}

export interface Frame {
  Id: number;
  Episode: string;
  Timestamp: number;
}

export interface Subtitle {
  Id: number;
  RepresentativeTimestamp: number;
  Episode: string;
  StartTimestamp: number;
  EndTimestamp: number;
  Content: string;
  Language: string;
}

export interface FrinkiacEpisodesJsonType {
  label: string;
  value: string;
}
