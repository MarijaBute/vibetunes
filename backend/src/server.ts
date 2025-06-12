import express from 'express';
import cors from 'cors';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Function to get Spotify access token
async function getSpotifyAccessToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);
    return data.body.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw new Error('Failed to authenticate with Spotify');
  }
}

app.post('/api/generate-playlist', async (req, res) => {
  const { prompt } = req.body;
  try {
    console.log('Received prompt:', prompt);

    // Call Gemini API
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY || '',
        },
      }
    );

    let content = response.data.candidates[0]?.content?.parts[0]?.text;
    if (!content) {
      throw new Error('Empty response from Gemini API');
    }

    // Clean markdown and extra characters
    content = content
      .replace(/```json\n|```/g, '')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n/g, '');
    console.log('Cleaned content:', content);

    let songs;
    try {
      songs = JSON.parse(content);
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      throw new Error('Invalid JSON response from Gemini API');
    }

    // Get Spotify access token
    await getSpotifyAccessToken();

    // Search Spotify for each song
    const spotifySongs = [];
    for (const song of songs) {
      try {
        const searchResponse = await spotifyApi.searchTracks(`track:${song.title} artist:${song.artist}`);
        const track = searchResponse.body.tracks?.items[0];
        if (track) {
          spotifySongs.push({
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            spotifyUrl: track.external_urls.spotify,
          });
        }
      } catch (error) {
        console.error(`Error searching for ${song.title} by ${song.artist}:`, error);
      }
    }

    res.json({ songs: spotifySongs });
  } catch (error) {
    // Handle AxiosError and generic errors
    let errorMessage = 'Unknown error';
    let errorDetails = '';

    if (error instanceof AxiosError) {
      errorMessage = error.message;
      errorDetails = error.response?.data || '';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Error generating playlist:', errorMessage, errorDetails);
    res.status(500).json({ error: 'Failed to generate playlist', details: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});