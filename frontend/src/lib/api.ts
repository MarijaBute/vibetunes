import axios from 'axios';
import { UserResponse, Song } from './types';
import { generatePrompt } from '@/utils/promptutils';

export const generatePlaylistSuggestions = async (responses: UserResponse) => {
  try {
    const prompt = generatePrompt(responses);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-playlist`,
      { prompt }
    );
    return response.data; // { songs: [{ title, artist, album, spotifyUrl }, ...] }
  } catch (error) {
    console.error('Error generating playlist:', error);
    throw new Error('Failed to generate playlist');
  }
};