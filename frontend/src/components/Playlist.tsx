import { motion } from 'framer-motion';
import { Playlist as PlaylistType, Song } from '@/lib/types';

interface PlaylistProps {
  playlist: PlaylistType;
  onRegenerate: () => void;
}

export default function Playlist({ playlist, onRegenerate }: PlaylistProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='max-w-4xl w-full space-y-6'
    >
      <h2 className='text-3xl font-bold text-center'>{playlist.title}</h2>
      <div className='space-y-4'>
      {playlist.songs.map((song, index) => (
        <motion.div
          key={`${song.videoId}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className='glass-effect p-4 rounded-lg'
        >
          <h3 className='text-lg font-medium'>{song.title}</h3>
          <p className='text-sm text-gray-300'>{song.artist}</p>
          <iframe
            src={`https://www.youtube.com/embed/${song.videoId}`}
            className='w-full h-64 mt-2 rounded-md'
            allowFullScreen
          />
        </motion.div>
      ))}
      </div>
      <button
        onClick={onRegenerate}
        className='glass-effect p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all'
      >
        Regenerate Playlist
      </button>
    </motion.div>
  );
}