// import { Modal, Image } from "@mantine/core";
// import { useQuery } from "@tanstack/react-query";
// import { useRef, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// type Movie = {
//   id: number;
//   title?: string;
//   name?: string;
//   overview: string;
//   poster_path: string;
//   backdrop_path: string;
//   release_date?: string;
//   first_air_date?: string;
// };

// const fetchTrendingMovies = async (): Promise<Movie[]> => {
//   const url = `${import.meta.env.VITE_TMDB_BASE_URL}${import.meta.env.VITE_ALL_URL}`;
//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   });

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(`Movie API HTTP ${response.status} - ${text}`);
//   }

//   const data = await response.json();
//   return data.results;
// };

// const Home = () => {
//   const {
//     data: movies = [],
//     isLoading: moviesLoading,
//     error: moviesError,
//   } = useQuery<Movie[]>({
//     queryKey: ["trending-movies"],
//     queryFn: fetchTrendingMovies,
//   });

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [scrollIndex, setScrollIndex] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

//   const handleScroll = (direction: "left" | "right") => {
//     if (!scrollRef.current || movies.length === 0) return;

//     const scrollAmount = scrollRef.current.offsetWidth;
//     const newIndex = direction === "left" ? scrollIndex - 1 : scrollIndex + 1;
//     const clampedIndex = Math.max(0, Math.min(movies.length - 1, newIndex));
//     setScrollIndex(clampedIndex);

//     scrollRef.current.scrollTo({
//       left: clampedIndex * scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   //const navigate = useNavigate();

//   const handleCardClick = (movie: Movie) => {
//     setSelectedMovie(movie);
//     setModalOpen(true);
//   };

//   return (
//     <>
//       <div className="relative h-screen w-full bg-black text-white">
//         {/* <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">My Movie App</h1>
//           <ul className="flex gap-6 text-sm md:text-base">
//             <li className="hover:text-yellow-400 cursor-pointer"><Link to="/">Home</Link></li>
//             <li className="hover:text-yellow-400 cursor-pointer"><Link to="/movie">Movies</Link></li>
//             <li className="hover:text-yellow-400 cursor-pointer"><Link to="/people">People</Link></li>
//             <li> <button
//               onClick={() => {
//                 localStorage.removeItem("auth");
//                 window.location.href = "/login";
//               }}
//               className="hover:text-yellow-400 cursor-pointer"
//             >
//               Logout
//             </button></li>
//           </ul>

//         </nav> */}

//         {moviesLoading ? (
//           <div className="h-screen flex items-center justify-center">
//             Loading movies...
//           </div>
//         ) : moviesError ? (
//           <div className="h-screen flex items-center justify-center text-red-500">
//             {(moviesError as Error).message}
//           </div>
//         ) : (
//           <>
//             <div className="relative h-full overflow-hidden">
//               <button
//                 className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black p-3 rounded-full cursor-pointer"
//                 onClick={() => handleScroll("left")}
//               >
//                 <FaChevronLeft size={20} />
//               </button>
//               <button
//                 className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black p-3 rounded-full cursor-pointer"
//                 onClick={() => handleScroll("right")}
//               >
//                 <FaChevronRight size={20} />
//               </button>

//               <div className="w-full h-full overflow-hidden relative">
//                 <div
//                   className="flex w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x"
//                   ref={scrollRef}
//                 >
//                   {movies.map((movie) => (
//                     <div
//                       key={movie.id}
//                       className="flex-shrink-0 w-full h-full snap-start bg-cover bg-center relative"
//                       style={{
//                         backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-black/60 flex items-center px-6 md:px-20">
//                         <div className="max-w-3xl">
//                           <h1 className="text-3xl md:text-5xl font-bold mb-4">
//                             {movie.title || movie.name}
//                           </h1>
//                           <p className="text-sm md:text-base text-gray-200 mb-4">
//                             {movie.overview}
//                           </p>
//                           <p className="text-sm text-gray-400">
//                             {movie.release_date || movie.first_air_date}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>

