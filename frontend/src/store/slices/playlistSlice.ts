import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse, Playlist } from '@/lib/types';

interface PlaylistState {
  responses: Partial<UserResponse>;
  playlist: Playlist | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  responses: {
    mood: '',
    genres: [],
    tempo: 'medium',
    era: '',
    activity: '',
    artists: { love: '', avoid: '' },
  },
  playlist: null,
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setResponses: (state, action: PayloadAction<Partial<UserResponse>>) => {
      state.responses = { ...state.responses, ...action.payload };
    },
    setPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlist = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setResponses, setPlaylist, setLoading, setError } = playlistSlice.actions;
export default playlistSlice.reducer;