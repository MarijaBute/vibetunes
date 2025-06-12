import { motion } from 'framer-motion';
import { Playlist as PlaylistType } from '@/lib/types';

interface PlaylistProps {
  pagePlaylist: PlaylistType;
  onRegenerate: () => void;
}

export default function Playlist({ pagePlaylist, onRegenerate }: PlaylistProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='max-w-4xl w-full space-y-6'
    >
      <h2 className='text-3xl font-bold text-center text-white'>{pagePlaylist.title}</h2>
      <div className='space-y-4'>
        {pagePlaylist.songs.map((song, index) => (
          <motion.div
            key={`${song.title}-${song.artist}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='glass-effect p-4 rounded-lg'
          >
            <h3 className='text-lg font-medium text-white'>{song.title}</h3>
            <p className='text-sm text-gray-300'>{song.artist}</p>
            <p className='text-sm text-gray-400'>Album: {song.album}</p>
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-500 hover:underline mt-2 inline-block'
            >
              Listen on Spotify
            </a>
          </motion.div>
        ))}
      </div>
      <button
        onClick={onRegenerate}
        className='glass-effect p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all text-white'
      >
        Regenerate Playlist
      </button>
    </motion.div>
  );
}