//             <section className="p-6 bg-white text-black">
//               <h2 className="text-2xl font-bold mb-4">All Movies</h2>
//               <div className="grid grid-cols-5 gap-4">
//                 {movies.map((movie) => (
//                   <div
//                     key={movie.id}
//                     className="cursor-pointer bg-gray-100 hover:shadow-lg transition p-2 rounded"
//                     onClick={() => handleCardClick(movie)}
//                   >
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                       alt={movie.title || movie.name}
//                       className="w-full h-72 object-cover rounded"
//                     />
//                     <h3 className="mt-2 text-sm font-semibold text-center">
//                       {movie.title || movie.name}
//                     </h3>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <Modal
//               opened={modalOpen}
//               onClose={() => setModalOpen(false)}
//               title={selectedMovie?.title || selectedMovie?.name}
//               size="lg"
//               centered
//               styles={{content:{backgroundColor:"black"},header:{backgroundColor:"black"},title:{color:"#364153",fontWeight:"bold",fontSize:"24px"}}}
//             >
//               {selectedMovie && (
//                 <div className="flex-col gap-4">
//                   <Image
//                     src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
//                     alt={selectedMovie.title || selectedMovie.name}
//                     width={200}
//                     radius="md"
//                   />
//                   <div>
//                     <h2 className="text-xl font-bold mb-2 text-gray-700 ">
//                       {selectedMovie.title || selectedMovie.name}
//                     </h2>
//                     <p className="text-sm text-gray-700 mb-3">
//                       {selectedMovie.overview}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Release Date:{" "}
//                       {selectedMovie.release_date || selectedMovie.first_air_date}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </Modal>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;



import { Modal, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
};

const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const url = `${import.meta.env.VITE_TMDB_BASE_URL}${import.meta.env.VITE_ALL_URL}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Movie API HTTP ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.results;
};

const Home = () => {
  const {
    data: movies = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery<Movie[]>({
    queryKey: ["trending-movies"],
    queryFn: fetchTrendingMovies,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleScroll("right");
        } else {
          handleScroll("left");
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current || movies.length === 0) return;

    const scrollAmount = scrollRef.current.offsetWidth;
    const newIndex = direction === "left" ? scrollIndex - 1 : scrollIndex + 1;
    const clampedIndex = Math.max(0, Math.min(movies.length - 1, newIndex));
    setScrollIndex(clampedIndex);

    scrollRef.current.scrollTo({
      left: clampedIndex * scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <>
      <div className="relative min-h-screen w-full bg-black text-white">
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
            <div className="relative h-[60vh] overflow-hidden">
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black p-3 rounded-full cursor-pointer"
                onClick={() => handleScroll("left")}
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black p-3 rounded-full cursor-pointer"
                onClick={() => handleScroll("right")}
              >
                <FaChevronRight size={20} />
              </button>

              <div className="w-full h-full overflow-hidden relative">
                <div
                  className="flex w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x"
                  ref={scrollRef}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex-shrink-0 w-full h-full snap-start bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/60 flex items-center px-4 md:px-20">
                        <div className="max-w-3xl">
                          <h1 className="text-2xl md:text-5xl font-bold mb-3">
                            {movie.title || movie.name}
                          </h1>
                          <p className="text-sm md:text-base text-gray-200 mb-2 line-clamp-3">
                            {movie.overview}
                          </p>
                          <p className="text-sm text-gray-400">
                            {movie.release_date || movie.first_air_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section className="p-4 md:p-6 bg-white text-black">
              <h2 className="text-xl md:text-2xl font-bold mb-4">All Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="cursor-pointer bg-gray-100 hover:shadow-lg transition p-2 rounded"
                    onClick={() => handleCardClick(movie)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-64 object-cover rounded"
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
              styles={{
                content: { backgroundColor: "black" },
                header: { backgroundColor: "black" },
                title: {
                  color: "#e2e8f0",
                  fontWeight: "bold",
                  fontSize: "24px",
                },
              }}
            >
              {selectedMovie && (
                <div className="flex flex-col md:flex-row gap-6">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title || selectedMovie.name}
                    width={200}
                    radius="md"
                  />
                  <div>
                    <h2 className="text-lg md:text-xl font-bold mb-2 text-white">
                      {selectedMovie.title || selectedMovie.name}
                    </h2>
                    <p className="text-sm text-gray-300 mb-3">
                      {selectedMovie.overview}
                    </p>
                    <p className="text-sm text-gray-400">
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
    </>
  );
};

export default Home;
