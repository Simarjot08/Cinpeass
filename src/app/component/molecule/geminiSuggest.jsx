
// 'use client';

// import React, { useState } from 'react';
// import { askGemini } from '@/app/lib/gemini/gemini';

// const GENRE_MAP = {
//   28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
//   99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
//   27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance',
//   878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
// };

// const fallbackMovies = [
//   { title: 'Inception', genres: ['Action', 'Sci-Fi'], overview: 'A thief steals secrets through dream-sharing technology.', release_date: '2010-07-16' },
//   { title: 'The Dark Knight', genres: ['Action', 'Drama'], overview: 'Batman faces the Joker.', release_date: '2008-07-18' },
//   { title: 'Forrest Gump', genres: ['Drama', 'Romance'], overview: 'The story of Forrest through American history.', release_date: '1994-07-06' },
// ];

// export default function GeminiSuggest({ allMovies }) {
//   const [open, setOpen] = useState(false);
//   const [step, setStep] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({ mood: '', genre: '', period: '' });
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [reply, setReply] = useState('');

//   const questions = [
//     "🎭 What's your current mood? (e.g., happy, sad, romantic, adventurous)",
//     "🎬 Any specific genre you like? (e.g., action, comedy, thriller)",
//     "🕰️ Prefer recent movies or classics?"
//   ];

//   const resetState = () => {
//     setStep(0);
//     setUserAnswers({ mood: '', genre: '', period: '' });
//     setInput('');
//     setReply('');
//     setLoading(false);
//   };

//   const handleNext = async () => {
//     if (!input.trim()) return;

//     const updatedAnswers = { ...userAnswers };
//     if (step === 0) updatedAnswers.mood = input.toLowerCase();
//     if (step === 1) updatedAnswers.genre = input.toLowerCase();
//     if (step === 2) updatedAnswers.period = input.toLowerCase();
//     setUserAnswers(updatedAnswers);
//     setInput('');

//     if (step < 2) {
//       setStep(prev => prev + 1);
//     } else {
//       setLoading(true);
//       try {
//         const movies = Array.isArray(allMovies) && allMovies.length > 0 ? allMovies : fallbackMovies;
//         const filteredMovies = movies
//           .map(m => ({
//             title: m.title,
//             genres: (m.genre_ids || m.genres || []).map(id => {
//               const name = GENRE_MAP[id] || id;
//               return typeof name === 'string' ? name : String(name);
//             }),
//             overview: m.overview,
//             release_date: m.release_date,
//           }))
//           .filter(m =>
//             updatedAnswers.genre
//               ? m.genres.some(g =>
//                   typeof g === 'string' && g.toLowerCase().includes(updatedAnswers.genre)
//                 )
//               : true
//           );

//         const movieList = filteredMovies.slice(0, 20).map(m =>
//           `• ${m.title} (${m.genres.join(', ')}, ${m.release_date?.split('-')[0] || 'N/A'}): ${m.overview}`
//         ).join('\n');

//         const prompt = `
// The user wants movie suggestions.

// Preferences:
// - Mood: ${updatedAnswers.mood}
// - Genre: ${updatedAnswers.genre}
// - Period: ${updatedAnswers.period}

// Here are the available movies:
// ${movieList}

// Suggest the top 3 most relevant movies from this list. Format exactly like this:
// 1. Movie Title - Short reason
// 2. Movie Title - Short reason
// 3. Movie Title - Short reason
// No explanations or extra text outside the HTML.
//         `;

//         const result = await askGemini(prompt);
//         setReply(result);
//       } catch (err) {
//         setReply("❌ Error fetching suggestions.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleRestart = () => {
//     resetState();
//     setOpen(true);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//     resetState();
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
//       {!open && (
//         <button
//           onClick={handleOpen}
//           className="bg-red-700/80 p-3 px-5 py-2 rounded-md text-xl font-medium hover:bg-primary-dull flex items-center gap-3 shadow-lg"
//         >
//           <img src="/images/chatbot.png" alt="Chatbot" className="w-12 h-12" />
//           Ask Gemini to Suggest Movies
//         </button>
//       )}

//       {open && (
//         <div className="flex bg-black/90 text-white rounded-xl shadow-lg border border-red-700 mt-4 max-h-[500px] overflow-auto">
//           <div className="p-4 bg-red-800 rounded-l-xl flex justify-center items-start">
//             <img src="/images/chatbot.png" alt="Chatbot" className="w-16 h-16" />
//           </div>

