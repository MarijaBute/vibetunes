     import express from 'express';
     import cors from 'cors';
     import axios from 'axios';
     import dotenv from 'dotenv';

     dotenv.config();

     const app = express();
     const PORT = 5000;

     app.use(cors());
     app.use(express.json());

     app.post('/api/generate-playlist', async (req, res) => {
       const { prompt } = req.body;
       try {
         console.log('Received prompt:', prompt);
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

         console.log('Gemini API response:', JSON.stringify(response.data, null, 2));
         let content = response.data.candidates[0]?.content?.parts[0]?.text;
         if (!content) {
           throw new Error('Empty response from Gemini API');
         }

         // Clean markdown and extra characters
         content = content
           .replace(/```json\n|```/g, '') // Remove ```json and ```
           .replace(/^\s+|\s+$/g, '')     // Trim leading/trailing whitespace
           .replace(/\n/g, '');           // Remove newlines
         console.log('Cleaned content:', content);

         let playlist;
         try {
           playlist = JSON.parse(content);
         } catch (error) {
           console.error('Error parsing Gemini response:', error, 'Content:', content);
           throw new Error('Invalid JSON response from Gemini API');
         }

         res.json({ playlist });
       } catch (error: any) {
         console.error('Error generating playlist:', error.message, error.response?.data || '');
         res.status(500).json({ error: 'Failed to generate playlist', details: error.message });
       }
     });

     app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`);
     });