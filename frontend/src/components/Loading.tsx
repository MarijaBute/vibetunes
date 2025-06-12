'use client';

import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

export default function Loading() {
  const [subtitle, setSubtitle] = useState('Polishing your sonic experience...');

  useEffect(() => {
    const subtitles = [
      'Polishing your sonic experience...',
      'Analyzing your musical taste...',
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % subtitles.length;
      setSubtitle(subtitles[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='relative mb-6'>
        <Music className='h-16 w-16 text-orange-500' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-24 h-24 border-2 border-orange-500 rounded-full animate-spin-slow'></div>
        </div>
      </div>

      <h2 className='text-3xl font-bold text-black mb-2'>
        Creating your perfect playlist
      </h2>

      <p className='text-gray-500 text-lg'>{subtitle}</p>

      <div className='flex space-x-1 mt-6'>
        <div className='w-2 h-8 bg-orange-500 rounded animate-sound-wave-1'></div>
        <div className='w-2 h-8 bg-orange-500 rounded animate-sound-wave-2'></div>
        <div className='w-2 h-8 bg-orange-500 rounded animate-sound-wave-3'></div>
        <div className='w-2 h-8 bg-orange-500 rounded animate-sound-wave-4'></div>
        <div className='w-2 h-8 bg-orange-500 rounded animate-sound-wave-5'></div>
      </div>
    </div>
  );
}