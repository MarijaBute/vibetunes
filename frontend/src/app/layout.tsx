     import type { Metadata } from 'next';
     import { Inter } from 'next/font/google';
     import './globals.css';
     import Header from '@/components/Header';
     import ClientProvider from '@/components/ClientProvider';

     const inter = Inter({ subsets: ['latin'] });

     export const metadata: Metadata = {
       title: 'MoodTunes',
       description: 'Generate personalized playlists based on your mood',
     };

     export default function RootLayout({
       children,
     }: {
       children: React.ReactNode;
     }) {
       return (
         <html lang="en">
           <body className={inter.className}>
             <Header />
             <ClientProvider>{children}</ClientProvider>
           </body>
         </html>
       );
     }