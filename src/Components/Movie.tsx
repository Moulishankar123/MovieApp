import { Image, Modal } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
};

const fetchMovies = async (): Promise<Movie[]> => {
  const url = `${import.meta.env.VITE_TMDB_BASE_URL}${import.meta.env.VITE_ALL_URL}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  const data = await response.json();
  return data.results;
};


const Movie = () => {
  const {
    data: movies = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery<Movie[]>({
    queryKey: ["all-movies"],
    queryFn: fetchMovies,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* <nav className="bg-black backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">My Movie App</h1>
        <ul className="flex gap-6 text-sm md:text-base text-white">
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="/movie">Movies</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer"><Link to="/people">People</Link></li>
        </ul>
      </nav> */}
      {moviesLoading ? (
        <div className="h-screen flex items-center justify-center">
          Loading movies...
        </div>
      ) : moviesError ? (
        <div className="h-screen flex items-center justify-center text-red-500">
          {(moviesError as Error).message}
        </div>
      ) : (
        <>

          <section className="p-6 bg-white text-black">
            <h2 className="text-2xl font-bold mb-4">All Movies</h2>
            <div className="grid grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="cursor-pointer bg-gray-100 hover:shadow-lg transition p-2 rounded"
                  onClick={() => handleCardClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-72 object-cover rounded"
                  />
                  <h3 className="mt-2 text-sm font-semibold text-center">
                    {movie.title || movie.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            title={selectedMovie?.title || selectedMovie?.name}
            size="lg"
            centered
          >
            {selectedMovie && (
              <div className="flex-col gap-4">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title || selectedMovie.name}
                  width={200}
                  radius="md"
                />
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    {selectedMovie.title || selectedMovie.name}
                  </h2>
                  <p className="text-sm text-gray-700 mb-3">
                    {selectedMovie.overview}
                  </p>
                  <p className="text-sm text-gray-500">
                    Release Date:{" "}
                    {selectedMovie.release_date || selectedMovie.first_air_date}
                  </p>
                </div>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Movie;