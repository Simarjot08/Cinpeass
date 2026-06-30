

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      console.warn(`Retrying TMDB fetch... Attempt ${4 - retries}`);
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    } else {
      throw err;
    }
  }
}

export async function GET(request, context) {
  try {
    const {id} = await context.params;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

    const data = await fetchWithRetry(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          Accept: 'application/json',
        },
      },
      3, // Number of retries
      1000 // Initial delay (1 second)
    );

    const youtubeTrailer = data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.key
    );

    if (!youtubeTrailer) {
      return new Response(JSON.stringify({ success: false, error: "Trailer not found" }), {
        status: 404,
      });
    }

    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeTrailer.key}`;

    return new Response(JSON.stringify({ success: true, youtubeUrl }), {
      status: 200,
    });

  } catch (error) {
    console.error("Final error after retries:", error);
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
