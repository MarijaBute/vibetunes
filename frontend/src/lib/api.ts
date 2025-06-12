import axios from 'axios';
import { UserResponse, Song } from './types';
import { generatePrompt } from '@/utils/promptutils';

export const generatePlaylistSuggestions = async (responses: UserResponse): Promise<Song[]> => {
  try {
    const prompt = generatePrompt({
      ...responses,
      vibe: responses.activity, // Map activity to vibe for prompt
      popularity: responses.era, // Map era to popularity for prompt
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-playlist`,
      { prompt }
    );

    const playlistData = response.data;

    if (!playlistData || !playlistData.playlist) {
      throw new Error('Invalid response from Gemini API');
    }

    return playlistData.playlist.map((song: any) => ({
      title: song.title,
      artist: song.artist,
      videoId: song.youtubeLink.split('v=')[1]?.split('&')[0] || song.youtubeLink.split('/').pop(),
      videoUrl: song.youtubeLink,
    }));
  } catch (error) {
    console.error('Error generating playlist:', error);
    throw new Error('Failed to generate playlist');
  }
};