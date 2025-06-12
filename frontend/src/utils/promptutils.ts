import { UserResponses } from '@/lib/types';

export const generatePrompt = (responses: UserResponses): string => {
  const { mood, vibe, genres, artists, popularity } = responses;
  
  let prompt = `Create a personalized music playlist based on the following preferences:

Mood: ${mood || 'Not specified'}
Vibe desired: ${vibe || 'Not specified'}
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

  if (popularity) {
    prompt += `Preference for popular vs. new music: ${popularity}\n`;
  }

  prompt += `
Please provide a list of 10 unique songs that match these preferences, formatted as a JSON array of objects with the following structure:
[
  {
    "title": "Song Title",
    "artist": "Artist Name",
    "youtubeLink": "https://www.youtube.com/watch?v=VIDEO_ID"
  },
  ...
]
Each song should reflect the mood, vibe, genres, artists, and preferences specified. Ensure each song has a valid YouTube link. Return only the JSON array, no additional text.
`;

  return prompt;
};