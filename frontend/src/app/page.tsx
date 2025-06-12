'use client';

import { motion } from 'framer-motion';
import { Music, ChevronDown, Circle, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='bg-hero-gradient'>
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

      <section className='min-h-screen flex flex-col items-center justify-center px-4 text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='text-5xl md:text-7xl font-bold text-white/90 mb-6'
        >
          Music That Matches Your Mood
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='text-lg md:text-xl text-white/70 max-w-md mb-8'
        >
          Discover personalized playlists generated just for you, based on how you feel and what you love to hear.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className='flex space-x-4'
        >
          <Link href='/create'>
            <button className='btn-primary'>Get Started</button>
          </Link>
          <Link href='/examples'>
            <button className='btn-secondary'>See Examples</button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className='absolute bottom-8 flex justify-center'
        >
          <ChevronDown className='h-6 w-6 text-white/50 animate-bounce' />
        </motion.div>
      </section>

      <section className='relative py-20 px-4 text-center'>
        <video
          autoPlay
          loop
          muted
          className='video-background'
          src='https://www.w3schools.com/html/mov_bbb.mp4'
        />
        <div className='relative z-10'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='text-4xl font-bold text-black mb-6'
          >
            Ready to experience the perfect soundtrack for your mood?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='text-lg text-gray-700 mb-8'
          >
            No account needed. Start listening in seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link href='/create'>
              <button className='btn-primary'>Create Your First Playlist</button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className='py-20 px-4 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='text-4xl font-bold text-black mb-6'
        >
          About MoodTunes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='text-lg text-gray-700 max-w-2xl mx-auto mb-12'
        >
          We believe music has the power to transform your state of mind and enhance every moment. Our mission is to connect you with the perfect soundtrack for any mood or activity.
        </motion.p>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='card'
          >
            <Music className='h-12 w-12 text-blue-500 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>AI-Powered Curation</h3>
            <p className='text-gray-400'>
              Our advanced algorithm analyzes your preferences and emotional state to create personalized playlists just for you.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className='card'
          >
            <Circle className='h-12 w-12 text-pink-500 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>Mood Enhancement</h3>
            <p className='text-gray-400'>
              Whether you want to amplify your current emotion or change your state of mind, our playlists are crafted to enhance your experience.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className='card'
          >
            <Circle className='h-12 w-12 text-yellow-500 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>Music Discovery</h3>
            <p className='text-gray-400'>
              Discover new artists and songs that match your unique taste and current vibe, expanding your musical horizons.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='card'
          >
            <Circle className='h-12 w-12 text-cyan-500 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>Instant Playback</h3>
            <p className='text-gray-400'>
              Start listening immediately with seamless YouTube integration, no additional accounts or subscriptions needed.
            </p>
          </motion.div>
        </div>
      </section>

      <section className='py-20 px-4 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='text-4xl font-bold text-black mb-6'
        >
          How MoodTunes Makes a Difference
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='flex items-center justify-center space-x-2 mb-12'
        >
          <Circle className='h-5 w-5 text-green-500' />
          <p className='text-lg text-gray-700'>No account required. Free for everyone.</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className='text-lg text-gray-700 max-w-2xl mx-auto mb-12'
        >
          MoodTunes was created by music lovers for music lovers. We understand that the right song at the right moment can transform your day, enhance your productivity, or help you process emotions. Our platform brings that musical magic to you with just a few clicks.
        </motion.p>
      </section>

      <section className='py-20 px-4 flex flex-col md:flex-row items-center justify-center gap-12'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='max-w-md space-y-8'
        >
          <h2 className='text-4xl font-bold text-black'>How It Works</h2>
          <div className='space-y-6'>
            <div className='flex items-start space-x-4'>
              <Circle className='h-8 w-8 text-blue-500' />
              <div>
                <h3 className='text-xl font-semibold text-black'>1. Choose Your Mood</h3>
                <p className='text-gray-700'>
                  Tell us how you’re feeling right now or the emotional state you’d like to experience.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-4'>
              <Circle className='h-8 w-8 text-blue-500' />
              <div>
                <h3 className='text-xl font-semibold text-black'>2. Set Your Preferences</h3>
                <p className='text-gray-700'>
                  Select your favorite genres, artists, and music era to customize your playlist.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-4'>
              <Circle className='h-8 w-8 text-blue-500' />
              <div>
                <h3 className='text-xl font-semibold text-black'>3. AI Creates Your Playlist</h3>
                <p className='text-gray-700'>
                  Our algorithm analyzes your inputs to create the perfect selection of tracks.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='w-full md:w-1/2'
        >
          <img
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Waterfall'
            className='w-full h-96 object-cover rounded-lg'
          />
        </motion.div>
      </section>

      <footer className='py-8 px-4 flex flex-col md:flex-row items-center justify-between text-gray-400'>
        <div className='flex items-center space-x-2'>
          <Music className='h-6 w-6 text-blue-500' />
          <span>© 2025 MoodTunes. All rights reserved.</span>
        </div>
        <div className='flex space-x-4 my-4 md:my-0'>
          <Link href='/privacy' className='hover:text-white transition-colors'>
            Privacy Policy
          </Link>
          <Link href='/terms' className='hover:text-white transition-colors'>
            Terms and Conditions
          </Link>
          <Link href='/contact' className='hover:text-white transition-colors'>
            Contact
          </Link>
        </div>
        <div className='flex space-x-4'>
          <Link href='https://twitter.com'>
            <Twitter className='h-6 w-6 hover:text-white transition-colors' />
          </Link>
          <Link href='https://linkedin.com'>
            <Linkedin className='h-6 w-6 hover:text-white transition-colors' />
          </Link>
          <Link href='https://youtube.com'>
            <Youtube className='h-6 w-6 hover:text-white transition-colors' />
          </Link>
          <Link href='/contact'>
            <MessageCircle className='h-6 w-6 hover:text-white transition-colors' />
          </Link>
        </div>
      </footer>
    </div>
  );
}