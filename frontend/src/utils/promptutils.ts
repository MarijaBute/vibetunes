import { UserResponse } from '@/lib/types';

export const generatePrompt = (responses: UserResponse): string => {
  const { mood, genres, tempo, era, activity, artists } = responses;

  let prompt = `Create a personalized music playlist based on the following preferences:

Mood: ${mood || 'Not specified'}
Tempo: ${tempo || 'Not specified'}
Era: ${era || 'Not specified'}
Activity: ${activity || 'Not specified'}
`;

  if (genres && genres.length > 0) {
    prompt += `Genres: ${genres.join(', ')}\n`;
  }

  if (artists?.love) {
    prompt += `Artists I love: ${artists.love}\n`;
  }

  if (artists?.avoid) {
    prompt += `Artists I want to avoid: ${artists.avoid}\n`;
  }

  prompt += `
Please provide a list of 10 unique songs that match these preferences, formatted as a JSON array of objects with the following structure:
[
  {
    "title": "Song Title",
    "artist": "Artist Name"
  },
  ...
]
Each song should reflect the mood, tempo, era, activity, genres, and artist preferences specified. Return only the JSON array, no additional text.
`;

  return prompt;
};