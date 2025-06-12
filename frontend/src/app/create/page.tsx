'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponses, setPlaylist, setLoading, setError } from '@/store/slices/playlistSlice';
import { RootState } from '@/store/store';
import { Music, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import Question from '@/components/Question';
import Playlist from '@/components/Playlist';
import Loading from '@/components/Loading';
import { UserResponse } from '@/lib/types';
import { generatePlaylistSuggestions } from '@/lib/api';

const questions = [
  {
    id: 'mood',
    text: 'How are you feeling right now?',
    type: 'single' as const,
    options: ['happy', 'sad', 'energetic', 'calm', 'focused', 'angry', 'romantic'],
  },
  {
    id: 'genres',
    text: 'What genres do you enjoy?',
    type: 'multiple' as const,
    options: [
      'pop',
      'rock',
      'hip hop',
      'jazz',
      'classical',
      'electronic',
      'country',
      'indie',
      'metal',
      'folk',
      'latin',
    ],
  },
  {
    id: 'tempo',
    text: 'What tempo are you in the mood for?',
    type: 'slider' as const,
    options: ['very slow', 'slow', 'medium', 'fast', 'very fast'],
  },
  {
    id: 'era',
    text: 'Do you have a preferred era of music?',
    type: 'single' as const,
    options: [
      '60s-80s classics',
      '90s hits',
      '2000s favorites',
      'recent hits (last 5 years)',
      'mix of everything!',
    ],
  },
  {
    id: 'activity',
    text: 'What will you be doing while listening?',
    type: 'single' as const,
    options: [
      'working out',
      'focusing/working',
      'relaxing',
      'partying',
      'commuting',
      'background music',
    ],
  },
  {
    id: 'artists',
    text: 'Tell us about artists you love or want to avoid',
    type: 'text' as const,
  },
];

export default function CreatePage() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const { responses, playlist, loading, error } = useSelector((state: RootState) => state.playlist);

  const handleAnswer = (answer: any) => {
    dispatch(setResponses({ [questions[step].id]: answer }));
  };

  const nextStep = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      dispatch(setLoading());
      try {
        const playlistData = await generatePlaylistSuggestions(responses as UserResponse);
        dispatch(setPlaylist({
          title: `Your ${responses.mood} ${responses.activity} Playlist`,
          songs: playlistData.songs, // Expect { title, artist, album, spotifyUrl }
        }));
      } catch (err) {
        dispatch(setError('Failed to generate playlist. Please try again.'));
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const regeneratePlaylist = async () => {
    dispatch(setLoading());
    try {
      const playlistData = await generatePlaylistSuggestions(responses as UserResponse);
      dispatch(setPlaylist({
        title: `Your ${responses.mood} ${responses.activity} Playlist`,
        songs: playlistData.songs,
      }));
    } catch (err) {
      dispatch(setError('Failed to generate playlist. Please try again.'));
    }
  };

  const canProceed = () => {
    const currentValue = responses[questions[step].id as keyof UserResponse];
    if (questions[step].type === 'multiple') {
      return Array.isArray(currentValue) && currentValue.length > 0;
    }
    if (questions[step].type === 'text' || questions[step].type === 'slider') {
      return true;
    }
    return currentValue !== '';
  };

  const getMoodBackgroundColor = () => {
    const mood = responses.mood as keyof typeof questions[0]['options'];
    switch (mood) {
      case 'happy':
        return 'bg-mood-happy';
      case 'sad':
        return 'bg-mood-sad';
      case 'energetic':
        return 'bg-mood-energetic';
      case 'calm':
        return 'bg-mood-calm';
      case 'focused':
        return 'bg-mood-focused';
      case 'angry':
        return 'bg-mood-angry';
      case 'romantic':
        return 'bg-mood-romantic';
      default:
        return 'bg-gray-900';
    }
  };

  return (
    <div className={`app-background ${getMoodBackgroundColor()}`}>
      <nav className='py-6 px-8 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Music className='h-8 w-8 text-blue-500' />
          <span className='text-2xl font-bold text-white'>MoodTunes</span>
        </div>
        <div className='flex items-center space-x-6'>
          <Link href='/' className='text-white/80 hover:text-white transition-colors'>
            Home
          </Link>
          <Link href='/about' className='text-white/80 hover:text-white transition-colors'>
            About
          </Link>
          <Link href='/how-it-works' className='text-white/80 hover:text-white transition-colors'>
            How It Works
          </Link>
          <Link href='/create'>
            <button className='btn-secondary'>Create Playlist</button>
          </Link>
        </div>
      </nav>

      <main className='flex-grow flex items-center justify-center px-4 py-12'>
        {loading ? (
          <Loading />
        ) : playlist ? (
          <Playlist pagePlaylist={playlist} onRegenerate={regeneratePlaylist} />
        ) : (
          <div className='mood-card max-w-4xl w-full relative'>
            <Link href='/' className='absolute top-4 right-4'>
              <X className='h-6 w-6 text-gray-500 hover:text-gray-300' />
            </Link>

            <div className='flex justify-between items-center mb-6'>
              <p className='text-gray-500'>Question {step + 1} of {questions.length}</p>
              {responses.mood && (
                <span className='bg-white/20 text-white px-2 py-1 rounded'>
                  Your mood: {responses.mood}
                </span>
              )}
            </div>

            <Question
              question={questions[step]}
              onAnswer={handleAnswer}
              value={responses[questions[step].id as keyof UserResponse]}
              mood={responses.mood}
            />

            <div className='flex justify-between mt-8'>
              {step === 0 ? (
                <Link href='/' className='btn-cancel flex items-center'>
                  <ChevronLeft className='h-5 w-5 mr-2' />
                  Cancel
                </Link>
              ) : (
                <button onClick={prevStep} className='btn-cancel flex items-center'>
                  <ChevronLeft className='h-5 w-5 mr-2' />
                  Previous
                </button>
              )}
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`btn-next flex items-center ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {step === questions.length - 1 ? 'Generate Playlist' : 'Next'}
                <ChevronRight className='h-5 w-5 ml-2' />
              </button>
            </div>
            {error && <p className='text-red-500 mt-4'>{error}</p>}
          </div>
        )}
      </main>
    </div>
  );
}