//           <div className="flex-1 p-4 space-y-3">
//             {!reply || reply.trim() === '' ? (
//               <>
//                 <p className="text-sm text-white">{questions[step]}</p>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={e => setInput(e.target.value)}
//                     className="flex-1 px-3 py-2 rounded-md text-sm text-white bg-gray-800 focus:outline-none"
//                     placeholder="Type your answer..."
//                   />
//                   <button
//                     onClick={handleNext}
//                     disabled={loading}
//                     className="bg-primary px-4 py-2 text-sm rounded-md hover:bg-primary-dull disabled:opacity-50"
//                   >
//                     {step < 2 ? 'Next' : loading ? 'Thinking...' : 'Get Suggestion'}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="space-y-4">
//                   {(() => {
//                     const pattern = /(?:\d\.\s)(.+?)(?=\n\d\.|$)/gs;
//                     const matches = [...reply.matchAll(pattern)];
//                     if (matches.length === 0) {
//                       console.warn("Gemini output format not matched:\n", reply);
//                       return (
//                         <p className="text-red-500">❌ Could not understand suggestions. Try again.</p>
//                       );
//                     }

//                     return matches.map((match, idx) => {
//                       const text = match[1]?.trim() || '';
//                       const movieTitle = text.split(' - ')[0];
//                       return (
//                         <div
//                           key={idx}
//                           className="bg-gray-900 p-4 rounded-md border border-red-600 shadow-sm cursor-pointer hover:bg-gray-800"
//                           onClick={() => {
//                             const matched = allMovies.find(
//                               m => m.title.toLowerCase() === movieTitle.toLowerCase()
//                             );
//                             if (matched && matched._id) {
//                               window.location.href = `/movies/${matched._id}`;
//                             } else {
//                               alert(`Movie "${movieTitle}" not found in database.`);
//                             }
//                           }}
//                         >
//                           <p className="text-red-400 font-bold text-lg mb-2">🎬 Suggestion {idx + 1}</p>
//                           <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
//                         </div>
//                       );
//                     });
//                   })()}
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={handleRestart}
//                     className="bg-red-700/80 hover:bg-red-800 px-4 py-2 text-sm rounded-md"
//                   >
//                     🔁 Start Over
//                   </button>
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="bg-gray-700 hover:bg-gray-800 px-4 py-2 text-sm rounded-md"
//                   >
//                     ❌ Close
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import { askGemini } from '@/app/lib/gemini/gemini';

// const GENRE_MAP = {
//   28: 'Action',
//   12: 'Adventure',
//   16: 'Animation',
//   35: 'Comedy',
//   80: 'Crime',
//   99: 'Documentary',
//   18: 'Drama',
//   10751: 'Family',
//   14: 'Fantasy',
//   36: 'History',
//   27: 'Horror',
//   10402: 'Music',
//   9648: 'Mystery',
//   10749: 'Romance',
//   878: 'Science Fiction',
//   10770: 'TV Movie',
//   53: 'Thriller',
//   10752: 'War',
//   37: 'Western',
// };

// const fallbackMovies = [
//   { title: 'Inception', genres: ['Action', 'Sci-Fi'], overview: 'A thief steals secrets through dream-sharing technology.', release_date: '2010-07-16' },
//   { title: 'The Dark Knight', genres: ['Action', 'Drama'], overview: 'Batman faces the Joker.', release_date: '2008-07-18' },
//   { title: 'Forrest Gump', genres: ['Drama', 'Romance'], overview: 'The story of Forrest through American history.', release_date: '1994-07-06' },
// ];





// export default function GeminiSuggest({ allMovies }) {
//   const [open, setOpen] = useState(false);
//   const [step, setStep] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({ mood: '', genre: '', period: '' });
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [reply, setReply] = useState('');

//   const questions = [
//     "🎭 What's your current mood? (e.g., happy, sad, romantic, adventurous)",
//     "🎬 Any specific genre you like? (e.g., action, comedy, thriller)",
//     "🕰️ Prefer recent movies or classics?"
//   ];

//   const resetState = () => {
//     setStep(0);
//     setUserAnswers({ mood: '', genre: '', period: '' });
//     setInput('');
//     setReply('');
//     setLoading(false);
//   };

//   const handleNext = async () => {
//     if (!input.trim()) return;

//     const updatedAnswers = { ...userAnswers };
//     if (step === 0) updatedAnswers.mood = input.toLowerCase();
//     if (step === 1) updatedAnswers.genre = input.toLowerCase();
//     if (step === 2) updatedAnswers.period = input.toLowerCase();
//     setUserAnswers(updatedAnswers);
//     setInput('');

//     if (step < 2) {
//       setStep(prev => prev + 1);
//     } else {
//       setLoading(true);

//       try {
//         const movies = Array.isArray(allMovies) && allMovies.length > 0 ? allMovies : fallbackMovies;

