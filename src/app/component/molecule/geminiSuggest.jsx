
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
        // 1️⃣ Filter movies by genre if given
        let filtered = updated.genre
          ? movies.filter(movie =>
              movie.genres?.some(g =>
                typeof g === 'string' &&
                g.toLowerCase().includes(updated.genre)
              )
            )
          : movies;

        // 2️⃣ If no movie found, fallback to any movies with at least one genre
        if (!filtered.length) {
          filtered = movies.filter(movie => Array.isArray(movie.genres) && movie.genres.length > 0);
        }

        // 3️⃣ Still empty? fallback to all movies anyway
        if (!filtered.length) {
          filtered = movies;
        }

        // 4️⃣ Prepare movie list for prompt
        const movieList = filtered.slice(0, 20).map(m =>
          `• ${m.title} (${Array.isArray(m.genres) ? m.genres.join(', ') : 'N/A'}, ${m.release_date?.split('-')[0] || 'N/A'}): ${m.overview}`
        ).join('\n');

        if (movieList.trim() === '') {
          setReply('❌ Sorry, no movies available to suggest right now.');
          setLoading(false);
          return;
        }

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
        setReply(result.trim());
      } catch (err) {
        console.error('Gemini error:', err);
        setReply("❌ Could not generate suggestions.");
      } finally {
        setLoading(false);
      }
    }
  };

 const handleSuggestionClick = async (title) => {
  // find movie in shows list by title
  const matched = movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());

  if (matched && matched.movie) {
    // route using the TMDB id stored in `movie` field, NOT the MongoDB _id
    router.push(`/movies/${matched.movie}`);
  } else {
    // fallback: call your find-or-create API with the title
    try {
      const res = await fetch('/api/movies/find-or-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tmdbId: '', title })
      });

      const data = await res.json();

      if (data.success && data.movie && data.movie._id) {
        // Here, make sure you route by TMDB id if available
        // Assuming your movie model has _id = TMDB id string
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
          className="bg-red-700/80 p-3 px-5 py-2 ml-[14%] rounded-md text-md lg:text-xl font-medium hover:bg-red-800 flex items-center gap-3 shadow-lg"
        >
          <img src="/images/chatbot.png" alt="Chatbot" className="w-12 h-12" />
          Ask Gemini to Suggest Movies
        </button>
      )}

      {open && (
        <div className="flex bg-black/90 text-white ml-[10%] lg:ml-[0%] rounded-xl shadow-lg border border-red-700 mt-4 max-h-[500px] overflow-auto">
          <div className="p-4 bg-red-800 rounded-l-xl flex justify-center items-start">
            <img src="/images/chatbot.png" alt="Chatbot" className="w-16 h-16" />
          </div>

          <div className="flex-1 lg:p-4  p-2 space-y-3">
            {!reply ? (
              <>
                <p className="text-sm text-white">{questions[step]}</p>
                <div className="flex lg:gap-2 gap-1" >
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="flex-1 lg:px-3 px-2 lg:py-2  py-1 rounded-md text-sm text-white bg-gray-800"
                    placeholder="Type your answer..."
                  />
                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="bg-primary lg:px-4 px-3  lg:py-2 py-1 lg:text-sm text-xs rounded-md hover:bg-primary-dull disabled:opacity-50"
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
                        className="bg-gray-800 p-2  lg:p-4 rounded border border-red-600 cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSuggestionClick(movieTitle)}
                      >
                        <p className="font-bold text-red-400 mb-1">🎬 Suggestion {idx + 1}</p>
                        <p className="text-sm  text-gray-200">{r.trim()}</p>
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

