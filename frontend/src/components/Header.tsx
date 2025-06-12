import { Headphones } from 'lucide-react';

export default function Header() {
  return (
    <header className='py-6 px-4 flex items-center justify-center gradient-bg'>
      <div className='flex items-center space-x-2'>
        <Headphones className='h-8 w-8 text-white' />
        <h1 className='text-3xl font-bold text-white'>MoodTunes</h1>
      </div>
    </header>
  );
}