//         const filteredMovies = movies
//           .map(m => ({
//             title: m.title,
//             genres: (m.genre_ids || m.genres || []).map(id => {
//               const name = GENRE_MAP[id] || id;
//               return typeof name === 'string' ? name : String(name);
//             }),
//             overview: m.overview,
//             release_date: m.release_date,
//           }))
//           .filter(m =>
//             updatedAnswers.genre
//               ? m.genres.some(g =>
//                   typeof g === 'string' && g.toLowerCase().includes(updatedAnswers.genre)
//                 )
//               : true
//           );

//         const movieList = filteredMovies.slice(0, 20).map(m =>
//           `• ${m.title} (${m.genres.join(', ')}, ${m.release_date?.split('-')[0] || 'N/A'}): ${m.overview}`
//         ).join('\n');
//         console.log("movielist",movieList);

//         const prompt = `
// The user wants movie suggestions.

// Preferences:
// - Mood: ${updatedAnswers.mood}
// - Genre: ${updatedAnswers.genre}
// - Period: ${updatedAnswers.period}

// Here are the available movies:
// ${movieList}

// Suggest the top 3 most relevant movies from this list. Format exactly like this:
// 1. Movie Title - Short reason
// 2. Movie Title - Short reason
// 3. Movie Title - Short reason
// No explanations or extra text outside the HTML.
//         `;

//         const result = await askGemini(prompt);
//         setReply(result);
//       } catch (err) {
//         setReply("❌ Error fetching suggestions.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleRestart = () => {
//     resetState();
//     setOpen(true);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//     resetState();
//   };

//   const handleSuggestionClick = async (title) => {
//     try {
//       const res = await fetch('/api/movies/find-or-create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title }),
//       });

//       const data = await res.json();

//       if (data.success && data.movie && data.movie._id) {
//         window.location.href = `/movies/${data.movie._id}`;
//       } else {
//         alert(data.message || 'Could not find or create the movie.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error contacting the server.');
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
//       {!open && (
//         <button
//           onClick={handleOpen}
//           className="bg-red-700/80 p-3 px-5 py-2 rounded-md text-xl font-medium hover:bg-primary-dull flex items-center gap-3 shadow-lg"
//         >
//           <img src="/images/chatbot.png" alt="Chatbot" className="w-12 h-12" />
//           Ask Gemini to Suggest Movies
//         </button>
//       )}

//       {open && (
//         <div className="flex bg-black/90 text-white rounded-xl shadow-lg border border-red-700 mt-4 max-h-[500px] overflow-auto">
//           <div className="p-4 bg-red-800 rounded-l-xl flex justify-center items-start">
//             <img src="/images/chatbot.png" alt="Chatbot" className="w-16 h-16" />
//           </div>

//           <div className="flex-1 p-4 space-y-3">
//             {!reply || reply.trim() === '' ? (
//               <>
//                 <p className="text-sm text-white">{questions[step]}</p>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={e => setInput(e.target.value)}
//                     className="flex-1 px-3 py-2 rounded-md text-sm text-white bg-gray-800 focus:outline-none"
//                     placeholder="Type your answer..."
//                   />
//                   <button
//                     onClick={handleNext}
//                     disabled={loading}
//                     className="bg-primary px-4 py-2 text-sm rounded-md hover:bg-primary-dull disabled:opacity-50"
//                   >
//                     {step < 2 ? 'Next' : loading ? 'Thinking...' : 'Get Suggestion'}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="space-y-4">
//                   {reply.includes('1.') ? reply.split(/\d\./).filter(Boolean).map((r, idx) => {
//                     const movieTitle = r.trim().split(' - ')[0];

//                     return (
//                       <div
//                         key={idx}
//                         className="bg-gray-900 p-4 rounded-md border border-red-600 shadow-sm cursor-pointer hover:bg-gray-800"
//                         onClick={() => handleSuggestionClick(movieTitle)}
//                       >
//                         <p className="text-red-400 font-bold text-lg mb-2">🎬 Suggestion {idx + 1}</p>
//                         <p className="text-sm text-gray-300 leading-relaxed">{r.trim()}</p>
//                       </div>
//                     );
//                   }) : (
//                     <p className="text-red-500">❌ Could not understand suggestions. Try again.</p>
//                   )}
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={handleRestart}
//                     className="bg-red-700/80 hover:bg-red-800 px-4 py-2 text-sm rounded-md"
//                   >
//                     🔁 Start Over
//                   </button>
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="bg-gray-700 hover:bg-gray-800 px-4 py-2 text-sm rounded-md"
//                   >
//                     ❌ Close
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// 
'use client';

import React, { useEffect, useState } from 'react';
import { askGemini } from '@/app/lib/gemini/gemini';
import { useRouter } from 'next/navigation';

