export interface Playlist {
  title: string;
  songs: Song[];
}

export interface UserResponse {
  mood: string;
  genres: string[];
  tempo: string;
  era: string;
  activity: string;
  artists: { love: string; avoid: string };
}

export type UserResponses = {
  mood?: string;
  vibe?: string;
  genres?: string[];
  artists?: {
    love?: string;
    avoid?: string;
  };
  popularity?: string;
};

export interface Song {
  title: string;
  artist: string;
  videoId: string;
  videoUrl: string;
  description?: string;
}

export interface Question {
  id: keyof UserResponse;
  text: string;
  type: "single" | "multiple" | "text" | "slider";
  options?: string[];
}