export default function GeminiSuggest() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({ mood: '', genre: '', period: '' });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/auth/shows');
        const data = await res.json();
        if (data.success && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          console.error('Failed to fetch shows:', data.message);
        }
      } catch (err) {
        console.error('Failed to fetch shows:', err);
      }
    };

    fetchMovies();
  }, []);

  const questions = [
    "🎭 What's your current mood? (e.g., happy, sad, romantic, adventurous)",
    "🎬 Any specific genre you like? (e.g., action, comedy, thriller)",
    "🕰️ Prefer recent movies or classics?"
  ];

  const resetState = () => {
    setStep(0);
    setUserAnswers({ mood: '', genre: '', period: '' });
    setInput('');
    setReply('');
    setLoading(false);
  };

  const handleNext = async () => {
    if (!input.trim()) return;

    const updated = { ...userAnswers };
    if (step === 0) updated.mood = input.toLowerCase();
    if (step === 1) updated.genre = input.toLowerCase();
    if (step === 2) updated.period = input.toLowerCase();
    setUserAnswers(updated);
    setInput('');

    if (step < 2) {
      setStep(step + 1);
    } else {
      setLoading(true);

      try {
        const filtered = movies.filter(movie =>
          updated.genre
            ? movie.genres?.some(g =>
                typeof g === 'string' &&
                g.toLowerCase().includes(updated.genre)
              )
            : true
        );

        const movieList = filtered.slice(0, 20).map(m =>
          `• ${m.title} (${m.genres?.join(', ')}, ${m.release_date?.split('-')[0] || 'N/A'}): ${m.overview}`
        ).join('\n');

        const prompt = `
User wants movie suggestions.

Preferences:
- Mood: ${updated.mood}
- Genre: ${updated.genre}
- Period: ${updated.period}

Here are the available movies:
${movieList}

Suggest the top 3 most relevant movies from this list. Format exactly like this:
1. Movie Title - Short reason
2. Movie Title - Short reason
3. Movie Title - Short reason
Only respond with this format. No extra explanation.
        `;

        const result = await askGemini(prompt);
        setReply(result);
      } catch (err) {
        console.error('Gemini error:', err);
        setReply("❌ Could not generate suggestions.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSuggestionClick = async (title) => {
    const matched = movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());

    if (matched) {
      router.push(`/movies/${matched._id}`);
    } else {
      try {
        const res = await fetch('/api/movies/find-or-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tmdbId: '', title })
        });

        const data = await res.json();

        if (data.success && data.movie && data.movie._id) {
          router.push(`/movies/${data.movie._id}`);
        } else {
          alert(data.message || 'Movie not found in suggestions or TMDB.');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching movie from TMDB.');
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            resetState();
          }}
          className="bg-red-700/80 p-3 px-5 py-2 rounded-md text-xl font-medium hover:bg-red-800 flex items-center gap-3 shadow-lg"
        >
          <img src="/images/chatbot.png" alt="Chatbot" className="w-12 h-12" />
          Ask Gemini to Suggest Movies
        </button>
      )}

      {open && (
        <div className="flex bg-black/90 text-white rounded-xl shadow-lg border border-red-700 mt-4 max-h-[500px] overflow-auto">
          <div className="p-4 bg-red-800 rounded-l-xl flex justify-center items-start">
            <img src="/images/chatbot.png" alt="Chatbot" className="w-16 h-16" />
          </div>

          <div className="flex-1 p-4 space-y-3">
            {!reply ? (
              <>
                <p className="text-sm text-white">{questions[step]}</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md text-sm text-white bg-gray-800"
                    placeholder="Type your answer..."
                  />
                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="bg-primary px-4 py-2 text-sm rounded-md hover:bg-primary-dull disabled:opacity-50"
                  >
                    {step < 2 ? 'Next' : loading ? 'Thinking...' : 'Get Suggestion'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  {reply.includes('1.') ? reply.split(/\d\./).filter(Boolean).map((r, idx) => {
                    const movieTitle = r.trim().split(' - ')[0];
                    return (
                      <div
                        key={idx}
                        className="bg-gray-800 p-4 rounded border border-red-600 cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSuggestionClick(movieTitle)}
                      >
                        <p className="font-bold text-red-400 mb-1">🎬 Suggestion {idx + 1}</p>
                        <p className="text-sm text-gray-200">{r.trim()}</p>
                      </div>
                    );
                  }) : (
                    <p className="text-red-500">❌ Could not understand Gemini's reply.</p>
                  )}
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={resetState} className="bg-red-700 px-3 py-2 text-sm rounded hover:bg-red-800">🔁 Restart</button>
                  <button onClick={() => setOpen(false)} className="bg-gray-700 px-3 py-2 text-sm rounded hover:bg-gray-800">❌ Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}